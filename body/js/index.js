// JavaScript Document
// ajax请求回来的数据
var pager = {size:3,offset:0,total:0,rows:[]};
// 过滤的class名
var filter = '';
// 排序的class名
var sort = '';
// 过滤后的数据 - 最终显示用的数据
var filterPager = {size:3,offset:0,total:0,rows:[]};
var loadding = false;
//$(document).height();//整个网页的高度
//$(window).height();//浏览器可视窗口的高度
//$(window).scrollTop();//浏览器可视窗口顶端距离网页顶端的高度（滚动高度）
function scroll(fn){
	if(fn){
		$(document).on("scroll",function(){
			var viewH =$(window).height(),//可见高度
			contentH =$(this).height(),//内容高度
			scrollTop =$(this).scrollTop();//滚动高度
			//$(document).height() == $(window).height() + $(window).scrollTop()
			//(contentH - scrollTop - viewH) <= 20
			if(contentH == scrollTop + viewH  && typeof fn == "function"){ //到达底部100px时,加载新内容
				fn();
				return;
			}
		});
		return;
	}
	//获取滚动高度（内容高度-可见高度）
	$(window).scrollTop($(document).height()-$(window).height());
};
//过滤原数据，用以显示
function pagefilter()
{
	var sportType = '';
	if (filter=='icy'){
		sportType='冰上运动';
	}
	else if (filter=='badminton'){
		sportType='羽毛球';
	}
	else if (filter=='pingpang'){
		sportType='乒乓球';
	}
	else if (filter=='tennis'){
		sportType='网球';
	}
	else if (filter=='volleyball'){
		sportType='排球';
	}
	else if (filter=='basketball'){
		sportType='篮球';
	}
	else if (filter=='football'){
		sportType='足球';
	}

	filterPager = {size:3,offset:0,total:0,rows:[]};
	for(var i=0,len=pager.rows.length;i<len;i++) {
		var item = pager.rows[i];
		//sportType==''为无过滤
		//item.sport==sportType选择当前item数据为过滤过的数据类型
		if (sportType=='' || item.sport==sportType) {
			filterPager.rows.push(item);
		}
	}

	if (sort=='hot'){
		filterPager.rows.sort(function(a,b){return a.hot-b.hot})
	}else if (sort=='priceup'){
		filterPager.rows.sort(function(a,b){return a.fee-b.fee})
	}else if (sort=='pricedown'){
		filterPager.rows.sort(function(a,b){return b.fee-a.fee})
	}

	filterPager.size = pager.size;
	filterPager.offset = 0;
	// 重设过滤过后数据总个数
	filterPager.total = filterPager.rows.length;
};
function showPager(s,e){
	filterPager.offset = e;
	var data = filterPager.rows.slice(s,e);//从已有的数组中返回选定的元素
	var html = "";
	$.each(data,function(i,data){
		html += "<section class='banner fRelative pt4'>";
		html += "<a href='content.php?id="+data.id+"'>";
		html += "<img src='"+data.activityphoto+"' alt='' />";
		html += "<div class='bannerTop f12'><i class='old fl'>"+data.age+"</i>";
		if(data.fee == '0'){
		html += "<i class='free fr mr'>免费</i></div>";
		}else{
		html += "<i class='price fr mr'>"+data.fee+"元起</i></div>";
		}
		html += "<div class='bannerBottom plr f12'><p class='bannerTitle'>"+data.bannerTitle+"</p><p class='location f9 plr'><i class='babyIcon'></i>"+data.address+"</p></div>";
		html += "</a>";
		html += "</section>";
	});
	if(s==0){
		$(".theList").html(html);
	}
	else {
		$(".theList").append(html);
	}
}

