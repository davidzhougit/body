// JavaScript Document
$(function(){
  $.getJSON("json/baby.json",function(data){
	var content = "";
	$.each(data[0].rows,function(i,json){
		 if(location.href.indexOf('id='+json.id)==-1) return;
		content += "<dl>";
		content += "<dt class='pl lh24 f15 fRelative'><i class='babyIcon baseIcon'></i>基本信息</dt>";
		content += "<dd class='slh f12'>";
		if(data.fee == '0'){
			content += "<p class='bT plr pt4 pb4'>费用：<i class='orange'>免费</i>";
			}else{
			content += "<p class='bT plr pt4 pb4'>费用：<i class='orange'>"+json.fee+"元起</i></p>";
			}
		content += "<p class='bT plr pt4 pb4'>时间："+json.time+"</p>";
		content += "<p class='bT plr pt4 pb4'>年龄："+json.age+"</p>";
		content += "<p class='bT plr pt4 pb4'>地址："+json.address+"</p>";
		content += "</dd>";
		content += "</dl>";
	});
		$("#baseInfo").html(content);
  })
})
