<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: X-Requested-With');
header('Access-Control-Allow-Methods: PUT, POST, GET, UPDATE, DELETE, EDIT, OPTIONS');

include("connectdb.inc");
include("date.php");
$data = json_decode(file_get_contents("php://input"));
$expiredmbr = array();
$expiredalertsize = 0;
$dailyalertsize = 0;

	if ($data) {
		$btn = $data->btn;

		if ($btn == "endmbr") {
			$mbrid = $data->mbrid;
			$expdate = $data->expdate;
			
			$sqlend = "UPDATE income_header SET mbr_end=1 
			WHERE member_id=$mbrid AND end_date='$expdate' AND recordstatus=1";
			mysqli_query($connect,$sqlend)or die("Error in query".$sqlend);

			$sqlend1 = "UPDATE members SET mbr_end=1 WHERE member_id=$mbrid AND members.recordstatus=1";
		        	mysqli_query($connect,$sqlend1)or die("Error in query".$sqlend1);

			$sqldel = "DELETE FROM alerttemp WHERE member_id=$mbrid AND alert_type='day' AND expired_date='$expdate'";
		        	mysqli_query($connect,$sqldel)or die("Error in query".$sqldel);
		}
	}

	$sql1 = "SELECT limit_no,limit_type FROM alert_limit WHERE description='expired' AND recordstatus=1";
	$result1 = mysqli_query($connect,$sql1)or die("Error in query".$sql1);
	if (mysqli_num_rows($result1)>0) {
		while ($a = mysqli_fetch_assoc($result1)) {
			$alertnum = $a["limit_no"];
			$alerttype = $a["limit_type"];
		}
	}

	if ($alerttype == "day") {
		$time = strtotime($stoday." +$alertnum day");
    		$alertday = date("m/d/Y", $time);
	}

	$sql1 = "SELECT alert_list.alert_description,members.member_name,members.member_register_id FROM alert_list
		INNER JOIN members ON members.member_id=alert_list.member_id
		WHERE alert_list.alert_date LIKE '$stoday' AND alert_list.recordstatus=1 AND members.recordstatus=1";
		$res1 = mysqli_query($connect,$sql1)or die("Error in query".$sql1);
		if (mysqli_num_rows($res1)<1) {
				$dailyalert = 0;		
				$dailyalertsize = 0;		
			}
		else{		
			while ($aa = mysqli_fetch_assoc($res1)) {
				$dailyalert[] = $aa;
			}
			$dailyalertsize = sizeof($dailyalert);	
		}

	$sql2 = "SELECT member_id FROM income_header 
	INNER JOIN member_type ON income_header.mbr_type_id = member_type.mbr_type_id
	WHERE member_type.mbr_type_name != 'Daily Member'
	GROUP BY member_id AND member_type.recordstatus=1 AND income_header.recordstatus=1";		
	$res5 = mysqli_query($connect,$sql2)or die("Error in query".$sql2);
	if (mysqli_num_rows($res5)<1) {
			$expiredmbr = 0;
			$expiredalert = 0;				
		}
	else{
		while ($con = mysqli_fetch_assoc($res5)) {
			$sql3 ="SELECT * FROM (SELECT income_header.*
			FROM income_header 
			INNER JOIN members ON income_header.member_id=members.member_id
			WHERE income_header.member_id={$con['member_id']}
			ORDER BY STR_TO_DATE(income_header.end_date, '%m/%d/%Y') DESC LIMIT 1) AS aa 
			WHERE STR_TO_DATE(aa.end_date, '%m/%d/%Y') BETWEEN STR_TO_DATE('$stoday', '%m/%d/%Y') 
			AND STR_TO_DATE('$alertday', '%m/%d/%Y') AND aa.mbr_end!=1 AND aa.recordstatus=1";
			
			$res3 = mysqli_query($connect,$sql3)or die("Error in query".$sql3);
			while ($cc = mysqli_fetch_assoc($res3)) {
				array_push($expiredmbr, $cc);
			}
		}

		if (sizeof($expiredmbr) != 0) {
			for ($i=0; $i < sizeof($expiredmbr); $i++) { 
				$mbrid = $expiredmbr[$i]["member_id"];
				$sql4 = "INSERT INTO alerttemp(member_id,alert_type,uptodate,expired_date) 
				VALUES($mbrid,'$alerttype',0,'{$expiredmbr[$i]["end_date"]}') ON DUPLICATE KEY UPDATE member_id=member_id";
				mysqli_query($connect,$sql4)or die("Error in query".$sql4);
			}
		}

		$sqlupdate = "UPDATE alerttemp SET uptodate=2 WHERE STR_TO_DATE(expired_date, '%m/%d/%Y')<STR_TO_DATE('$stoday', '%m/%d/%Y')";
		mysqli_query($connect,$sqlupdate)or die("Error in query".$sqlupdate);

		$sqlmenu = "SELECT (CASE uptodate WHEN 0 THEN 'outofdate' WHEN 2 THEN 'expired' ELSE '' END) as classname,			
			alerttemp.expired_date,members.member_name,alert_limit.description,alerttemp.member_id,members.member_register_id 
			FROM alerttemp
			INNER JOIN members ON alerttemp.member_id = members.member_id
			INNER JOIN alert_limit ON alerttemp.alert_type = alert_limit.limit_type
			WHERE members.recordstatus AND alert_limit.recordstatus=1";
		$resmenu = mysqli_query($connect,$sqlmenu)or die("Error in query".$sqlmenu);
		if(mysqli_num_rows($resmenu)<1){
			$expiredalert = 0;
		}
		else{
			while ($aa = mysqli_fetch_assoc($resmenu)) {
				if ($aa["description"] == "expired") {
					$expiredalert[] = $aa;
				}
			}
			$expiredalertsize = sizeof($expiredalert);	
		}
	}

	if (isset($expiredalert)) {
		$noti = intval($expiredalertsize)+intval($dailyalertsize);
		$data = array("expiredmbr"=>$expiredmbr, "expiredalert"=>$expiredalert,"dailyalert"=>$dailyalert, "expiredalertsize"=>$expiredalertsize,"dailyalertsize"=>$dailyalertsize, "noti"=>$noti);
	}
	else{
		$expiredalert = 0;		
		$noti = intval($expiredalertsize)+intval($dailyalertsize);
		$data = array("expiredmbr"=>$expiredmbr, "expiredalert"=>$expiredalert,"dailyalert"=>$dailyalert, "expiredalertsize"=>$expiredalertsize,"dailyalertsize"=>$dailyalertsize, "noti"=>$noti);
	}
	
	print json_encode($data);
 ?>