<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: X-Requested-With');
header('Access-Control-Allow-Methods: PUT, POST, GET, UPDATE, DELETE, EDIT, OPTIONS');

include("connectdb.inc");
include("date.php");
$data = json_decode(file_get_contents("php://input"));

if($_GET["mbrid"]) {
	$mbrid = $_GET["mbrid"];

	if ($data) {
		$btn = $data->btn;

		if ($btn == "save") {
			$alertdate = $data->alertdate;
			$des = mysqli_real_escape_string($data->des);
			
			$sql1 = "INSERT INTO alert_list (alert_date,alert_description,action_date,member_id,user_id,createddate) 
				VALUES('$alertdate', '$des', '$stoday', $mbrid, 1, '$stoday')";
			mysqli_query($connect,$sql1)or die("Error in query".$sql1);
		}
		elseif ($btn == "delete") {
			$alert_list_id = $data->alert_list_id;

			$sql1 = "UPDATE alert_list SET recordstatus=2 WHERE alert_list_id=$alert_list_id";
			mysqli_query($connect,$sql1)or die("Error in query".$sql1);
		}
		elseif ($btn == "edit") {
			$alert_list_id = $data->alert_list_id;
			$alertdate = $data->alertdate;
			$des = mysqli_real_escape_string($data->des);

			$sql1 = "UPDATE alert_list SET alert_date='$alertdate',alert_description='$des' WHERE alert_list_id=$alert_list_id AND member_id=$mbrid AND recordstatus=1";
			mysqli_query($connect,$sql1)or die("Error in query".$sql1);
		}
	}	

	$sql4 = "SELECT alert_list_id,alert_date,alert_description FROM alert_list WHERE member_id=$mbrid AND recordstatus=1";
	$result4 = mysqli_query($connect,$sql4)or die("Error in query".$sql4);
	if (mysqli_num_rows($result4)>0) {
		while ($a4 = mysqli_fetch_assoc($result4)) {
			$dailyalert[] = $a4;
		}
	}
	else{
		$dailyalert = "No Record";
	}

	$data = array("dailyalert"=>$dailyalert);
	print json_encode($data);
}	
 ?>