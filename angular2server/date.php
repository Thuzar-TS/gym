<?php 
	date_default_timezone_set("Asia/Rangoon");
	$d=date("Y/m/d");
	$today = date("d-m-Y");
	$stoday = date("m/d/Y");
	$sdate = date("Y-m-d");

	 $time = strtotime($d.' -1 day');
    	$yesterday = date("m-d-Y", $time);
	
	$dd=explode("/",$d);
	$s=implode("",$dd);
	//echo $s;
	$time=strtotime($s);
	$date=date("Y/m/d", $time);
	
	$cutime = date("H:i:s");
	$check = date('m/d');
	$year = date('Y');

	$startdate = date('m/01/Y');
	$enddate = date('m/t/Y');

	/*$alertnum = 3;
	$time = strtotime($stoday." + $alertnum day");
    		$alertday = date("m/d/Y", $time);
    		echo $alertday;*/

	//echo strtotime("12/24/2017")."<br/>".strtotime($today);
//	$aaa = (strtotime("12/24/2017")-strtotime("12/23/2017"))/(24*60*60);

//$i = 1;
//	echo strtotime("12/24/2017"."+$i day");

/*$arr = array('12/24/2017','12/25/2017');
if(!in_array('12/24/2017',$arr)){
	echo "hello";
}
else{
	echo "hi";
}*/
/*$str = "50,per";
$totalamt = 1000;
$arr = explode(",",$str);
//$perval = intval($arr[0]);
$totalper = $totalamt*(intval($arr[0])/100);
$totalamt -= $totalper;

echo $arr[0]."</br>".$totalper."</br>".$totalamt;*/
/*
$myString = 'She said: "I don\'t know."';
printf('<input type="text" name="myInput" value="%s" />'
       , htmlspecialchars($myString));*/
//echo date('m-t-Y');
?>