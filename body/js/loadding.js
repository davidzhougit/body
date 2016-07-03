// JavaScript Document
function scroll(fn){
	if(fn){
		$(document).on("scroll",function(){  
			var viewH =$(window).height(),//可见高度  
			contentH =$(this).height(),//内容高度  
			scrollTop =$(this).scrollTop();//滚动高度  
			if((contentH - scrollTop - viewH) <= 20 && typeof fn == "function"){ //到达底部100px时,加载新内容
				fn();
				return;
			}
		});
		return;
	}
	$(document).scroll();
};

$(function(){
	scroll(function(){
		$(".loadding").show();
		setTimeout(function(){
			$(".loadding").before($(".banner:eq(0)").clone());
			$(".loadding").hide();
		},1000);
	});
});