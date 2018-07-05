//供应商管理页面上点击删除按钮弹出删除框(providerList.html)
//var domain = "http://lichencai79159.nat123.net:12708/illegal"
var domain = "http://localhost:8082/illegal";
var pageSize = 10;
var globalPageNo = 1;
var token = window.localStorage.getItem("token");

$(function () {
    $('.removeProvider').click(function () {
        $('.zhezhao').css('display', 'block');
        $('#removeProv').fadeIn();
    });
});

$(function () {
    $('#no').click(function () {
        $('.zhezhao').css('display', 'none');
        $('#removeProv').fadeOut();
    });
});

$(function () {
    $('#no').click(function () {
        $('.zhezhao').css('display', 'none');
        $('#removeBi').fadeOut();
    });
});

//用户管理页面上点击删除按钮弹出删除框(userList.html)
$(function () {
    $('.removeUser').click(function () {
        $('.zhezhao').css('display', 'block');
        $('#removeUse').fadeIn();
    });
});

$(function () {
    $('#no').click(function () {
        $('.zhezhao').css('display', 'none');
        $('#removeUse').fadeOut();
    });
});


function getuserInfo(token){
	var loginName = null;
    $.ajax({
        url: domain + "/iuser/userInfo?token=Bearer " + token,
        dataType : "json",
        type : "post",
        async : false,
        error : function(data){
			if(data.status == '401'){
				alert("获取用户信息错误,请重新登录");
				window.location.href = "login.html";
			}
			else{
				alert("系统出错");
				window.location.href = "login.html";
			}
        },
        success : function(data){
			loginName = data.data;
        }
    });
	return loginName;
}

$(document).ready(function(){
	var url = window.location.href;
	if(url.indexOf('login.html') != -1)
		return;
	var loginName = getuserInfo(token);		//  判断用户是否有登录
	$("span[name=loginName]").each(function(){
		$(this).html(loginName);
    });
    
	$(".loginOut").click(function(){
		$.ajax({
			url: domain + "/iuser/loginOut?token=Bearer " + token,
			dataType : "json",
			type : "post",
			async : false,
			error : function(data){
				if(data.status == '401'){
					alert("获取用户信息错误,请重新登录");
					window.location.href = "login.html";
				}
				else{
					alert("系统出错");
					window.location.href = "login.html";
				}
			},
			success : function(data){
				window.localStorage.setItem("token", null);
				window.location.href = "login.html";
			}
		});
    });
    
});
//  判断是否是数字
function isNumber(value) {         //验证是否为数字
    var patrn = /^(-)?\d+(\.\d+)?$/;
    if (patrn.exec(value) == null || value == "") {
        return false
    } else {
        return true
    }
}
// 日期格式化
Date.prototype.format = function(fmt) { 
     var o = { 
        "M+" : this.getMonth()+1,                 //月份 
        "d+" : this.getDate(),                    //日 
        "h+" : this.getHours(),                   //小时 
        "m+" : this.getMinutes(),                 //分 
        "s+" : this.getSeconds(),                 //秒 
        "q+" : Math.floor((this.getMonth()+3)/3), //季度 
        "S"  : this.getMilliseconds()             //毫秒 
    }; 
    if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
    }
     for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
         }
     }
    return fmt; 
}

//生成Pager，当前页码, 总页数, 回调function
$.fn.pager = function(page, total, callback) {
    var html = '';
    html += '<a class="first" href="javascript:;">首页</a>';
    html += '<a class="first" href="javascript:;">上一页</a>';
    var start = page - 5 < 0 ? 0 : page - 5;
    var end = page + 5 < total ? page + 5 : total;
    for (var i = start; i < end; i++) {
        html += i == page - 1 ? '<span>' + (i + 1) + '</span>' : '<a href="javascript:;">' + (i + 1) + '</a>';
    }
    html += '<a class="first" href="javascript:;">下一页</a>';
    html += '<a class="last" href="javascript:;">末页</a>';
    $(this).html(html).find('a').click(function() {
        var p = $(this).text();
        if (p == '上一页') p = page == 1 ? 1 : page - 1;
        if (p == '下一页') p = page == total ? total : page + 1;
        if (p == '首页') p = 1;
        if (p == '末页') p = total;
        if (p != page) callback(parseInt(p));
    });
}
// 根据id获取订单信息
function getBillData(id){
	var params = {};
	params.id = id;
	var billData = null;
	$.ajax({
        url : domain + "/bill/editBill?token=Bearer " + token,
		data : params,
        dataType : "json",
        type : "post",
        async : false,
        error : function(data){
			alert("系统出错");
        },
        success : function(data){
			billData = data.data;
        }
    });
	return billData;
}
// 根据id获取客户信息
function getcustomerData(id){
	var params = {};
	params.id = id;
	var customerData = null;
	$.ajax({
        url : domain + "/customer/editCustomerInfo?token=Bearer " + token,
		data : params,
        dataType : "json",
        type : "post",
        async : false,
        error : function(data){
			alert("系统出错");
        },
        success : function(data){
			customerData = data.data;
        }
    });
	return customerData;
}
// 获取url上面入参name的值
function getvalue(name){    
	var str = window.location.search;   //location.search是从当前URL的?号开始的字符串     
	if (str.indexOf(name) != -1)	//判断是否收到值
	{                
		 var pos_start = str.indexOf(name) + name.length+1;  //解析获取值   
		 var pos_end=str.indexOf("&", pos_start);        
		 if (pos_end==-1){  
			return str.substring(pos_start);
		 }
		 else{           
			return null;
		 }  
	}
}