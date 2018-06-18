<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: X-Requested-With');
header('Access-Control-Allow-Methods: PUT, POST, GET, UPDATE, DELETE, EDIT, OPTIONS');

include("connectdb.inc");
include("date.php");
$data = json_decode(file_get_contents("php://input"));
$fromd = $data->fromd;
$tod = $data->tod;

if ($fromd != "" && $fromd != null && $tod != "" && $tod != null) {
	$qq = "AND STR_TO_DATE(income_header.register_date, '%m/%d/%Y') 
		BETWEEN STR_TO_DATE('$fromd', '%m/%d/%Y') AND STR_TO_DATE('$tod', '%m/%d/%Y') 
		ORDER BY STR_TO_DATE(income_header.register_date, '%m/%d/%Y') DESC";	
}
else{
	$qq = "ORDER BY STR_TO_DATE(income_header.register_date, '%m/%d/%Y') DESC LIMIT 50";
}

if($_GET["mbrid"]) {
	$mbrid = $_GET["mbrid"];
}

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

	$sql = "SELECT income_header.*,member_type.mbr_type_name,promotion.pro_description FROM income_header 
	INNER JOIN member_type ON member_type.mbr_type_id = income_header.mbr_type_id
	LEFT JOIN promotion ON promotion.promotion_id = income_header.type_pro_id
	WHERE income_header.recordstatus=1 AND income_header.member_id=$mbrid $qq";
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
 ?>