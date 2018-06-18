<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: X-Requested-With');
header('Access-Control-Allow-Methods: PUT, POST, GET, UPDATE, DELETE, EDIT, OPTIONS');

include("connectdb.inc");
include("date.php");
$data = json_decode(file_get_contents("php://input"));
$fromd = $data->fromd;
$tod = $data->tod;

if ($fromd == "" || $fromd == null) {
	$fromd = $stoday;
}
if ($tod == "" || $tod == null) {
	$time = strtotime($d.' +1 month');
    	$tod = date("m/d/Y", $time);
}
if($_GET["mbrid"]) {
	$mbrid = $_GET["mbrid"];
	
	if ($data) {
		$btn = $data->btn;

		if ($btn == "daily") {
			$dailyaction = $data->dailyaction;
			$dailyfood = $data->dailyfood;
			$incomeid = $data->incomeid;
			$sql1 = "UPDATE income_detail SET daily_food='$dailyfood',daily_action='$dailyaction' 
			WHERE income_detail_id=$incomeid AND recordstatus=1";
			mysqli_query($connect,$sql1)or die("Error in query".$sql1);
		}
	}

	$sql = "SELECT income_detail.*,income_header.* FROM income_detail 
	INNER JOIN income_header ON income_header.income_header_id=income_detail.income_header_id
	WHERE income_header.recordstatus=1 AND income_header.member_id=$mbrid AND STR_TO_DATE(income_detail.income_date, '%m/%d/%Y') 
	BETWEEN STR_TO_DATE('$fromd', '%m/%d/%Y') AND STR_TO_DATE('$tod', '%m/%d/%Y')
	ORDER BY STR_TO_DATE(income_detail.income_date, '%m/%d/%Y') DESC";
	$result = mysqli_query($connect,$sql)or die("Error in query".$sql);
	if (mysqli_num_rows($result)>0) {
		while ($a = mysqli_fetch_assoc($result)) {
			$ledger[] = $a;
		}
	}
	else{
		$ledger = "No Record";
	}

	$sql1 = "SELECT * FROM members WHERE member_id=$mbrid AND recordstatus=1";
	$result1 = mysqli_query($connect,$sql1)or die("Error in query".$sql1);
	if (mysqli_num_rows($result1)>0) {
		while ($a = mysqli_fetch_assoc($result1)) {
			$memberdata[] = $a;
		}
	}
	else{
		$memberdata = "No Record";
	}

	$data = array("ledger"=>$ledger, "member"=>$memberdata);
	print json_encode($data);
}
	
 ?>