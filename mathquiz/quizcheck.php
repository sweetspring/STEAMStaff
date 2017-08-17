<?php 
if(isset($_POST['emath10fp'])){
	if($_POST['emath10fp'] == "20140915"){
		//echo "a";
	}
	else{
	header('location:/quiz/englandmath-10-forpupil.html');
	return;

	}
}
else{
	//echo "Error,哥们没事别瞎折腾，呵呵";
	header('location:/quiz/englandmath-10-forpupil.html');
	return;
}
	//const ENGLAND_MATH_RESULT_LOG = 'ENGLAND_MATH_RESULT_LOG.log';
    function LogToApache($Message){
        $resultlog = fopen('ENGLAND_MATH_RESULT_LOG.log','a');
        fwrite($resultlog,"\r\n\r\n".$Message);
        fclose($resultlog);
    }
class Quiz {  
  var $question;    
  var $answer;  
  var $correct;  
  function __construct($question, $answer, $correct) {
   $this->question = $question;  
   $this->answer = $answer;     
   $this->correct = $correct;   
  }
}

$quizs = array( 
new Quiz("下面哪些分式不等于1/4？",
array(
"2/8",
"10/40",
"4/8",
"5/20"),"C"),

new Quiz(
"250 x 8 =",
array(
"1500",
"2000",
"2500",
"3000"),"B"
),
new Quiz(
"正方形的面积等于64平方米，它的边长是多少米？",
array(
"4",
"8",
"12",
"16"),
"B"
),
new Quiz(
"换算1.6 kg 为 克数(g)",
array(
"16",
"160",
"1600",
"16000"),"C"
),
new Quiz(
"小镇的人口为12840。1/10的人口为5岁及以下。有多少人大于5岁？",
array(
"11556",
"11566",
"11656",
"11856"),"A"
),
new Quiz(
"这些数字的平均值是多少： 20, 6, 10, 24？",
array(
"10",
"15",
"20",
"60"),"B"
),
new Quiz(
"没标注的那个角度是多少？",
array(
"20°",
"30°",
"40°",
"50°"),"C"
),
new Quiz(
"在莫斯科，中午的温度是 8°C ，午夜的温度是 -3°C，温度改变了多少?",
array(
"10",
"11",
"12",
"-10"),"B"
),
new Quiz(
"一个房子出售为400000英镑，付给房产中介这400000英镑的3%，那么房产中介拿到多少？",
array(
"12000",
"24000",
"36000",
"48000"),"A"
),
new Quiz(
"计算(72.16 ÷ 8) + (45.34 – 37.63)",
array(
"15.37",
"15.73",
"16.37",
"16.73"),"D")

);

	$checks = array(0,0,0,0,0,0,0,0,0,0);
	$correctcount = 0;
	$myanswer = array();
 	for ($i = 0; $i < 10; $i++) {
		$qid = 'Q'.($i+1);
		if(isset($_POST[$qid])){
			$myanswer[$i] = $_POST[$qid];
		}
		else{
			$myanswer[$i] = null;
		}
		if($quizs[$i]->correct ===  $myanswer[$i]){
			$checks[$i] = 1;
			$correctcount ++;
		}		 
	}


  
class ip{  
    function showIp(){  
        if(getenv('HTTP_CLIENT_IP') && strcasecmp(getenv('HTTP_CLIENT_IP'),'unknown')){  
            $onlineip = getenv('HTTP_CLIENT_IP');  
        } elseif(getenv('HTTP_X_FORWARDED_FOR') && strcasecmp(getenv('HTTP_X_FORWARDED_FOR'),'unknown')){  
             $onlineip = getenv('HTTP_X_FORWARDED_FOR');  
        } elseif(getenv('REMOTE_ADDR') && strcasecmp(getenv('REMOTE_ADDR'),'unknown')){  
            $onlineip = getenv('REMOTE_ADDR');  
        } elseif(isset($_SERVER['REMOTE_ADDR']) && $_SERVER['REMOTE_ADDR'] && strcasecmp($_SERVER['REMOTE_ADDR'],'unknown')){  
            $onlineip = $_SERVER['REMOTE_ADDR'];  
        }  
    return $onlineip;  
    }//function  
}//class  
$ip=new ip();  

	date_default_timezone_set("Asia/Shanghai");
	$myanswerstr =implode("\t",$myanswer);
	$Message = $myanswerstr."\t".$correctcount."\t".$ip->showIP()."\t".date("Y.m.d")."\t".date("h:i:sa");
	LogToApache($Message);

