
var token = window.localStorage.getItem("token");

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
	billData.billInfo.customerName = $("#customerName").val();
	billData.billInfo.fromAddress = $("#fromAddress").val();
	billData.billInfo.toAddress = $("#toAddress").val();
	billData.billInfo.sender = $("#sender").val();
	billData.billInfo.senderMobile = $("#senderMobile").val();
	billData.billInfo.senderIdentityCard = $("#senderIdentityCard").val();
	billData.billInfo.receiver = $("#receiver").val();
	billData.billInfo.receiverMobile = $("#receiverMobile").val();
	billData.billInfo.carNo = $("#carNo").val();
	billData.billInfo.receiveDate = $("#receiveDate").val();

	billData.billFee.transportFee = $("#transportFee").html() * 1;
	billData.billFee.deliverFee = $("input[name='deliverFee']").val() * 1;
	billData.billFee.shipmentFee = $("input[name='shipmentFee']").val() * 1;
	billData.billFee.chargeFee = $("input[name='chargeFee']").val() * 1;
	billData.billFee.warehouseFee = $("input[name='warehouseFee']").val() * 1;
	billData.billFee.collectionFee = $("input[name='collectionFee']").val() * 1;
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


function initPage(billData){

	$("#billId").val(billData.billInfo.billId);
	$("#customerName").val(billData.billInfo.customerName);
	$("#fromAddress").val(billData.billInfo.fromAddress);
	$("#toAddress").val(billData.billInfo.toAddress);
	$("#sender").val(billData.billInfo.sender);
	$("#senderMobile").val(billData.billInfo.senderMobile);
	$("#senderIdentityCard").val(billData.billInfo.senderIdentityCard);
	$("#receiver").val(billData.billInfo.receiver);
	$("#receiverMobile").val(billData.billInfo.receiverMobile);
	$("#carNo").val(billData.billInfo.carNo);
	
	$("#receiveDate").val(new Date(billData.billInfo.receiveDate).format("yyyy-MM-dd"));
	
	$("#transportFee").html(billData.billFee.transportFee);
	$("input[name='deliverFee']").val(billData.billFee.deliverFee);
	$("input[name='shipmentFee']").val(billData.billFee.shipmentFee);
	$("input[name='chargeFee']").val(billData.billFee.chargeFee);
	$("input[name='warehouseFee']").val(billData.billFee.warehouseFee);
	$("input[name='collectionFee']").val(billData.billFee.collectionFee);
	$("input[name='insuranceFee']").val(billData.billFee.insuranceFee);
	$("input[name='otherFee']").val(billData.billFee.otherFee);

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
}


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
		console.log(params);
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
	
	$("input[name='payWay']").change(function(){
		var val = $(this).val();
		var enable = $(this).is(':checked');
		checkboxFunc(val, enable, "", "");
		$(".transportFeeInput").change();
	});

	$(".transportFeeInput").change(function(){
		var v = $(this).val();
		if(!isNumber(v) && v){
			alert('输入数字');
			$(this).focus();
			return ;
		}

		var transportFee = 0;
		$("input[name='payWay']").each(function(){
			var val = $(this).val();
			var enable = $(this).is(':checked');
			if(enable){
				transportFee += calculateTransport(val);
			}
		});
		$("#transportFee").html(transportFee);
	});

	$(".numberInput").blur(function(){
		var val = $(this).val();
		if(val && !isNumber(val)){
			alert('金额填入有误');
		}
	});
});