$(function(){

	$(".classfilter").on("click",function(e){
		e.stopPropagation();
		$('.classfilter .filterList').toggle();
		$('.defaultfilter .filterList').slideUp();
	});

	$(".defaultfilter").on("click",function(e){
		e.stopPropagation();
		$('.defaultfilter .filterList').toggle();
		$('.classfilter .filterList').slideUp();
	});

	$(document).on("click",function(e){
		e.stopPropagation();
		$('.classfilter .filterList').slideUp();
		$('.defaultfilter .filterList').slideUp();
	});
	$('.classfilter .filterList dd').on("click",function(){
		// 增加当前过滤项目
		filter = $(this).attr('class');
		// 过滤数据
		pagefilter();
		$('.classfilter span').html($(this).text()+"<i class='babyIcon listArrowDown'></i>");
		// 显示数据 - 显示前5条
		showPager(0,5);
	});

	$('.defaultfilter .filterList dd').on("click",function(){
		// 增加当前排序项目
		sort = $(this).attr('class');
		// 排序数据
		pagefilter();
		$('.defaultfilter span').html($(this).text()+"<i class='babyIcon listArrowDown'></i>");
		// 显示数据 - 显示前5条
		showPager(0,5);
	});

	if(loadding){
		return;
	}
	loadding = true;
	$.getJSON("json/baby.json",function(jsons){
		loadding = false;
		var json = jsons[0];
		//将json数据合并到pager中,返回值为合并后的pager
		$.extend(pager,json);
		// 过滤数据 - 这里是把pager数据传给filterPager，二者数据内容完全一样
		pagefilter();
		// 显示数据 - 显示前5条
		showPager(0,5);
	});
	//$.ajax({
	//	type:"get",
	//	async:true,
	//	url:"json/baby.json",
	//	dataType:"json",
	//	success:function(jsons){
	//		var json = jsons[0];
	//		$.extend(pager,json);
	//		pagefilter();
	//		showPager(0,5);
	//	}
	//})

	scroll(function(){
		$(".loadding").show();
		setTimeout(function(){
			var s = filterPager.offset, e = filterPager.offset+filterPager.size;
			e = e > filterPager.total ?  filterPager.total : e;
			showPager(s,e);
			$(".loadding").hide();
		},1000);
	});
	scroll();
});

$(function(){
	  $.getJSON("json/baby.json",function(data){
		var dataInfo = data[0].rows
		var content = "";
		$.each(dataInfo,function(i,json){
			 if(location.href.indexOf('id='+json.id)==-1) return;

			content +="<section class='activityContent'>";
			content += "<figure class='banner'><img src='"+json.activityphoto+"' alt=''/></figure>";
			content += "<dl>";
			content += "<dt class='plr pt4 mlh f18'>"+json.bannerTitle+"</dt>";
			content += "<dd class='plr pb slh f12'>";
			content += "<p>"+json.textintro+"</p>";
			content += "</dd>";
			content += "</dl>";
			content += "</section>";
			content += "<div class='gap'></div>";
			content +="<section class='activityContent'>";
			content += "<dl>";
			content += "<dt class='pl lh24 f15 fRelative'><i class='babyIcon baseIcon'></i>基本信息</dt>";
			content += "<dd class='slh f12'>";
			if(json.fee == '0'){
				content += "<p class='bT plr pt4 pb4'>费用：<i class='orange'>免费</i>";
				}else{
				content += "<p class='bT plr pt4 pb4'>费用：<i class='orange'>"+json.fee+"元起</i></p>";
				}
			content += "<p class='bT plr pt4 pb4'>时间："+json.time+"</p>";
			content += "<p class='bT plr pt4 pb4'>年龄："+json.age+"</p>";
			content += "<p class='bT plr pt4 pb4'>地址："+json.address+"</p>";
			content += "</dd>";
			content += "</dl>";
			content += "</section>";
			content += "<div class='gap'></div>";
			content +="<section class='activityContent pb48'>";
			content += "<dl>";
			content += "<dt class='lh24 fRelative pl'><i class='babyIcon activityIcon'></i>活动详情</dt>";
			content += "<dd class='banner'>";
			content += "<p><img src='"+json.activityphoto+"' alt=''/></p>";
			content += "</dd>";
			content += "</dl>";
			content += "</section>";
		});
			$(".listArea").append(content);
	  })
	})
