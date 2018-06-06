//  日期控件
$(function () {
	$("#birthday").calendar({
		controlId: "divDate",                                 // 弹出的日期控件ID，默认: $(this).attr("id") + "Calendar"
		speed: 200,                                           // 三种预定速度之一的字符串("slow", "normal", or "fast")或表示动画时长的毫秒数值(如：1000),默认：200
		complement: true,                                     // 是否显示日期或年空白处的前后月的补充,默认：true
		readonly: true,                                       // 目标对象是否设为只读，默认：true
		callback: function () {                               // 点击选择日期后的回调函数
		}
	});
});
/**
 * 初始化页面
 * @param {*} customerData 后台获取到客户的信息
 */
function initPage(customerData){
    if(!customerData){
        return ;
    }
	$("#customerName").val(customerData.customerName);
	$("#customerId").val(customerData.customerId);
    $("#address").val(customerData.address);
    $("#mobile").val(customerData.mobile);
    $("#telephone").val(customerData.telephone);
    $("#fax").val(customerData.fax);
    $("#email").val(customerData.email);
    $("#birthday").val(new Date(customerData.birthday).format("yyyy-MM-dd"));
    $("#mark").val(customerData.mark);
}
/**
 * 获取页面上填入的客户信息
 * @param {*} customerData 后台获取到客户的信息
 */
function createCustomerData(customerData){
    if(!customerData){
        customerData = new Object();
    }
	customerData.customerName =  $("#customerName").val();
	customerData.customerId =  $("#customerId").val();
    customerData.address =  $("#address").val();
    customerData.mobile =  $("#mobile").val();
    customerData.telephone =  $("#telephone").val();
    customerData.fax =  $("#fax").val();
    customerData.email =  $("#email").val();
    customerData.birthday =  $("#birthday").val();
    customerData.mark =  $("#mark").val();
    return JSON.stringify(customerData);
}


$(document).ready(function(){
    var id = getvalue('id');
	var customerData = null;
	if(id){
		customerData = getcustomerData(id);
	}
	if(customerData){
		//  进行值的初始化
		initPage(customerData);
    }
    
    $("#save").click(function(){
		var params = createCustomerData(customerData);
		$.ajax({
			url : domain + "/customer/saveOrUpdateCustomerInfo?token=Bearer " + token,
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
					alert('保存成功');
					window.location.href = "customerList.html";
				}
			}
		});
	});

	$("#back").click(function(){
		window.location.href = "customerList.html";
	});

});