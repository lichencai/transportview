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

function initTableInfo(data){
	var vos = data.createRportVos;
	var tableSize = $("#providerTable tr").size();
	for(var i = 0; i < tableSize; i++){
		var id = "#tr" + i;
		$(id).remove();
	}
	for(var i = 0; i < vos.length; i++){
		var tr = "<tr id='tr_tr_'><td>";
		tr += vos[i].customerName + "</td><td>";
		tr += vos[i].productName + "</td><td>";
		tr += vos[i].productNumber + "</td><td>";
		tr += vos[i].kiloCount + "</td><td>";
		tr += vos[i].receiver + "</td><td>";
		tr += vos[i].transportFee + "</td><td>";
		tr += vos[i].feePayType + "</td><td>";
        tr += vos[i].collectionFee + "</td><td>";
        tr += vos[i].deliverFee + "</td><td>";
        tr += vos[i].mark + "</td></tr>";
		tr = tr.replace("_tr_", i);
		$("#providerTable").append(tr);
    }
    
    var tr = "<tr id='tr_tr_'><td>";
	tr += "</td><td>";
	tr += "</td><td>";
	tr += data.totalProductNumber + "</td><td>";
	tr += data.totalKiloCount + "</td><td>";
	tr += "</td><td>";
	tr += data.totalTransportFee + "</td><td>";
	tr += "</td><td>";
    tr += data.totalCollectionFee + "</td><td>";
    tr += data.totalDeliverFee + "</td><td>";
    tr += "</td></tr>";
	tr = tr.replace("_tr_", vos.length);
    $("#providerTable").append(tr);
}


$(document).ready(function(){
	// 查询
    $("#createReport").click(function(){
        
        var params = new Object();
	    params.beginDate = $("input[name='beginDate']").val();
	    params.endDate = $("input[name='endDate']").val();
        params = JSON.stringify(params);

        $.ajax({
            url : domain + "/report/createRport?token=Bearer " + token,
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
                    console.log(data);
                }
            }
        });

    });

});