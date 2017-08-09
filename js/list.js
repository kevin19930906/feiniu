$(function(){
	$.get("json/list.json",function(data){		
			//	分页
			var len = data.length;			
			var col = 12;//每一页显示多少张图片
			var row = Math.ceil(len / col);
			var html1 = "";
			var k = 0;
			//插入每一页的页码
			for(var i = 0;i < row;i++){
				html1 += '<a href="#:;">'+ (i+1)+'</a>'
			}
			$(".nums").html(html1).children().eq(0).addClass("cur");
			$(".goods_page a").each(function(i,value){
				$(value).click(function(){
					switch(i){
						case 0: if(k > 0){ k--;};break;
						case row+1 : if(k < (row-1)){ k++};break;
						default: k = i - 1;
					}
					
				var html ="";	
				for(var j=k*col;j < Math.min(len,(k+1)*col);j++){
					
					html += '<div class="goods_con">'+
							'<div class="g_bigImg">'+
								'<a href="detail.html?id='+ data[j].id+'"><img src="'+ data[j].bigImg+'"/></a>'+
							'</div>'+
							'<div class="g_smallImg"><ul>';
						
							$.each(data[j].smallImg,function(l,value1){
								html += '<li><a href="detail.html?id='+ value.id+'"><img src="'+value1+'"/></a></li>'
							})
											
					html +=	'</ul>'+
							'</div>'+
							'<p class="price">'+
									'<span class="now"><em>￥</em>'+data[j].nowPrice+'</span>';
											
							if(data[j].price != undefined){
								html += '<span class="old"><em>￥</em>'+data[j].oldPrice+'</span>'};
								
					html +='</p>'+
							'<p class="p_name">'+
								'<a href="detail.html?id='+ data[j].id+'">'+data[j].name +'</a>'+
							'</p>'+
							'<p class="p_intro">';
							if(data[j].intro != undefined){
								html+=	'<a href="detail.html?id='+ data[j].id+'">'+data[j].intro+'</a>';
							}				
					html +=		'</p>'+
							'<div class="p_act">'+
								'<div class="p_num">'+
									'<input class="inp" type="text" value=1 />'+
									'<p class="key"><span></span><span></span></p>'+						
								'</div>'+
								'<div class="p_btn" good-id="'+data[j].id+'">加入购物车</div>'	+
							'</div>'+
							'<div class="p_commit">'+
								'<i>好评 </i>';
							if(data[j].per != undefined){
								html +=	'<a href="#:;">'+data[j].per+'</a>'
								'<i> 评价<em>'+data[j].commit+'</em>条</i>';
							}
						
					html +=	'</div>'+
								'<p>飞牛自营</p>'+
							'</div>';						
					}
					var that = $(this);
				
					$(".goods_page span").find("a").removeClass("cur");
				
					if($(this).attr("class") != "p_next" && $(this).attr("class") != "p_prev"){
						$(this).addClass("cur");
					}else{
						console.log($(this).parent().find("span a").eq(k).siblings());
						$(this).parent().find("span a").eq(k).addClass("cur");
					}
					
					
					$(".goods_wrap").html(html);
					//数值的加减
						add();
						show();
						cart();
					})
				
			})
			
			//设置页面初始值;
			var html = "";
			for(let j=0;j < col;j++){
					
					html += '<div class="goods_con">'+
							'<div class="g_bigImg">'+
								'<a href="detail.html?id='+ data[j].id+'"><img src="'+ data[j].bigImg+'"/></a>'+
							'</div>'+
							'<div class="g_smallImg"><ul>';
						
							$.each(data[j].smallImg,function(l,value1){
								html += '<li><a href="detail.html?id='+ data[j].id+'"><img src="'+value1+'"/></a></li>'
							})
											
					html +=	'</ul>'+
							'</div>'+
							'<p class="price">'+
									'<span class="now"><em>￥</em>'+data[j].nowPrice+'</span>';
											
							if(data[j].price != undefined){
								html += '<span class="old"><em>￥</em>'+data[j].oldPrice+'</span>'};
								
					html +='</p>'+
							'<p class="p_name">'+
								'<a href="detail.html?id='+ data[j].id+'">'+data[j].name +'</a>'+
							'</p>'+
							'<p class="p_intro">';
							if(data[j].intro != undefined){
								html+=	'<a href="detail.html?'+ data[j].id+'">'+data[j].intro+'</a>';
							}				
					html +=		'</p>'+
							'<div class="p_act">'+
								'<div class="p_num">'+
									'<input class="inp" type="text" value=1 />'+
									'<p class="key"><span></span><span></span></p>'+						
								'</div>'+
								'<div class="p_btn" good-id="'+data[j].id+'">加入购物车</div>'	+
							'</div>'+
							'<div class="p_commit">'+
								'<i>好评 </i>';
							if(data[j].per != undefined){
								html +=	'<a href="#:;">'+data[j].per+'</a>'
								'<i> 评价<em>'+data[j].commit+'</em>条</i>';
							}
						
					html +=	'</div>'+
								'<p>飞牛自营</p>'+
							'</div>';
					
						
					}
			$(".goods_wrap").html(html);
			add();
			
			//数值的加减
			
			function add(){
				$(".p_num").each(function(i){
				var res = $(".p_num").eq(i).find(".inp").val();
				$(".key").eq(i).find("span").eq(0).click(function(){
					res++;
					
					$(".p_num").eq(i).find(".inp").val(res);
				})
				$(".key").eq(i).find("span").eq(1).click(function(){
					if(res <= 1){
						res = 1;
					}else{
						res--;
					}
					$(".p_num").eq(i).find(".inp").val(res);
				})	
				
				
				})
			}
			show();
			
			//圖片陰影部分
			function show(){
					$(".goods_con").mouseenter(function(){
						$(this).addClass("shadow").siblings().removeClass("shadow");
					})
					
			}
			cart();
			var str = $.cookie("cart");
			var obj = str?JSON.parse(str):{};
			var sum = 0;
			for(var i in obj){
				sum += parseInt(obj[i]);
			}
			$(".cart").find("span").eq(0).html(sum);
			//购物车
			function cart(){
			
				$(".p_act").find(".p_btn").click(function(event){
					console.log($.cookie("cart"));
					var num =$(this).attr("good-id");
					var val = parseInt($(this).prev().find(".inp").val());
					
					obj[num]=obj[num]? (parseInt(obj[num])+val) : val;
					sum =sum + val;
					var objstr = JSON.stringify(obj);
				 	$.cookie("cart",objstr,7);
//					$(".cart").find("span").eq(0).html(sum);
                    cart_count($(".cart").find("span").eq(0))
					console.log(JSON.parse($.cookie("cart")));
					event.stopPropagation();
					
			//将数据加入到购物车
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
				cow();
				//删除商品
//				$(".ele").find(".del").click(function(){		
//					var res = $(this).parent("dd").remove();
//					var access =res.find("a").attr("good-id");
//					obj = JSON.parse($.cookie("cart"));
//					for(var attr in obj){
//						if(access == attr){
//							delete obj[attr];
//							break;
//						}
//					}
//				 objstr = JSON.stringify(obj);
//					$.cookie("cart",objstr,7);
//					var sum= 0;
//					for(var i in obj){
//						sum += obj[i];
//					}
//					cart_count($(".cart").find("span").eq(0))
//					$(".total").find("i").html(sum);
//					
//				})
					
					
				}
				
			})
		
					
					
				})
			}
			
		
			
			$(".tab li").hover(function(){
				console.log($(this));
				$(".tab-panel").eq($(this).index()).css("display","block").siblings().css("display","none");
			})
			
		
			
		
	})
	
	
	function cart_count(ele){
		var str = $.cookie("cart");
		var obj = str?JSON.parse(str):{};
		var sum = 0;
		for(var i in obj){
			sum += parseInt(obj[i]);
		}
		ele.html(sum);
	}
		
})