?>
 
<!DOCTYPE html>

 
<!--[if IEMobile 7]><html class="no-js iem7 oldie linen"><![endif]-->
<!--[if (IE 7)&!(IEMobile)]><html class="no-js ie7 oldie linen" lang="en"><![endif]-->
<!--[if (IE 8)&!(IEMobile)]><html class="no-js ie8 oldie linen" lang="en"><![endif]-->
<!--[if (IE 9)&!(IEMobile)]><html class="no-js ie9 linen" lang="en"><![endif]-->
<!--[if (gt IE 9)|(gt IEMobile 7)]><!--><html class="no-js linen" lang="en"><!--<![endif]-->


<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

	<title>我答对了<?php echo $correctcount; ?>题！英国小学数学测试，据说20个英国成年人里只有1个人能全部答对这10题。</title>

	<meta name="description" content="">
	<meta name="author" content="">

 	<meta name="HandheldFriendly" content="True">
	<meta name="MobileOptimized" content="320">

 	<meta name="viewport" content="user-scalable=0, initial-scale=1.0, target-densitydpi=115">

	<!-- For all browsers -->
	<link rel="stylesheet" href="../cmobilecssjs/css/reset.css?v=1">
	<link rel="stylesheet" href="../cmobilecssjs/css/style.css?v=1">
	<link rel="stylesheet" href="../cmobilecssjs/css/colors.css?v=1">
	<link rel="stylesheet" media="print" href="../cmobilecssjs/css/print.css?v=1">
	<!-- For progressively larger displays -->
	<link rel="stylesheet" media="only all and (min-width: 480px)" href="../cmobilecssjs/css/480.css?v=1">
	<link rel="stylesheet" media="only all and (min-width: 768px)" href="../cmobilecssjs/css/768.css?v=1">
	<link rel="stylesheet" media="only all and (min-width: 992px)" href="../cmobilecssjs/css/992.css?v=1">
	<link rel="stylesheet" media="only all and (min-width: 1200px)" href="../cmobilecssjs/css/1200.css?v=1">
	<!-- For Retina displays -->
	<link rel="stylesheet" media="only all and (-webkit-min-device-pixel-ratio: 1.5), only screen and (-o-min-device-pixel-ratio: 3/2), only screen and (min-device-pixel-ratio: 1.5)" href="../cmobilecssjs/css/2x.css?v=1">

 
	<!-- Additional styles -->
	<link rel="stylesheet" href="../cmobilecssjs/css/styles/form.css?v=1">
	<link rel="stylesheet" href="../cmobilecssjs/css/styles/switches.css?v=1">
	<link rel="stylesheet" href="../cmobilecssjs/css/styles/table.css?v=1">

	<!-- DataTables -->
	<link rel="stylesheet" href="js/libs/DataTables/jquery.dataTables.css?v=1">

	<!-- JavaScript at bottom except for Modernizr -->
	<script src="js/libs/modernizr.custom.js"></script>

	<!-- For Modern Browsers -->
	<link rel="shortcut icon" href="../cmobilecssjs/img/favicons/favicon.png">
	<!-- For everything else -->
	<link rel="shortcut icon" href="../cmobilecssjs/img/favicons/favicon.ico">

	<!-- iOS web-app metas -->
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">

	<!-- iPhone ICON -->
	<link rel="apple-touch-icon" href="../cmobilecssjs/img/favicons/apple-touch-icon.png" sizes="57x57">
	<!-- iPad ICON -->
	<link rel="apple-touch-icon" href="../cmobilecssjs/img/favicons/apple-touch-icon-ipad.png" sizes="72x72">
	<!-- iPhone (Retina) ICON -->
	<link rel="apple-touch-icon" href="../cmobilecssjs/img/favicons/apple-touch-icon-retina.png" sizes="114x114">
	<!-- iPad (Retina) ICON -->
	<link rel="apple-touch-icon" href="../cmobilecssjs/img/favicons/apple-touch-icon-ipad-retina.png" sizes="144x144">

	<!-- iPhone SPLASHSCREEN (320x460) -->
	<link rel="apple-touch-startup-image" href="../cmobilecssjs/img/splash/iphone.png" media="(device-width: 320px)">
	<!-- iPhone (Retina) SPLASHSCREEN (640x960) -->
	<link rel="apple-touch-startup-image" href="../cmobilecssjs/img/splash/iphone-retina.png" media="(device-width: 320px) and (-webkit-device-pixel-ratio: 2)">
	<!-- iPhone 5 SPLASHSCREEN (640×1096) -->
	<link rel="apple-touch-startup-image" href="../cmobilecssjs/img/splash/iphone5.png" media="(device-height: 568px) and (-webkit-device-pixel-ratio: 2)">
	<!-- iPad (portrait) SPLASHSCREEN (748x1024) -->
	<link rel="apple-touch-startup-image" href="../cmobilecssjs/img/splash/ipad-portrait.png" media="(device-width: 768px) and (orientation: portrait)">
	<!-- iPad (landscape) SPLASHSCREEN (768x1004) -->
	<link rel="apple-touch-startup-image" href="../cmobilecssjs/img/splash/ipad-landscape.png" media="(device-width: 768px) and (orientation: landscape)">
	<!-- iPad (Retina, portrait) SPLASHSCREEN (2048x1496) -->
	<link rel="apple-touch-startup-image" href="../cmobilecssjs/img/splash/ipad-portrait-retina.png" media="(device-width: 1536px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 2)">
	<!-- iPad (Retina, landscape) SPLASHSCREEN (1536x2008) -->
	<link rel="apple-touch-startup-image" href="../cmobilecssjs/img/splash/ipad-landscape-retina.png" media="(device-width: 1536px)  and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 2)">

	<!-- Microsoft clear type rendering -->
	<meta http-equiv="cleartype" content="on">
