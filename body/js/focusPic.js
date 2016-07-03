
$(function(){
	var ads = $(".slideBox li")
	for(var i=0;i<ads.length;i++){
		$(".flickBtn ul").append("<li></li>");
	}
	
	$dragBln = false;
	$(".slideBox").touchSlider({
		flexible : true,
		speed : 200,
		btn_prev : $("#btn_prev"),
		btn_next : $("#btn_next"),
		paging : $(".flickBtn li"),
		counter : function (e){
			$(".flickBtn li").removeClass("on").eq(e.current-1).addClass("on");
		}
	});
	
	$(".slideBox").bind("mousedown", function() {$dragBln = false;});
	$(".slideBox").bind("dragstart", function() {$dragBln = true;});
	$(".slideBox li").click(function(){
		if($dragBln) {
			return false;
		}
	});
	
	timer = setInterval(function(){
		$("#btn_next").click();
	}, 3000);
	
	$("#banner").hover(function(){
		clearInterval(timer);
	},function(){
		timer = setInterval(function(){
			$("#btn_next").click();
		},3000);
	});
	
	$(".slideBox").bind("touchstart",function(){
		clearInterval(timer);
	}).bind("touchend", function(){
		timer = setInterval(function(){
			$("#btn_next").click();
		}, 3000);
	});
	
})