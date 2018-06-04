
var token = window.localStorage.getItem("token");

function initBillInfo(billData){
	if(!billData){
		return;
	}
	var billInfo = billData.billInfo;
	var billFee = billData.billFee;
	$("#billId").html(billInfo.billId);
	$("#customerName").html(billInfo.customerName);
	$("#sender").html(billInfo.sender);
	$("#senderMobile").html(billInfo.senderMobile);
	$("#receiver").html(billInfo.receiver);
	$("#receiverMobile").html(billInfo.receiverMobile);

	$("#transportFee").html(billFee.transportFee);
	$("#deliverFee").html(billFee.deliverFee);
	$("#shipmentFee").html(billFee.shipmentFee);
	$("#chargeFee").html(billFee.chargeFee);
	$("#warehouseFee").html(billFee.warehouseFee);
	$("#collectionFee").html(billFee.collectionFee);
	$("#insuranceFee").html(billFee.insuranceFee);
	$("#otherFee").html(billFee.otherFee);
	
	var feePayType = null;
	if(billFee.feePayType == 1){
		feePayType = '月结';
	}else if(billFee.feePayType == 2){
		feePayType = '提付';
	}else if(billFee.feePayType == 3){
		feePayType = '现付';
	}else if(billFee.feePayType == 4){
		feePayType = '提/现付';
	}
	$("#feePayType").html(feePayType);

	$("#feeReceivable").html(billFee.feeReceivable);
	$("#realCharge").html(billFee.realCharge);

	$("#handledBy").html(billInfo.handledBy);
	$("#mark").html(billInfo.mark);
}

$(document).ready(function(){
	var id = getvalue('id');
	var billData = getBillData(id);
	initBillInfo(billData);

	$("#printMsg").click(function(){
		$("#printFrame").attr('src','./printIframe.html');
	});

});
