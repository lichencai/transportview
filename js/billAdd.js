//  创建订单信息
function createBillData(billData){
	if(!billData){
		billData = new Object();
		billData.billInfo = new Object();
		billData.billFee = new Object();
		billData.billDetailFeeInfos = new Array();
	}else{
		billData.billDetailFeeInfos = new Array();
	}

	billData.billInfo.billId = $("#billId").val();
	billData.billInfo.customerInfoId = $("#customerInfoId").val();
	billData.billInfo.fromAddress = $("#fromAddress").val();
	billData.billInfo.toAddress = $("#toAddress").val();
	billData.billInfo.sender = $("#sender").val();
	billData.billInfo.senderMobile = $("#senderMobile").val();
	billData.billInfo.senderIdentityCard = $("#senderIdentityCard").val();
	billData.billInfo.receiver = $("#receiver").val();
	billData.billInfo.receiverMobile = $("#receiverMobile").val();
	billData.billInfo.carNo = $("#carNo").val();
	billData.billInfo.receiveDate = $("#receiveDate").val();
	billData.billInfo.receiverIdentityCard = $("#receiverIdentityCard").val();
	billData.billInfo.productName = $("#productName").val();
	billData.billInfo.productPack = $("#productPack").val();
	billData.billInfo.productNumber = $("#productNumber").val() * 1;

	billData.billFee.transportFee = $("#transportFee").html() * 1;
	billData.billFee.deliverFee = $("input[name='deliverFee']").val() * 1;
	billData.billFee.shipmentFee = $("input[name='shipmentFee']").val() * 1;
	billData.billFee.chargeFee = $("input[name='chargeFee']").val() * 1;
	billData.billFee.warehouseFee = $("input[name='warehouseFee']").val() * 1;
	billData.billFee.collectionFee = $("input[name='collectionFee']").val() * 1;
	billData.billFee.offer = $("input[name='offer']").val() * 1;
	billData.billFee.insuranceFee = $("input[name='insuranceFee']").val() * 1;
	billData.billFee.otherFee = $("input[name='otherFee']").val() * 1;
	billData.billFee.feePayType = $('input:radio[name="feePayType"]:checked').val();
	billData.billFee.feeReceivable = $("#feeReceivable").val() * 1;
	billData.billFee.realCharge = $("#realCharge").val() * 1;

	billData.billInfo.isFinshFee = $('input:radio[name="isFinshFee"]:checked').val();
	billData.billInfo.handledBy = $("#handledBy").val();
	billData.billInfo.mark = $("#mark").val();

	var checkedList = new Array();   
	$("input[name='payWay']:checked").each(function() {   
		checkedList.push($(this).val());   
	});
	for(var i = 0; i < checkedList.length; i++){
		var payWay = {};
		payWay.type = checkedList[i];
		if(checkedList[i] == 1){
			payWay.unit = $("input[name='kiloWay']").val() * 1;
			payWay.fee = $("input[name='kiloFee']").val() * 1;
		}else if(checkedList[i] == 2){
			payWay.unit = $("input[name='cubeWay']").val() * 1;
			payWay.fee = $("input[name='cubeFee']").val() * 1;
		}else if(checkedList[i] == 3){
			payWay.unit = $("input[name='unitBigWay']").val() * 1;
			payWay.fee = $("input[name='unitBigFee']").val() * 1;
		}else if(checkedList[i] == 4){
			payWay.unit = $("input[name='unitMiddleWay']").val() * 1;
			payWay.fee = $("input[name='unitMiddleFee']").val() * 1;
		}else if(checkedList[i] == 5){
			payWay.unit = $("input[name='unitSmallWay']").val() * 1;
			payWay.fee = $("input[name='unitSmallFee']").val() * 1;
		}else if(checkedList[i] == 6){
			payWay.unit = $("input[name='carWay']").val() * 1;
			payWay.fee = $("input[name='carFee']").val() * 1;
		}
		billData.billDetailFeeInfos[i] = payWay;
	}

	return JSON.stringify(billData);
}
/**
 * 改变运输费用的checkbox事件
 * @param {*} val 代表哪一个运输费用
 * @param {*} enable 是否允许输入
 * @param {*} way 数量
 * @param {*} fee 单价
 */
