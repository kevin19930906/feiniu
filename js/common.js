$(function(){
	$("header").load("common.html #header",function(){
			(function board(){
		$("#board .show").click(function(){
		if($(this).attr("class") == "show"){
			$(this).attr("class","fold");
			$("#board").css("height","300px");
			$(this).prev().children().attr("src","img/index/CsmRsll_23iAcYt2AAF2-dYArbY659.jpg");
		}else{
			$(this).attr("class","show");
			$("#board").css("height","60px");
			$(this).prev().children().attr("src","img/index/CsmRsVl_2r-AC-7LAAC3j-jxUIA784.jpg");
		}		
	})
		$(".close").click(function(){
			$(this).parents("#board").css("display","none");
		})	
	})();
	
	
		//送货地区
		(function area(){
			$.ajax({
			type:"get",
			url:"json/area.json",
			async:true,
			success:function(data){
				//左侧
				var flag = false;
				var html = "";
				$.each(data.areaL,function(i,value){
					html += '<li><span>'+value.title+'</span>';
					$.each(value.county,function(j,val){
						html+='<a href="#" class="county" target="_self">'+ val +'</a>'
					})
					html+='</li>';
				})
				$(".area").find("ul").eq(0).html(html);
				
				//右侧内容
				var html1 ="";
				$.each(data.areaR,function(i,value){
					html1 += '<li><span>'+value.title+'</span>';
					$.each(value.county,function(j,val){
						html1+='<a href="#" class="county" target="_self">'+ val +'</a>'
					})
					html1+='</li>';
				})
				$(".area").find("ul").eq(1).html(html1);
				
				$(".jian").mouseenter(function(){
					$(".area").show()
				})
				$(".jian").mouseleave(function(){
					$(".area").hide()
				})
				
				$(".jian").find(".county").hover(function(){
					$(this).css({"background":"#f7f7f7","color":"#d7063b"})
				},function(){
						$(this).css({"background":"#fff","color":"#000"});
		
				})
				$(".jian").find(".county").click(function(){
					$(".jian .area_con").html($(this).html());
				
					
				})
			}
		})
		})();
		
		
		//小箭头旋转	
		(function arrow(){
			$(".sg").hover(function(){
				$(this).find(".jt").css({
					"transform":"rotate(270deg)",
					
				});
				$(this).css("backgroundColor","#fff");
			},function(){
				$(this).find(".jt").css({
					"transform":"rotate(90deg)",	
				});
				$(this).css("backgroundColor","#f7f7f7")
				
			})
		})();
		//arttemplate js模块加载
		$.get("json/nav.json",function(data){
			var html = template("nav1",data);
			$(".classify ul").html(html);
		})
		
		$(".classify ul").on("mouseenter","li",function(){
			$(".cater").show();
			var index = $(this).index();
			
			$.get("json/nav_data.json",function(data){
				var res = data[index].model;
				var html = "";
				html += '<div class="cater_con">'
				
					for(var i = 0;i< res.length;i++){
						var res1= res[i];
						html += '<div>'	
						for(var j= 0;j<res1.length;j++){
							html+='<dl>'+			
									'<dt><a href="list.html">'+res1[j].subTitle+'</a></dt>'+
									'<dd>'	
							var res2 =res1[j].subList;
							for(var k = 0;k<res2.length;k++){
								html+='<a href="list.html">'+res2[k]+'</a>'
							}
							html+=	'</dd>'+				
								'</dl>'
						}							
					
						html+='</div>'	
					}
														
					html+=	'<div>'		
					for(var l= 0;l < data[index].sec.length;l++){
						html +='<img src="'+data[0].sec[l]+'" alt="" />'
					}
					html+='</div>'+	'</div>'
				$(".classify .cater").html(html);	
			})
		
		})
	
		$(".classify").on("mouseleave",function(){
			$(".cater").hide();
		})
	
		//
		function cart_count(ele){
			var str = $.cookie("cart");
			var obj = str?JSON.parse(str):{};
			var sum = 0;
			for(var i in obj){
				sum += parseInt(obj[i]);
			}
			ele.html(sum);
		}
		cart_count($(".cart").find("span").eq(0))
			//购物车
		$.get("json/list.json",function(data){
			console.log($.cookie("cart"));
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
				console.log(data);
				html += '<dl>'+
						'<dt>飞牛自营</dt>'
						
				for(var attr in obj){
					$.each(data,function(i,value){
						if(attr == data[i].id){
							html +='<dd class="ele clearfix">'+
										'<b class="del">×</b>'+
										'<a good-id="'+data[i].id+'" href="detail.html?id='+data[i].id+'"><img src="'+data[i].bigImg+'"/></a>'+
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
			cow();
			function cow(){
				$(".ele").find(".del").click(function(){
				var res = $(this).parent("dd").remove();		
				var access =res.find("a").attr("good-id");
				var obj = JSON.parse($.cookie("cart"));
				for(var attr in obj){
					console.log(attr);
					if(access == attr){
						delete obj[attr];
						break;
					}
				}
				var objstr = JSON.stringify(obj);
				console.log(objstr);
				$.cookie("cart",objstr,7);
				var sum= 0;
				for(var i in obj){
					sum += obj[i];
				}
				$(".cart").find("span").eq(0).html(sum);
				$(".total").find("i").html(sum);
				
			})
			}
		
			
			
			
			
			
		})
		
	
	});
	
	
	$(".foot").load("common.html #footer");
	$(".foot1").load("common.html #footer1");
})
