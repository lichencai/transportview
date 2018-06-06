function initCustomerInfo(customerData){
    if(!customerData){
        return ;
    }
    $("#customerName").html(customerData.customerName);
    $("#customerId").html(customerData.customerId);
    $("#address").html(customerData.address);
    $("#mobile").html(customerData.mobile);
    $("#telephone").html(customerData.telephone);
    $("#fax").html(customerData.fax);
    $("#email").html(customerData.email);
    $("#birthday").html(new Date(customerData.birthday).format("yyyy-MM-dd"));
    $("#mark").html(customerData.mark);
}

$(document).ready(function(){
	var id = getvalue('id');
	var customerData = getcustomerData(id);
	initCustomerInfo(customerData);
});