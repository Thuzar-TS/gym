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
	$tod = $stoday;
}

	if ($data) {
		$btn = $data->btn;
		if ($btn == "save") {
			$incomedes = $data->incomedes;
			$amount = $data->amount;
			$startdate = $data->startdate;
			$remark = $data->remark;
			$sql1 = "INSERT INTO income_header(income_description,average_amt,remark,edit,user_id,createddate) VALUES('$incomedes','$amount','$remark',1,1,'$stoday')";
			mysqli_query($connect,$sql1)or die("Error in query".$sql1);

			$sql2 = "SELECT MAX(income_header_id) as hid FROM income_header WHERE recordstatus=1";
			$result2 = mysqli_query($connect,$sql2)or die("Error in query".$sql2);
			if (mysqli_num_rows($result2)>0) {
				while ($a = mysqli_fetch_assoc($result2)) {
					$hid = $a["hid"];
				}
			}

			$sql3 = "INSERT INTO income_detail(income_date,income_header_id,createddate) VALUES('$startdate',$hid,'$stoday')";
			mysqli_query($connect,$sql3)or die("Error in query".$sql3);
		}
		elseif ($btn == "delete") {
			$incomehid = $data->incomehid;
			$sql1 = "UPDATE income_header SET recordstatus=2 WHERE income_header_id=$incomehid";
			mysqli_query($connect,$sql1)or die("Error in query".$sql1);

			$sql2 = "UPDATE income_detail SET recordstatus=2 WHERE income_header_id=$incomehid";
			mysqli_query($connect,$sql2)or die("Error in query".$sql2);
		}
		elseif ($btn == "edit") {
			$incomehid = $data->incomehid;
			$incomedes = $data->incomedes;
			$amount = $data->amount;
			$startdate = $data->startdate;
			$remark = $data->remark;

			$sql1 = "UPDATE income_header SET income_description='$incomedes',average_amt=$amount,remark='$remark' 
			WHERE income_header_id=$incomehid AND recordstatus=1";
			mysqli_query($connect,$sql1)or die("Error in query".$sql1);

			$sql2 = "UPDATE income_detail SET income_date='$startdate',income_header_id=$incomehid
			WHERE income_header_id=$incomehid AND recordstatus=1";
			mysqli_query($connect,$sql2)or die("Error in query".$sql2);
		}
	}

	/*for ($i=0; $i < 2000; $i++) { 
		$sqlinsert = "INSERT INTO income_detail(income_header_id) VALUES(1),(1),(1),(1),(1),(1),(1),(1),(1),
		(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),
		(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),
		(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),
		(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),(1)";
		mysqli_query($sqlinsert,$connect)or die("Error in query".$sqlinsert);
	}*/

	$sql = "SELECT income_detail.*,IFNULL(members.member_register_id,'-') as member_register_id,IFNULL(members.member_name,'-') as member_name,IFNULL(member_type.mbr_type_name,'-') as mbr_type_name,income_header.* FROM income_detail 
		INNER JOIN income_header ON income_detail.income_header_id=income_header.income_header_id
		LEFT JOIN members ON members.member_id=income_header.member_id	
		LEFT JOIN member_type ON member_type.mbr_type_id=income_header.mbr_type_id
		WHERE income_detail.recordstatus=1 AND STR_TO_DATE(income_detail.income_date, '%m/%d/%Y') 
		BETWEEN STR_TO_DATE('$fromd', '%m/%d/%Y') AND STR_TO_DATE('$tod', '%m/%d/%Y')
		ORDER BY STR_TO_DATE(income_detail.income_date, '%m/%d/%Y') DESC,income_detail.income_detail_id DESC limit 20000";
	$result = mysqli_query($connect,$sql)or die("Error in query".$sql);
	//$sql = "SELECT * FROM income_detail limit 20000";
	//$result = mysqli_query($sql,$connect)or die("Error in query".$sql);
	if (mysqli_num_rows($result)>0) {
		while ($a = mysqli_fetch_assoc($result)) {
			$inc[] = $a;
		}
	}
	else{
		$inc = "No Record";
	}

	$data = array("inc"=>$inc);
	
	print json_encode($data);
 ?>