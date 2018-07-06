function initBillInfo(billData){
	if(!billData){
		return;
	}

	console.log(billData);

	var billInfo = billData.billInfo;
	var billFee = billData.billFee;
	var customerInfo = billData.customerInfo;

	$("#customerName").html(billInfo.sender);
	$("#telephone").html(billInfo.senderMobile);

	$("#receiver").html(billInfo.receiver);
	$("#receiverMobile").html(billInfo.receiverMobile);

	$("#productName").html(billInfo.productName);
	$("#productNumber").html(billInfo.productNumber);

	$("#transportFee").html(billFee.transportFee);

	$("#offer").html(billFee.offer);
	$("#insuranceFee").html(billFee.insuranceFee);
	$("#shipmentFee").html(billFee.shipmentFee);
	$("#deliverFee").html(billFee.deliverFee);

	$("#collectionFee").html(billFee.collectionFee);

	$("#handledBy").html(billInfo.handledBy);
}

$(document).ready(function(){
	var id = getvalue('id');
	var billData = getBillData(id);
	initBillInfo(billData);

	$("#printMsg").click(function(){
		$("#printFrame").attr('src','./printIframe.html');
	});

});
