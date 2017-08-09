$(function(){
	//点击右上角切换二维码或pc登陆方式
	$(".code").click(function(){
		if($(this).find("a").attr("class") == "qrcode"){
			$(this).prev(".switch").css("display","none");
			$(this).find("a").prop("class","pc");
			$(".login_pc").css("display","none").next(".login_code").css("display","block");
		}else{
			$(this).prev(".switch").css("display","block");
			$(this).find("a").attr("class","qrcode");
			$(".login_code").css("display","none").prev(".login_pc").css("display","block");
		
		}	
	})
	
	
	$("input[type=checkbox]").click(function(){
		if($(this).is(":checked")){
		$(".meg_tip").css("display","block");
	}else{
		$(".meg_tip").css("display","none");
	}
	})
	//定义一个变量判断是否为空
	var flag = false;
	
	$("input[type='text']").blur(function(){
		console.log(2);
		$(".meg_error").css("display","none");
	})
	$("#btn").click(function(){
		console.log($('.password').val());
		if($(".username").val() == "" || $(".password").val() == ""){
			$(".meg_error").css("display","block");
			flag = false;
		}else{
			flag = true;
		}
		if(flag){
				$.ajax({
					type:"get",
					url:"../common.php?username="+$('.username').val()+"&psw="+$('.password').val()+"&act=login",
					async:true,
					success:function(data){
						var res = JSON.parse(data);
						if(res.error == 0){
							window.location.href = "index.html";
						}else{
							$(".meg_error").css("display","block");
						}
						
					}
				})
		}
	})
	
})
