<?php
    header("Content-Type: text/html;charset=utf-8");
    $filename = "json/baby.json";
    $handle = fopen($filename, "r");//读取二进制文件时，需要将第二个参数设置成'rb'

    //通过filesize获得文件大小，将整个文件一下子读到一个字符串中
    $baby = fread($handle, filesize ($filename));
    fclose($handle);
    $json = json_decode($baby);
?>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type"content="text/html; charset=utf-8">
<title>精英宝贝</title>
<meta name="Keywords" content="精英宝贝"/>
<meta name="Description" content="精英宝贝"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
<meta name="format-detection" content="telephone=no"/>
<meta http-equiv="Cache-Control" content="max-age=0"/>
<meta name="showLogo" content="true"/>
<link rel="stylesheet" href="css/common.css">
<script src="js/jquery-2.1.1.min.js"></script>
<script src="js/popBox.js"></script>
<script src="js/index.js"></script>
</head>
<body>

<div class="contentArea">
	<a href="list.html" class="listTitle f18 fRelative"><i class="babyIcon listArrow"></i>体育竞技</a>
    <content class="listArea">
   
        <footer class="babyFooter"><a href="#" class="btn fRelative" id="popboxLink1"><i class="babyIcon appointment"></i>预约</a></footer>

		<div class="pop">
			<div id="screen"></div><!--screen end-->
			<div class="popBox" nex="1">
				<div class="succeedContent">
				预约成功！
				</div>
			</div>
		</div><!--pop-->
	</content>
</div>
</body>
</html>