function checkboxFunc(val, enable, way, fee){
	if(val == 1){
		if(enable){
			$("input[name='kiloWay']").val(way);
			$("input[name='kiloFee']").val(fee);
			$("input[name='kiloWay']").attr("readonly", false);
			$("input[name='kiloFee']").attr("readonly", false);
		}else{
			$("input[name='kiloWay']").val('');
			$("input[name='kiloFee']").val('');
			$("input[name='kiloWay']").attr("readonly", true);
			$("input[name='kiloFee']").attr("readonly", true);
		}
	}else if(val == 2){
		if(enable){
			$("input[name='cubeWay']").val(way);
			$("input[name='cubeFee']").val(fee);
			$("input[name='cubeWay']").attr("readonly", false);
			$("input[name='cubeFee']").attr("readonly", false);
		}else{
			$("input[name='cubeWay']").val('');
			$("input[name='cubeFee']").val('');
			$("input[name='cubeWay']").attr("readonly", true);
			$("input[name='cubeFee']").attr("readonly", true);
		}
	}else if(val == 3){
		if(enable){
			$("input[name='unitBigWay']").val(way);
			$("input[name='unitBigFee']").val(fee);
			$("input[name='unitBigWay']").attr("readonly", false);
			$("input[name='unitBigFee']").attr("readonly", false);
		}else{
			$("input[name='unitBigWay']").val('');
			$("input[name='unitBigFee']").val('');
			$("input[name='unitBigWay']").attr("readonly", true);
			$("input[name='unitBigFee']").attr("readonly", true);
		}
	}else if(val == 4){
		if(enable){
			$("input[name='unitMiddleWay']").val(way);
			$("input[name='unitMiddleFee']").val(fee);
			$("input[name='unitMiddleWay']").attr("readonly", false);
			$("input[name='unitMiddleFee']").attr("readonly", false);
		}else{
			$("input[name='unitMiddleWay']").val('');
			$("input[name='unitMiddleFee']").val('');
			$("input[name='unitMiddleWay']").attr("readonly", true);
			$("input[name='unitMiddleFee']").attr("readonly", true);
		}
	}else if(val == 5){
		if(enable){
			$("input[name='unitSmallWay']").val(way);
			$("input[name='unitSmallFee']").val(fee);
			$("input[name='unitSmallWay']").attr("readonly", false);
			$("input[name='unitSmallFee']").attr("readonly", false);
		}else{
			$("input[name='unitSmallWay']").val('');
			$("input[name='unitSmallFee']").val('');
			$("input[name='unitSmallWay']").attr("readonly", true);
			$("input[name='unitSmallFee']").attr("readonly", true);
		}
	}else if(val == 6){
		if(enable){
			$("input[name='carWay']").val(way);
			$("input[name='carFee']").val(fee);
			$("input[name='carWay']").attr("readonly", false);
			$("input[name='carFee']").attr("readonly", false);
		}else{
			$("input[name='carWay']").val('');
			$("input[name='carFee']").val('');
			$("input[name='carWay']").attr("readonly", true);
			$("input[name='carFee']").attr("readonly", true);
		}
	}
}
/**
 * 计算运输费用
 * @param {*} val 代表哪一种运输费用
 */
function calculateTransport(val){
	var unit,fee;
	if(val == 1){
		unit = $("input[name='kiloWay']").val();
		fee = $("input[name='kiloFee']").val();
	}else if(val == 2){
		unit = $("input[name='cubeWay']").val();
		fee = $("input[name='cubeFee']").val();
	}else if(val == 3){
		unit = $("input[name='unitBigWay']").val();
		fee = $("input[name='unitBigFee']").val();
	}else if(val == 4){
		unit = $("input[name='unitMiddleWay']").val();
		fee = $("input[name='unitMiddleFee']").val();
	}else if(val == 5){
		unit = $("input[name='unitSmallWay']").val();
		fee = $("input[name='unitSmallFee']").val();
	}else if(val == 6){
		unit = $("input[name='carWay']").val();
		fee = $("input[name='carFee']").val();
	}
	if(unit && fee && (!isNumber(unit) || !isNumber(fee))){
		console.log(unit + "," + fee + "," + !isNumber(unit) + "," + !isNumber(fee));
		alert("单价或金额填入错误");
	}
	return unit * fee;
}

/**
 * 初始化页面的值
 * @param {*} billData 从后台获取到的json数据
 */
