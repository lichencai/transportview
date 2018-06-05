/**
 * 获取查询参数
 */
function getSearchParams(){
    var params = new Object();
	params.customerName = $("input[name='customerName']").val();
	// params.beginDate = $("input[name='beginDate']").val();
	// params.endDate = $("input[name='endDate']").val();
	return params;
}

/**
 * 获取客户列表
 * @param {*} pageNo 当前页
 */
function getCustomerInfo(pageNo){
    globalPageNo = pageNo;
	var params = getSearchParams();
	params.pageNo = pageNo;
	params.pageSize = pageSize;
	params = JSON.stringify(params);

	$.ajax({
		url : domain + "/customer/getCustomerInfoList?token=Bearer " + token,
		data : params,
		dataType : "json",
		contentType:"application/json",
		type : "post",
		async : false,
		error : function(data){
			alert("系统出错");
		},
		success : function(data){
			var status = data.status;
			if(status == 1){
				data = data.data;
				initTableInfo(data);
				$('.pager').pager(pageNo, data.totalPages, go);
			}
		}
	});
}

/**
 * 分页点击回调函数
 * @param {*} p 跳转的页码
 */
function go(p) {
	getCustomerInfo(p);
}

/**
 * 初始化表格数据
 * @param {*} data 后台客户分页查询返回的数据
 */
function initTableInfo(data){
    var vos = data.vos;
	var tableSize = $("#providerTable tr").size();
	for(var i = 0; i < tableSize; i++){
		var id = "#tr" + i;
		$(id).remove();
	}
	for(var i = 0; i < vos.length; i++){
		var tr = "<tr id='tr_tr_'><td>";
		tr += vos[i].customerName + "</td><td>";
		tr += vos[i].mobile + "</td><td>";
		tr += vos[i].telephone + "</td><td>";
		tr += vos[i].fax + "</td><td>";
		tr += vos[i].email + "</td><td>";
		tr += vos[i].address + "</td><td>";
		
		var createDate = vos[i].createDate;
		createDate = new Date(createDate).format("yyyy-MM-dd hh:mm:ss");
		tr += createDate + "</td><td>";
		
		var id = vos[i].id;
		var operate = '<input type="button" name="view" value="查看" id="_id" onclick="viewFuc(_idNo)">' +
        '<input type="button" name="edit" value="修改" id="_id" onclick="editFuc(_idNo)">' +
        '<input type="button" name="delete" value="删除" id="_id" onclick="deleteFuc(_idNo)">';
		operate = operate.replace("_idNo", id).replace("_idNo", id).replace("_idNo", id);
		tr += operate + "</td></tr>";
	
		tr = tr.replace("_tr_", i);

		$("#providerTable").append(tr);
	}
}

/**
 * 删除客户
 * @param {*} id 客户id
 */
function sendServerDelete(id){
	var params = {};
	params.id = id;
	$.ajax({
		url : domain + "/customer/deleteCustomerInfo?token=Bearer " + token,
		data : params,
		dataType : "json",
		type : "post",
		async : false,
		error : function(data){
			alert("系统出错");
		},
		success : function(data){
			var status = data.status;
			var data = data.data;
			if(status == 1){
				getCustomerInfo(globalPageNo);
			}else if(status == 0){
				alert(data);
			}
		}
	});
}

/**
 * 删除订单点击事件
 * @param {*} id 客户id
 */
function deleteFuc(id){
	$('.zhezhao').css('display', 'block');
	$("#itemId").val(id);
	$('#removeBi').fadeIn();
}

/**
 * 查看客户点击事件
 * @param {*} id 客户id
 */
function viewFuc(id){
	window.location.href = "customerView.html?id=" + id;
}
/**
 * 编辑客户点击事件
 * @param {*} id 客户id
 */
function editFuc(id){
	window.location.href = "customerAdd.html?id=" + id;
}

$(document).ready(function(){
	// 查询
    $("#btnSearch").click(function(){
		getCustomerInfo(1);
    });

	// 添加客户
    $("#addCustomer").click(function(){
		window.location.href = "customerAdd.html";
    });

    $("#yes").click(function () {
        var itemId = $('#itemId').val();
        sendServerDelete(itemId);
        $('.zhezhao').css('display', 'none');
        $('#removeBi').fadeOut();
    });

	getCustomerInfo(1);
});