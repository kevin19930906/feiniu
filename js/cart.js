$(function(){
	$(".head").load("common.html #top");
		$.get("json/list.json",function(data){
			var html = "";
			var str = $.cookie("cart");
			var obj = str?JSON.parse(str):{};
			var sum = 0;
			for(var i in obj){
				sum += parseInt(obj[i]);
			}
			if($.cookie("cart") != undefined && $.cookie(".cart") != {}){
				for(var attr in obj){
					
					$.each(data,function(j,value){
						if(value.id == attr){
							html += '<div class="commodity_con">'+
											'<li>'+
												' <input type="checkbox" /> '+
											'</li>'+
											'<li><img src="'+data[j].bigImg+'" alt="" /></li>'+
											'<li>'+
												'<p>'+data[j].name+'</p>'+
											'</li>'+
											'<li>'+data[j].nowPrice+'</li>'+
											'<li>'+
												'<a href="">-</a>'+
												'<p>'+ obj[attr] +'</p>'+
												'<a href="">+</a>'+
											'</li>'+
											'<li class="total">'+ obj[attr] * data[j].nowPrice+'</li>'+
											'<li>3.5kg</li>'+
											'<li>'+
												'<p>移入收藏夹</p>'+
												'<span>删除</span>'+
											'</li>'+
										'</div>	';
							
						}
					})	
				}
				$(".commodity").html(html)	;
				var sum = 0;
				$(".total").each(function(j,value){
					sum += parseFloat($(value).html());
				})
				$(".settle_price").html("￥"+sum);

			}
			
			
			
		})
})
