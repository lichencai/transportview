    var rowcount = 5;
    //设置申请人弹出窗口的显示位置
    function makeCenter()
    {  
        $('#choose-box-wrapper').css("display","block");  
        $('#choose-box-wrapper').css("position","absolute");  
        $('#choose-box-wrapper').css("top", "0px");  
        var left = ($(document).width() - $('#choose-box-wrapper').width())/2; 
        $('#choose-box-wrapper').css("left", left+"px");  
    }
    function pop(){  
        //将窗口居中  
        makeCenter();  
        //初始化数据列表  
		//loadUserList("",1,rowcount);
    }  
    //隐藏窗口  
    function hide() {  
        $('#choose-box-wrapper').css("display", "none");  
    }  
    //获取选择值  
    function doSelect() {  
        var list = $("[name='chxSelected']");  
        var userID = "";  
        var userName = "";  
        var i = 0;
        list.each(function () {  
            if ($(this).is(':checked')) {  
                userID = $("[name='userID']").eq(i).text();  
                userName = $("[name='userName']").eq(i).text();
                return;
            };
            i++;
        });  
        $('#ApplierID').val('').val(userID);  
        $('#Applier').val('').val(userName);  
        //关闭弹窗  
        hide();  
    }
    
    //申请人选择－上一页
    function lastPageApplier()
    {
        var keyword = $("#txtKeyword").val();
        var totalPage = $("#lbTotalPage").html();
        var page = $("#lbPage").html();
        if(page==1)
        {
        	alert("已经是第1页");
        	return;
        }
        page--;
		loadUserList(keyword,page,rowcount);
		$("#lbPage").html(page);
    }
        
    //申请人选择－下一页
    function nextPageApplier()
    {
        var keyword = $("#txtKeyword").val();
        var totalPage = $("#lbTotalPage").html();
        var page = $("#lbPage").html();
        if(page==totalPage)
        {
        	alert("已经是最后1页");
        	return;
        }
        page++;
		loadUserList(keyword,page,rowcount);
		$("#lbPage").html(page);
    }
    //加载用户列表
    function loadUserList(keyword,page,rowcount)
    {
    	 $("[name='dataRows']").remove();
    	 var dataRows = "";
		 $.ajax({
			  	url : "<%=request.getContextPath()%>/scripts/module/expenserequest/ExpenseRequest_Info_Operation.jsp",
				type : "POST",
				dataType:"json",
				data : {
					act:1,
					keyword:keyword,
					page:page,
					rowcount:rowcount
				},
				success : function(data){
				    var dataObj = eval("("+data.data+")");//转换为json对象 
				    $.each(dataObj,function(idx,item){
					var tr = "<tr align='center' name='dataRows'>"
								+"<td align='center' class='text_label'><input type='checkbox' name='chxSelected'/></td>"
								+"<td align='left' class='text_label'><div name='seq'>"+(idx+1)+"</div></td>"
								+"<td align='left' class='text_label'><div name='userID'>"+item.UserID+"</div></td>"
								+"<td align='left' class='text_label'><div name='userName'>"+item.UserName+"</div></td>"
							+"</tr>";
					dataRows = dataRows+tr;
                    });
                    $("[name='headerRow']").after(dataRows);
                    $("#lbTotal").html(data.total);
                    $("#lbTotalPage").html(Math.ceil(data.total/rowcount));
				},
				error:function(){
        			alert(arguments[1]);
				}
			});
    }
    
    function searchUser()
    {
        var keyword = $("#txtKeyword").val();
		loadUserList(keyword,1,rowcount);
		$("#lbPage").html(1);
    }
	/****************弹出选择窗口 end************************/