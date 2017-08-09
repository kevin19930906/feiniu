$(function(){
	//获取id
	var res = location.search;
	res = res.slice("1").split("=")[1];
	var html = "";
	console.log("id"+res);
	$.get("json/list.json",function(data){
		for(var i in data){
			if(data[i].id == res){
				console.log(data[i])
				html += '<div class="pro_left">'+
					'<div class="middle_pic">'+
						'<img class="pic" src="'+data[i].d_smallImg[0]+'" alt="" />'+
						'<div class="mirror"></div>'+
						'<div class="bigmirror">'+
							'<img src="'+data[i].d_smallImg[0]+'" alt="" />'+
						'</div>'+
					'</div>'+
					'<div class="small_pic">'+
						'<ul>'
						
					$.each(data[i].d_smallImg,function(j,value){
						console.log(value);
						html+='<li>'+
								'<img src="'+value+'" alt="" />'+
							'</li>'
					})
						
							
					html+='</ul>'+
					'	<div class="btnL btn"></div>'+
						'<div class="btnR btn"></div>'+
					'</div>'+
					'<p><a href="#:;">收藏商品(1)</a></p>	'+
				'</div>'+
				'<div class="pro_right">'+
					'<div class="guidance">'+
						'<h1>'+data[i].name+'</h1>';
					if(data[i].intro != undefined){
						html +='<p>'+ data[i].intro+'</p>';
					}
						
				html+='</div>'+
					'<div class="limit">'+
						'<p>送积分 <span>'+Math.floor(data[i].nowPrice/2)+'</span></p>'+
						'<div>'+
							'<span>飞牛价</span>'+
							'<span><em>￥ </em>'+data[i].nowPrice+' </span>'+
							'<a href="#:;"> (降价通知)</a>'+	
						'</div>'+
					'</div>'+
					'<div class="detail_show">'
					if( data[i].smallImg.length >1){
						html +='<dl class="d" >'+
							'<dt>颜　　色</dt>'+
							'<dd>'
						$.each(data[i].smallImg,function(j,value){
							html += '<a href="detail.html?id="'+data[i].id+'><img src="'+value+'" alt="" /></a>'
						})
						html +='</dd>'+
							'</dl>'
					}			
					if(data[i].vol != undefined){		
						html +=	
							'<dl class="b">'+
								'<dt>已 选 择</dt>'+
								'<dd>"'+data[i].vol+'"</dd>'+
							'</dl>'
							
					}		
					html += '<dl class="c">'+'<dt>数　　量</dt>'+
							'<dd>'+
								'<a class="cut" href="#:;" title="减少数量">-</a>'+
								'<input class="count" type="text" value="1" />'+
								'<a class="plus" href="#:;" title="增加数量">+</a>'+
							'</dd>'+
						'</dl>'+
						'<p class="good_cart" good-id="'+data[i].id+'"></p>'+
					'</div>'+
					'<ul>'+
					'<li>送  货至 <select><option>重庆重庆市巴南区</option></select><span> 有货</span> 运费0.0元起</li>'+
					'<li>由 <span><i ></i>利蓝化妆品专营店</span> 发货并提供售后服务。</li>'+
					'<li>服务承诺 <span><i></i>支持7天无理由退货</span><span><i style="background-position:-31px -7px;"></i>正品保证</span> </li>'+
				'</ul>'+
				'</div>'+
			'</div>'
			
			html += '<div class="change">'+
						'<div class="look">'+
								'<p>看了又看</p>'+
								'<a class="chose" href="#:;">换一换</a>'+
							'</div>'+
							'<ul>'
							var arr1 = [rand(),rand(),rand()];
							for(var i = 0;i < 3;i++){
							
								html+=	'<li><a href="detail.html?id='+ data[arr1[i]].id+'"><img src="'+data[arr1[i]].bigImg+'" alt="" /></a>'+
									'<p><a href="detail.html?id='+data[arr1[i]].id+'">'+data[arr1[i]].name+'</a></p>'+
								'<p class="price">'+
										'<span class="now"><em>￥</em>'+data[arr1[i]].nowPrice+'</span>'
								'</p>'+
								'</li>'
							}
							
								
		html+='</ul>'+'</div>'+'</div>'
					
				$(".pro").html(html);
				
				
			
			}
		}
		
			//生成随机数
			function rand(){
			 var digit = parseInt(Math.random()*data.length);
				return digit;
			}
				
			//放大镜
			mirror();
			function mirror(){
				$(".middle_pic").mousemove(function(e){
				$(".mirror").css("display","block");
				$(".bigmirror").css("display","block");
				var evt = e || window.event;
				var left = evt.pageX - $(".middle_pic").offset().left - $(".mirror").width()/2;
				var top = evt.pageY - $(".middle_pic").offset().top - $(".mirror").height()/2;
				if(left<0){
							left =0;
						}
				if(top < 0){
					top =0;
				}
				var maxLeft = $(".middle_pic").width()- $(".mirror").width();
				var maxTop = $(".middle_pic").height() - $(".mirror").height();
				if(left >maxLeft){
					left = maxLeft;
				}
				if(top > maxTop){
					top = maxTop;
				}
					$(".mirror").css({"left":left,"top":top});
					var x1 = left/($(".middle_pic").width())*($(".bigmirror").children().width());
					var y1 = top /($(".middle_pic").height())*($(".bigmirror").children().height());
					$(".bigmirror").children().css({"left":-x1,"top":-y1});	
						
						return false;	
				
			})
			$(".middle_pic").mouseout(function(){
				$(".mirror").css("display","none");
				$(".bigmirror").css("display","none");
			})
		}
			
			//点击切换图片
			$(".small_pic").find("img").hover(function(){
				$(".middle_pic").children().eq(0).attr("src",$(this).attr("src"));
				$(".middle_pic .bigmirror").children().eq(0).attr("src",$(this).attr("src"));
			})
			
			//数值增加减
			add();
			function add(){	
				var res = $(".count").val();
				$(".plus").click(function(){
					console.log("a");
					console.log($(this));
					res++;
					
					$(".count").val(res);
				})
				$(".cut").click(function(){
					if(res <= 1){
						res = 1;
					}else{
						res--;
					}
					$(".count").val(res);
				})	
					
			}
			var str = $.cookie("cart");
		var obj = str?JSON.parse(str):{};
		var sum = 0;
			for(var i in obj){
				sum += parseInt(obj[i]);
			}
			$(".cart").find("span").eq(0).html(sum);
		$(".good_cart").click(function(){
			console.log($(this));
			var num =$(this).attr("good-id");
			var val = parseInt($(".count").val());	
			obj[num]=obj[num]? (parseInt(obj[num])+val) : val;
			sum =sum + val;
			var objstr = JSON.stringify(obj);
		 	$.cookie("cart",objstr,7);
			$(".cart").find("span").eq(0).html(sum);
			event.stopPropagation();	
			
			$.get("json/list.json",function(data){
				
				if($.cookie("cart") == undefined || $.cookie("cart") == {}){
					$(".cart").hover(function(){
						$(".cart_con").css("display","block");
						$(".cart_con1").css("display","none");
					},function(){
						$(".cart_con").css("display","none");
					})
					
				}else{
					$(".cart").hover(function(){
						$(".cart_con1").css("display","block");
						$(".cart_con").css("display","none");
					},function(){
						$(".cart_con1").css("display","none");
					})
					
					var html = "";
					var obj = JSON.parse($.cookie("cart"));
					html += '<dl>'+
							'<dt>飞牛自营</dt>'
							
					for(var attr in obj){
						$.each(data,function(i,value){
							if(attr == data[i].id){
								html +='<dd class="ele clearfix">'+
											'<b class="del">×</b>'+
											'<a href="detail.html?id='+data[i].id+'"><img src="'+data[i].bigImg+'"/></a>'+
											'<div>'+
												'<a href="detail.html?id='+data[i].id+'">'+data[i].name+'</a>'+
												'<div class="od">'+
													'<em>数量：<i>'+obj[attr]+'</i></em>'+
													'<span class="now"><i>￥'+data[i].nowPrice+'</i></span>'+
												'</div>	'+			
											'</div>	'	+								
										'</dd>'
							}
						})			
					}
					html+='</dl>'+
						'<div>'+
							'<div class="total">'+
								'<em><i>'+$(".cart").find("span").eq(0).html()+'</i>件</em>'+
							'</div>	'+
							'<p><a href="cart.html">去购物车结算 >></a></p>'+
					'</div>'
			
				$(".cart_con1").html(html);
			}
		})
		})
			
	})	
	
		
	

})
