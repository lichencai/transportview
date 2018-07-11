function initBillInfo(billData){
	if(!billData){
		return;
	}

	console.log(billData);

	var billInfo = billData.billInfo;
	var billFee = billData.billFee;
	var customerInfo = billData.customerInfo;
	var billDetailFeeInfos = billData.billDetailFeeInfos;

	$("#customerName").html(billInfo.sender);
	$("#telephone").html(billInfo.senderMobile);

	$("#receiver").html(billInfo.receiver);
	$("#receiverMobile").html(billInfo.receiverMobile);

	$("#productPack").html(billInfo.productPack);
	$("#productName").html(billInfo.productName);
	$("#productNumber").html(billInfo.productNumber);

	$("#transportFee").html(billFee.transportFee);

	$("#offer").html(billFee.offer);
	$("#insuranceFee").html(billFee.insuranceFee);
	$("#shipmentFee").html(billFee.shipmentFee);
	$("#deliverFee").html(billFee.deliverFee);

	$("#collectionFee").html(billFee.collectionFee);

	$("#mark").html(billInfo.mark);
	$("#handledBy").html(billInfo.handledBy);

	if(billFee.feePayType == 1){
		$("#feePayType").html('月结');
	}else if(billFee.feePayType == 2){
		$("#feePayType").html('提付');
	}else if(billFee.feePayType == 3){
		$("#feePayType").html('现付');
	}else if(billFee.feePayType == 4){
		$("#feePayType").html('回单付');
	}

	for(var i = 0; i < billDetailFeeInfos.length; i++){
		if(billDetailFeeInfos[i].type == 1){
			$('#kiloCount').html(billDetailFeeInfos[i].unit);
		}
	}

	$("#toAddress").html(billInfo.toAddress);
	$("#createDate").html(new Date(billInfo.createDate).format("yyyy-MM-dd hh:mm:ss"));

	var totalFee = billFee.transportFee + billFee.offer + billFee.insuranceFee
		 + billFee.shipmentFee + billFee.deliverFee;
	$('#totalFee').html(totalFee);

	totalFee = Math.floor(totalFee);
	if(totalFee <= 9999){
		var temp = totalFee % 10;
		$("#unit").html(changeBigMonth(temp));
		temp = Math.floor(totalFee / 10) % 10;
		$("#ten").html(changeBigMonth(temp));
		temp = Math.floor(totalFee / 100) % 10;
		$("#hundred").html(changeBigMonth(temp));
		temp = Math.floor(totalFee / 1000) % 10;
		$("#thousand").html(changeBigMonth(temp));
	}
}

function changeBigMonth(val){
	if(val == 0){
		return '零';
	}else if(val == 1){
		return '壹';
	}else if(val == 2){
		return '贰';
	}else if(val == 3){
		return '叁';
	}else if(val == 4){
		return '肆';
	}else if(val == 5){
		return '伍';
	}else if(val == 6){
		return '陆';
	}else if(val == 7){
		return '柒';
	}else if(val == 8){
		return '捌';
	}else if(val == 9){
		return '玖';
	}
}



$(document).ready(function(){

	var id = getvalue('id');
	var billData = getBillData(id);
	initBillInfo(billData);

	$("#printMsg").click(function(){
		$("#printFrame").attr('src','./printIframe.html?id=' + id);
	});

});
