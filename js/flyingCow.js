$(function(){

	//轮播图	
	(function carousel(){
		var ind = 0;
		var timer = null;
		$(".circle div").css("width",$(".circle li").length*($(".circle li").width()+ 10));
	//开启定时器
		move();
		timer = setInterval(move,4000);
		$(".btnL").click(function(){
			clearInterval(timer);
			if(ind == 0){
				ind = $(".carousel_pic li").length -2;		
			}else{
				ind -=2;
			}
			move();
			timer=setInterval(move,4000);
			
		})
		$(".btnR").click(function(){
			clearInterval(timer);
			move();
			timer=setInterval(move,4000);
		})
		$("#carousel").hover(function(){
			$(".btn").css("display","block");
		},function(){
			$(".btn").css("display","none");
		})
		$.each($(".circle li"),function(){
			$(this).mouseenter(function(){
				ind = $(this).index() -1;
				move();
			})
		})
		
		function move(){
			ind++;
			if(ind == $(".carousel_pic li").length){
				ind = 0;
			}
			$(".circle li").eq(ind).addClass("circle_active").siblings().removeClass("circle_active");
			$(".carousel_pic li").eq(ind).show().siblings().hide();
			
			
		}
	})()
	
	
	//飞牛位置固定定位和楼梯
	var flag = true;
	$(document).scroll(function(){
		var dis = $(this).scrollTop();
		var y = $("#carousel").offset().top + $("#carousel").height();
		
		//飞牛固定定位显示或隐藏
		if(dis >= y){
			$(".gkp_flycow").css("display","block");
			$(".floor").fadeIn();
		}else{
			$(".gkp_flycow").css("display","none");
			$(".floor").fadeOut();
			
		}
		
		//楼梯
		
		$(".snack").each(function(){
			if(flag){
				var min = $(this).offset().top - $(this).height()/2;
			
				if(dis >= min){
					$(".floor li").eq(($(this).index()-5)).children("span").css("display","block").addClass("stair").end().siblings().children("span").css("display","none").removeClass("stair");
				}
			}
			
		})
	
	})
	$(".floor li").click(function(){
			flag = false;
			var num = $(this).index();
			$("html,body").stop().animate({"scrollTop":($(".snack").eq(num).offset().top - 130)},500,function(){
				flag = true;
			});
		})
	$(".floor li").hover(function(){
			$(this).children().addClass("stair").css("display","block").end().siblings().children().css("display","none");
		});
	
	

	
	
	
	
	//导航选择
	$(".snack_nav li").hover(function(){
		$(this).addClass("nav_choose").siblings().removeClass("nav_choose");
	})
	
	//楼梯一楼
	$.ajax({
		type:"get",
		url:"json/flyingCow.json",
		async:true,
		success:function(data){
			var arr = [];		
			var arr1 = [];
			//区域一
			
			var html=html1=html2 = "";
			
				
				$.each(data[0].f1,function(i,value){
					html += '<li><img src="'+ value +'" alt="" /></li>'	
			})
				
				arr1.push(html);

			//区域2-6
			for(var j=0;j<5;j++){
				 html1 = "";
				var fl = "";
				$.each(data[0],function(){
					switch(j){
						case 0: fl = data[0].f2;break;
						case 1: fl = data[0].f3;break;
						case 2: fl = data[0].f4;break;
						case 3: fl = data[0].f5;break;
						case 4: fl = data[0].f6;break;
						default:;
						
					}	
				})
				$.each(fl,function(i,value){
						html1 += '<li>'+
							'<a href="#:;"><img src="'+ fl[i].img +'" alt="" /></a>'+
							'<a href="#:;">'+ fl[i].intro +'</a>'+
							'<a href="#:;"><span>￥</span>'+fl[i].price +'</a>'+
						'</li>'	;
					})
				arr1.push(html1);
				
			}
			
				//品牌商标加入到brand中
				$.each(data[0].f0,function(i,value){
					html2 += '<li><img src="'+ value +'" alt="" /></li>';	
				})
				$(".brand").children("ul").html(html2);				
				
			
				$(".snack_right").html(arr1[0]).next().css("display","none");
			
			//鼠标移入移出显示阶层数据
				$(".snack").each(function(){
					var that = this;
					var index = ($(this).index() - 5);
					$(this).find("li").mouseenter(function(){
						if($(this).hasClass("nav_first")){
							$(that).find(".snack_right").html(arr1[0]).css("display","block");
							$(that).find(".snack_right2").css("display","none");
						}else{
							$(that).find(".snack_right2").html(arr1[$(this).index()]).css("display","block");
							$(that).find(".snack_right").css("display","none");
						}
					})
				})
				
			
			
		}
		
		
	})
	
	
})