function initPage(billData){

	$("#billId").val(billData.billInfo.billId);
	if(billData.customerInfo)
		$("#customerName").val(billData.customerInfo.customerName);
	
	$("#fromAddress").val(billData.billInfo.fromAddress);
	$("#toAddress").val(billData.billInfo.toAddress);
	$("#sender").val(billData.billInfo.sender);
	$("#senderMobile").val(billData.billInfo.senderMobile);
	$("#senderIdentityCard").val(billData.billInfo.senderIdentityCard);
	$("#receiver").val(billData.billInfo.receiver);
	$("#receiverMobile").val(billData.billInfo.receiverMobile);
	$("#carNo").val(billData.billInfo.carNo);
	$("#customerInfoId").val(billData.billInfo.customerInfoId);
	$("#productName").val(billData.billInfo.productName);
	$("#productPack").val(billData.billInfo.productPack);
	$("#productNumber").val(billData.billInfo.productNumber);
	$("#receiverIdentityCard").val(billData.billInfo.receiverIdentityCard);
	
	$("#receiveDate").val(new Date(billData.billInfo.receiveDate).format("yyyy-MM-dd"));
	
	$("#transportFee").html(billData.billFee.transportFee);
	$("input[name='deliverFee']").val(billData.billFee.deliverFee);
	$("input[name='shipmentFee']").val(billData.billFee.shipmentFee);
	$("input[name='chargeFee']").val(billData.billFee.chargeFee);
	$("input[name='warehouseFee']").val(billData.billFee.warehouseFee);
	$("input[name='collectionFee']").val(billData.billFee.collectionFee);
	$("input[name='insuranceFee']").val(billData.billFee.insuranceFee);
	$("input[name='otherFee']").val(billData.billFee.otherFee);
	$("input[name='offer']").val(billData.billFee.offer);
	var otherTotalFee = 0;
	otherTotalFee = billData.billFee.deliverFee + billData.billFee.shipmentFee 
		+ billData.billFee.warehouseFee + billData.billFee.otherFee;
	$("#totalOtherFee").html(otherTotalFee);

	$('input:radio[name="feePayType"]').each(function(){
		if($(this).val() == billData.billFee.feePayType){
			$(this).attr('checked', 'true');
		}
	});

	$("#feeReceivable").val(billData.billFee.feeReceivable);
	$("#realCharge").val(billData.billFee.realCharge);

	$('input:radio[name="isFinshFee"]').each(function(){
		if($(this).val() == billData.billInfo.isFinshFee){
			$(this).attr('checked', 'true');
		}
	});

	$("#handledBy").val(billData.billInfo.handledBy);
	$("#mark").val(billData.billInfo.mark);

	var billDetailFeeInfos = billData.billDetailFeeInfos;
	for(var i = 0; i < billDetailFeeInfos.length; i++){
		$("input[name='payWay']").each(function(){
			if(billDetailFeeInfos[i].type == $(this).val()){
				$(this).attr('checked', 'true');
			}
		});
		checkboxFunc(billDetailFeeInfos[i].type, true, billDetailFeeInfos[i].unit, billDetailFeeInfos[i].fee);
	}

	if(!billData.billFee.chargeFee || !billData.billFee.collectionFee){
		$("input:radio[name='collectionRadio'][value='1']").attr('checked', 'true');
		$("input[name='chargeFee']").attr("readonly", false);
		$("input[name='collectionFee']").attr("readonly", false);
	}

	if(!billData.billFee.insuranceFee || !billData.billFee.offer){
		$("input:radio[name='offerRadio'][value='1']").attr('checked', 'true');
		$("input[name='insuranceFee']").attr("readonly", false);
		$("input[name='offer']").attr("readonly", false);
	}
}
/**
 * 获取其他费用的总和
 */
function getTotalOtherFee(){
	var totalOtherFee = 0;
	var deliverFee = $("input[name='deliverFee']").val() * 1;
	if(!deliverFee) deliverFee = 0;
	var shipmentFee = $("input[name='shipmentFee']").val() * 1;
	if(!shipmentFee) shipmentFee = 0;
	var warehouseFee = $("input[name='warehouseFee']").val() * 1;
	if(!warehouseFee) warehouseFee = 0;
	var otherFee = $("input[name='otherFee']").val() * 1;
	if(!otherFee) otherFee = 0;
	totalOtherFee = deliverFee + shipmentFee + warehouseFee + otherFee;
	return totalOtherFee;
}
/**
 * 获取运输费用
 */
function getTransportFee(){
	var transportFee = 0;
	$("input[name='payWay']").each(function(){
		var val = $(this).val();
		var enable = $(this).is(':checked');
		if(enable){
			transportFee += calculateTransport(val);
		}
	});
	return transportFee;
}
/**
 * 计算应收款
 */
function getFeeReceivable(){
	var transportFee = getTransportFee();
	var totalOtherFee = getTotalOtherFee();
	var chargeFee = $("input[name='chargeFee']").val() * 1;
	if(!chargeFee) chargeFee = 0;
	var insuranceFee = $("input[name='insuranceFee']").val() * 1;
	if(!insuranceFee) insuranceFee = 0;
	var feeReceivable = transportFee + totalOtherFee + chargeFee + insuranceFee;
	$("#feeReceivable").val(feeReceivable);
}

/**
 * 初始化客户列表
 */
function initCustomerData(){
	$.ajax({
		url : domain + "/customer/getAllCustomerInfos?token=Bearer " + token,
		data : {},
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
				console.log(data.length);
				var tr = '';
				for(var i = 0; i < data.length; i++){
					tr += "<tr class='dataTr'><td>";
					tr += '<input type="radio" name="id" value="' + data[i].id + '"/>' + "</td><td>";
					tr += data[i].customerName + "</td><td>";
					tr += data[i].mobile + "</td><td>";
					tr += data[i].customerId + "</td><td>";
					tr += data[i].address + "</td></tr>";
				}
				$("#providerTable").append(tr);
			}
		}
	});
}


