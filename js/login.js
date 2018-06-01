$(document).ready(function(){
	$("#login").click(function(){
		var loginName = $("#loginName").val();
		var password = $("#password").val();
		var params = {};
		params.loginName = loginName;
		params.password = password;
		$.ajax({
			url: domain + "/iuser/login",
			data : params,
			dataType : "json",
			type : "post",
			xhrFields: {  
    			withCredentials: true // 设置运行跨域操作  
  			}, 
			error : function(data){

			},
			success : function(data){
				if(data.status == '1'){
					window.localStorage.setItem("token", data.data.access_token);
					window.location.href = "index.html";
				}else{
					alert(data.msg);
				}
				
			}
		});
	});



});