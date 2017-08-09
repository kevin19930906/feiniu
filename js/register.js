$(function(){	
	//点击切换注册方式
	isSuccess();
	$(".tel").click(function(){
		console.log(333);
		$(this).attr("class","tel active init").next(".mail").removeClass("active");
		$(".tel_fortify").css("display","block").next(".mail_fortify").css("display","none");
		isSuccess();
		
	})
	$(".mail").click(function(){
		$(this).attr("class","mail active init").prev(".tel").removeClass("active");
		$(".mail_fortify").css("display","block").prev(".tel_fortify").css("display","none");
		isSuccess();
	})
	var code;
	//生成验证码
	code = $("#number").html(createCode()).html();
	$(".change").click(function(){
		code = createCode();
		$("#number").html(code);	
		
	})
	
	//验证
var validateRegExp = {
    email: "^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$", //邮件
    mobile: "^0?(13|15|18|14|17)[0-9]{9}$", //手机
    psw: "^.*[A-Za-z0-9\\w_-].*$", //密码
    username: "^[A-Za-z0-9_\\-\\u4e00-\\u9fa5]+$", //户名
};
var isRightSms = true;
var isRightImgCode = false;
//验证规则
var validateRules = {
    isNull: function(str) {
        return (str == "" || typeof str != "string");
    },
    betweenLength: function(str, _min, _max) {
        return (str.length >= _min && str.length <= _max);
    },
    isPwd: function(str) {
        return /^.*([\W_a-zA-z0-9-])+.*$/i.test(str);
    },
    isPwdRepeat: function(str1, str2) {
        return (str1 == str2);
    },
    isMobile: function(str) {
        return new RegExp(validateRegExp.mobile).test(str);
    },
    isEmail: function (str) {
        return new RegExp(validateRegExp.email).test(str);
    },
    code: function(str){
    	return (code == str);
    }
};

//验证文本
var validatePrompt = {
    isMobile:{
        err:{
            isNull:"手机号码不能为空",
            badFormat: "手机号码格式不正确，请重新输入"
        }
    },
    isEmail: {
        err: {
            isNull: "邮箱不能为空",
            badFormat: "邮箱格式不正确，请重新输入"
        }
    },
    msg:{
        err:{
            isNull:"验证码不能为空",
            badFormat:"验证码错误"
        }
    },
    isPwd:{
        err:{
            isNull:"密码不能为空",
            badFormat: "密码长度只能在6-16位字符之间",
            badName:"密码过于简单，建议由字母、数字和符号两种以上的组合"
        }
    },
    isPwdRepeat:{
        err:{
            isNull:"确认密码不能为空",
            badFormat:"两次输入的密码不相同"
        }
    },
    code:{
        err:{
            isNull:"图形验证码不能为空",
            badFormat:"图形验证码输入错误"
        }
    }
 

   }

function createCode(){
	 	var str="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	    var result="";
	    for(var i=0;i<5;i++){
	    	charIndex=Math.floor(Math.random()*str.length);
	    	result+=str.charAt(charIndex);
	    }
	    
	    return result;
	 }
//是否全都验证成功
function isSuccess(){
	var count = 0;
	var flag = false;
	$(".fortify p").find("input").each(function(){	
		var that = this;
		$(this).blur(function(){
			var way = $(this).attr("class");
			if(way){
				var res = !(validateRules.isNull($(this).val()));
				if(res){
					res = validateRules[way]($(this).val());
					//验证密码
					if(way == "isPwd"){
						res = validateRules[way]($(this).val())&& validateRules.betweenLength($(that).val(),6,16);	
					}
					//验证密码是否一致
					if(way == "isPwdRepeat"){
						res  = validateRules[way]($(this).val(),$(".isPwd").val());
					}
					//正则表达式验证后进行后续处理
					if(res){
						flag = true;
						$(this).addClass("success");
					}else{
						flag = false;
						$(this).next(".error").css("display","inline-block").html(validatePrompt[way].err.badFormat);
						$(this).next(".error").css("display","inline-block").html(validatePrompt[way].err.badFormat);
					}
				}else{
					$(this).next(".error").css("display","inline-block").html(validatePrompt[way].err.isNull);
				}
				}else{
					return;
				}
				
			})
			$(this).click(function(){
					$(this).removeClass("success").next(".error").css("display","none");
			})	
	})
	
		$(".register").click(function(){
			if(flag){
				$.ajax({
					type:"post",
					url:"../common.php",
					async:true,
					data: {"username":$(".isMobile").val(),"psw":$(".isPwd").val(),"act":"reg"},
					success:function(data){
						var user = JSON.parse(data);
						console.log(user.error);
						if(user.error == 0){
							window.location.href = "login.html";
						}else{
							alert("用户名已存在");
						}
					}
				})
			}
		})
}
	
		
	

				
})