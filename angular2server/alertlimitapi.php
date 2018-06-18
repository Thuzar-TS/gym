<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: X-Requested-With');
header('Access-Control-Allow-Methods: PUT, POST, GET, UPDATE, DELETE, EDIT, OPTIONS');

include("connectdb.inc");
include("date.php");
$data = json_decode(file_get_contents("php://input"));

	if ($data) {
		$btn = $data->btn;

		if ($btn == "edit") {
			$limitid = $data->limitid;
			$limitnum = $data->limitnum;
			$sql1 = "UPDATE alert_limit SET limit_no=$limitnum,modifieddate='$stoday' WHERE alert_limit_id=$limitid AND recordstatus=1";
			mysqli_query($connect,$sql1)or die("Error in query".$sql1);
		}
	}

	$sql = "SELECT * FROM alert_limit WHERE recordstatus=1";
	$result = mysqli_query($connect,$sql)or die("Error in query".$sql);
	if (mysqli_num_rows($result)>0) {
		while ($a = mysqli_fetch_assoc($result)) {
			$alertlimit[] = $a;
		}
	}
	else{
		$alertlimit = "No Record";
	}
	$data = array("alertlimit"=>$alertlimit);
	print json_encode($data);
 ?>