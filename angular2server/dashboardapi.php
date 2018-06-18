<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: X-Requested-With');
header('Access-Control-Allow-Methods: PUT, POST, GET, UPDATE, DELETE, EDIT, OPTIONS');

include("connectdb.inc");
include("date.php");

	$sqlend = "SELECT COUNT(member_id) as endmbr FROM members WHERE mbr_end=1 AND recordstatus=1";
	$resultend = mysqli_query($connect,$sqlend)or die("Error in query".$sqlend);
	while ($a = mysqli_fetch_assoc($resultend)) {
		$endmbr = $a["endmbr"];
	}

	$sqlact = "SELECT COUNT(member_id) as activembr FROM members WHERE mbr_end=0 AND recordstatus=1";
	$resultact = mysqli_query($connect,$sqlact)or die("Error in query".$sqlact);
	while ($a = mysqli_fetch_assoc($resultact)) {
		$activembr = $a["activembr"];
	}

	$sqldaily = "SELECT income_header_id FROM income_header 
	INNER JOIN member_type ON income_header.mbr_type_id=member_type.mbr_type_id
	INNER JOIN members ON members.member_id=income_header.member_id
	WHERE members.mbr_end=0  AND members.recordstatus=1 AND member_type.mbr_type_name LIKE '%daily%' GROUP BY income_header.member_id";
	$resultdaily = mysqli_query($connect,$sqldaily)or die("Error in query".$sqldaily);
	$dailymbr = mysqli_num_rows($resultdaily);

	$sqlmonthly = "SELECT income_header_id FROM income_header 
	INNER JOIN member_type ON income_header.mbr_type_id=member_type.mbr_type_id
	INNER JOIN members ON members.member_id=income_header.member_id
	WHERE members.mbr_end=0  AND members.recordstatus=1 AND member_type.mbr_type_name LIKE '%monthly%' GROUP BY income_header.member_id";
	$resultmonthly = mysqli_query($connect,$sqlmonthly)or die("Error in query".$sqlmonthly);
	$monthlymbr = mysqli_num_rows($resultmonthly);

	$sql = "SELECT * FROM promotion WHERE recordstatus=1 AND pro_end=0 ORDER BY STR_TO_DATE(from_date, '%m/%d/%Y') DESC";
	$result = mysqli_query($connect,$sql)or die("Error in query".$sql);
	if (mysqli_num_rows($result)>0) {
		while ($a = mysqli_fetch_assoc($result)) {
			$promotion[] = $a;
		}
	}
	else{
		$promotion = "No Record";
	}

	$sql1 = "SELECT * FROM off_day 
	WHERE STR_TO_DATE(off_date, '%m/%d/%Y') BETWEEN STR_TO_DATE('$startdate', '%m/%d/%Y') AND STR_TO_DATE('$enddate', '%m/%d/%Y') 
	AND recordstatus=1 ORDER BY STR_TO_DATE(off_date, '%m/%d/%Y') DESC";
	$result1 = mysqli_query($connect,$sql1)or die("Error in query".$sql1);
	if (mysqli_num_rows($result1)>0) {
		while ($a = mysqli_fetch_assoc($result1)) {
			$offdays[] = $a;
		}
	}
	else{
		$offdays = "No Record";
	}
	
	$data = array("activembr"=>$activembr, "endmbr"=>$endmbr, "dailymbr"=>$dailymbr, "monthlymbr"=>$monthlymbr, "promotion"=>$promotion, "offday"=>$offdays);
	print json_encode($data);
 ?>