//  日期控件
$(function () {
	$("#receiveDate").calendar({
		controlId: "divDate",                                 // 弹出的日期控件ID，默认: $(this).attr("id") + "Calendar"
		speed: 200,                                           // 三种预定速度之一的字符串("slow", "normal", or "fast")或表示动画时长的毫秒数值(如：1000),默认：200
		complement: true,                                     // 是否显示日期或年空白处的前后月的补充,默认：true
		readonly: true,                                       // 目标对象是否设为只读，默认：true
		callback: function () {                               // 点击选择日期后的回调函数
		}
	});
});

$(document).ready(function(){
	var id = getvalue('id');
	var billData = null;
	if(id){
		billData = getBillData(id);
	}
	if(billData){
		//  进行值的初始化
		initPage(billData);
	}

	$("#save").click(function(){
		var params = createBillData(billData);
		$.ajax({
			url : domain + "/bill/saveOrUpdateBill?token=Bearer " + token,
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
					window.location.href = "billList.html";
				}
			}
		});
	});

	$("#back").click(function(){
		window.location.href = "billList.html";
	});
	// 复选框改变事件
	$("input[name='payWay']").change(function(){
		var val = $(this).val();
		var enable = $(this).is(':checked');
		checkboxFunc(val, enable, "", "");
		$(".transportFeeInput").change();
	});
	//  运输费用输入框改变事件
	$(".transportFeeInput").change(function(){
		var v = $(this).val();
		if(!isNumber(v) && v){
			alert('输入数字');
			$(this).focus();
			return ;
		}
		var transportFee = getTransportFee();
		$("#transportFee").html(transportFee);
		getFeeReceivable();
	});

	// 是否代收货款
	$('input:radio[name="collectionRadio"]').change(function(){
		var isChecked = $('input:radio[name="collectionRadio"]:checked').val();
		if(isChecked == 1){
			$("input[name='collectionFee']").attr("readonly", false);
			$("input[name='chargeFee']").attr("readonly", false);
		}else{
			$("input[name='collectionFee']").val("");
			$("input[name='chargeFee']").val("");
			$("input[name='collectionFee']").attr("readonly", true);
			$("input[name='chargeFee']").attr("readonly", true);
		}
		getFeeReceivable();
	});

	// 是否保价
	$('input:radio[name="offerRadio"]').change(function(){
		var isChecked = $('input:radio[name="offerRadio"]:checked').val();
		if(isChecked == 1){
			$("input[name='offer']").attr("readonly", false);
			$("input[name='insuranceFee']").attr("readonly", false);
		}else{
			$("input[name='offer']").val("");
			$("input[name='insuranceFee']").val("");
			$("input[name='offer']").attr("readonly", true);
			$("input[name='insuranceFee']").attr("readonly", true);
		}
		getFeeReceivable();
	});

	$(".numberInput").change(function(){
		var val = $(this).val();
		if(val && !isNumber(val)){
			alert('金额填入有误');
			$(this).focus();
			return ;
		}
		var totalOtherFee = getTotalOtherFee();
		$("#totalOtherFee").html(totalOtherFee);
		getFeeReceivable();
	});

	$("#chooseCustomer").click(function(){
		// pop();
		$('.zhezhao').css('display', 'block');
		$('#removeBi').fadeIn();
	});

	initCustomerData();

	$(".dataTr").click(function(){
		$(".dataTr").each(function(){
			$(this).css("background-color", "");
			$(this).find("input[name='id']").attr('checked', 'false');
		});
		$(this).css("background-color", "beige");
		$(this).find("input[name='id']").attr('checked', 'true');
	});

	$("#customerSure").click(function(){
		var customerInfoId = $('input:radio[name="id"]:checked').val();
		var customerName = $('input:radio[name="id"]:checked').parent().parent().children("td").eq(1).html();
		var mobile = $('input:radio[name="id"]:checked').parent().parent().children("td").eq(2).html();
		var customerId = $('input:radio[name="id"]:checked').parent().parent().children("td").eq(3).html();
		var address = $('input:radio[name="id"]:checked').parent().parent().children("td").eq(4).html();
		$("#customerInfoId").val(customerInfoId);
		$("#customerName").val(customerName);
		$("#sender").val(customerName);
		$("#senderMobile").val(mobile);
		$("#senderIdentityCard").val(customerId);

		$('.zhezhao').css('display', 'none');
        $('#removeBi').fadeOut();
	});

	$("#customerCancel").click(function(){
		$('.zhezhao').css('display', 'none');
        $('#removeBi').fadeOut();
	});

});