$(function () {
    $("#beginDate").calendar({
        controlId: "divDate",                                 // 弹出的日期控件ID，默认: $(this).attr("id") + "Calendar"
        speed: 200,                                           // 三种预定速度之一的字符串("slow", "normal", or "fast")或表示动画时长的毫秒数值(如：1000),默认：200
        complement: true,                                     // 是否显示日期或年空白处的前后月的补充,默认：true
        readonly: true,                                       // 目标对象是否设为只读，默认：true
        callback: function () {                               // 点击选择日期后的回调函数
        }
     });
    $("#endDate").calendar({
        controlId: "divEndDate",                                 // 弹出的日期控件ID，默认: $(this).attr("id") + "Calendar"
        speed: 200,                                           // 三种预定速度之一的字符串("slow", "normal", or "fast")或表示动画时长的毫秒数值(如：1000),默认：200
        complement: true,                                     // 是否显示日期或年空白处的前后月的补充,默认：true
        readonly: true,                                       // 目标对象是否设为只读，默认：true
        callback: function () {                               // 点击选择日期后的回调函数
        }
     });
});
/**
 * 获取查询参数
 */
function getSearchParams(){
	var params = new Object();
	params.customerName = $("input[name='customerName']").val();
	params.isFinshAll = $("select[name='isFinshAll']").val();
	params.isFinshFee = $("select[name='isFinshFee']").val();
	params.beginDate = $("input[name='beginDate']").val();
	params.endDate = $("input[name='endDate']").val();
	return params;
}
/**
 * 获取列表
 */
function getBillListInfo(pageNo){
	globalPageNo = pageNo;
	var params = getSearchParams();
	params.pageNo = pageNo;
	params.pageSize = pageSize;
	params = JSON.stringify(params);

	$.ajax({
		url : domain + "/bill/getBillInfoList?token=Bearer " + token,
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
 */
function go(p) {
	getBillListInfo(p);
}
/**
 * 初始化表格
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
		tr += vos[i].billId + "</td><td>";
		tr += vos[i].customerName + "</td><td>";
		tr += vos[i].sender + "</td><td>";
		tr += vos[i].senderMobile + "</td><td>";
		tr += vos[i].receiver + "</td><td>";
		tr += vos[i].receiverMobile + "</td><td>";
		tr += vos[i].feeReceivable + "</td><td>";
		tr += vos[i].realCharge + "</td><td>";
		
		var isFinshFee = '否';
		if(vos[i].isFinshFee == 1){
			isFinshFee = '是';
		}
		tr += isFinshFee + "</td><td>";
		
		var isFinshAll = '否';
		if(vos[i].isFinshAll == 1){
			isFinshAll = '是';
		}
		tr += isFinshAll + "</td><td>";
		
		var createDate = vos[i].createDate;
		createDate = new Date(createDate).format("yyyy-MM-dd hh:mm:ss");
		tr += createDate + "</td><td>";
		
		var id = vos[i].id;
		var operate = '<input type="button" name="finsh" value="完成" id="_id" onclick="finshFuc(_idNo)">' + 
        '<input type="button" name="view" value="查看" id="_id" onclick="viewFuc(_idNo)">' +
        '<input type="button" name="edit" value="修改" id="_id" onclick="editFuc(_idNo)">' +
        '<input type="button" name="delete" value="删除" id="_id" onclick="deleteFuc(_idNo)">';
		if(vos[i].isFinshAll == 1){
			operate = '<input type="button" name="view" value="查看" id="_id" onclick="viewFuc(_idNo)">' +
			'<input type="button" name="delete" value="删除" id="_id" onclick="deleteFuc(_idNo)">';
		}
		operate = operate.replace("_idNo", id).replace("_idNo", id).replace("_idNo", id).replace("_idNo", id);
		tr += operate + "</td></tr>";
	
		tr = tr.replace("_tr_", i);

		$("#providerTable").append(tr);
	}
}
/**
 * 删除订单
 */
function sendServerDelete(id){
	var params = {};
	params.id = id;
	$.ajax({
		url : domain + "/bill/deleteBill?token=Bearer " + token,
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
				getBillListInfo(globalPageNo);
			}else if(status == 0){
				alert(data);
			}
		}
	});
}
/**
 * 完成订单
 */
function sendServerFinsh(id){
	var params = {};
	params.id = id;
	$.ajax({
		url : domain + "/bill/finshBill?token=Bearer " + token,
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
				getBillListInfo(globalPageNo);
			}else if(status == 0){
				alert(data);
			}
		}
	});
}
/**
 * 完成订单点击事件
 */
function finshFuc(id){
	$('.zhezhao').css('display', 'block');
	$('#tip').html('你确定要完成该订单吗？');
	$("#dialogType").val('finsh');
	$("#itemId").val(id);
	$('#removeBi').fadeIn();
}
/**
 * 查看订单点击事件
 */
function viewFuc(id){
	window.location.href = "billView.html?id=" + id;
}
/**
 * 编辑订单点击事件
 */
function editFuc(id){
	window.location.href = "billAdd.html?id=" + id;
}
/**
 * 删除订单点击事件
 */
function deleteFuc(id){
	$('.zhezhao').css('display', 'block');
	$("#dialogType").val('delete');
	$("#itemId").val(id);
	$('#removeBi').fadeIn();
}

$(document).ready(function(){
	// 查询
    $("#btnSearch").click(function(){
		getBillListInfo(1);
    });
	// 添加订单
    $("#addOrder").click(function(){
		window.location.href = "billAdd.html";
    });

    $("#yes").click(function () {
        var dialogType = $('#dialogType').val();
        var itemId = $('#itemId').val();
		if('finsh' == dialogType){
			sendServerFinsh(itemId);
		}else if('delete' == dialogType){
			sendServerDelete(itemId);
		}
        $('.zhezhao').css('display', 'none');
        $('#removeBi').fadeOut();
    });

	getBillListInfo(1);
});