</head>

<body class="full-page-wizard">

   <section role="main" id="main"  class="block wizard same-height">
		<hgroup id="main-title" class="thin">
			<h1>英国小学数学测试结果</h1>
		</hgroup>
<div id = "result" class="with-padding" style="text-align:left">
 

			<table class="simple-table responsive-table" id="sorting-example2">

				<thead>
					<tr>
						<th scope="col">题目</th>
						<th scope="col" width="25%" class="hide-on-mobile">正确答案</th>
						<th scope="col" width="25%" class="hide-on-mobile">你的答案</th>
						<th scope="col" width="25%" class="hide-on-mobile-portrait">结果</th>

 					</tr>
				</thead>

				<tfoot>
					<tr>
						<td colspan="4">
							答对了 <?php echo $correctcount; ?> 题
						</td>
					</tr>
				</tfoot>

				<tbody>
<?php
function convertABCD($abcd){
	$caindex = 0; 
	if($abcd == "A"){
		$caindex = 0;
	}
	else 	if($abcd == "B"){
		$caindex = 1;
	}
	else 	if($abcd == "C"){
		$caindex = 2;
	}
	else 	if($abcd == "D"){
		$caindex = 3;
	}
	return $caindex;
}

for ($i = 0; $i < 10; $i++) {
	echo "<tr><th scope=\"row\">".$quizs[$i]->question."<br></th>";
	echo "<td>".$quizs[$i]->correct."、".$quizs[$i]->answer[convertABCD($quizs[$i]->correct)]."</td>";
	if($myanswer[$i] === null){
	echo "<td>没有选择</td>";
	}
	else{
	echo "<td>".$myanswer[$i]."、".$quizs[$i]->answer[convertABCD($myanswer[$i])]."</td>";
	}

	if($checks[$i]){
		echo "<td><small class=\"tag green-bg\">√</small></td></tr>";
	}
	else{
		echo "<td><small class=\"tag red-bg\">×</small></td></tr>";
	}
}
?>
					 
				</tbody>
			</table>
			</div></section>
	 
 
<hr>
 
		<footer><script type="text/javascript">var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_5088214'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "v1.cnzz.com/stat.php%3Fid%3D5088214%26show%3Dpic1' type='text/javascript'%3E%3C/script%3E"));</script> Copyright by oktopbest.com 2014. </footer>

</body>
</html>