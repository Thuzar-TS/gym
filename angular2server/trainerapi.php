<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: X-Requested-With');
header('Access-Control-Allow-Methods: PUT, POST, GET, UPDATE, DELETE, EDIT, OPTIONS');

include("connectdb.inc");
include("date.php");
$data = json_decode(file_get_contents("php://input"));

	if ($data) {
		$btn = $data->btn;

		if ($btn == "save") {
			$trainername = $data->trainername;
			$remark = $data->remark;
			$sql1 = "INSERT INTO trainers (trainer_name,remark,createddate,user_id) VALUES('$trainername','$remark','$stoday',1)";
			mysqli_query($connect,$sql1)or die("Error in query".$sql1);
		}
		elseif ($btn == "delete") {			
			$trainerid = $data->trainerid;
			$sql1 = "UPDATE trainers SET recordstatus=2 WHERE trainer_id=$trainerid";
			mysqli_query($connect,$sql1)or die("Error in query".$sql1);
		}
		elseif ($btn == "edit") {
			$trainername = $data->trainername;
			$remark = $data->remark;
			$trainerid = $data->trainerid;
			$sql1 = "UPDATE trainers SET trainer_name='$trainername',remark='$remark' WHERE trainer_id=$trainerid AND recordstatus=1";
			mysqli_query($connect,$sql1)or die("Error in query".$sql1);
		}
	}

	$sql = "SELECT * FROM trainers WHERE recordstatus=1";
	$result = mysqli_query($connect,$sql)or die("Error in query".$sql);
	if (mysqli_num_rows($result)>0) {
		while ($a = mysqli_fetch_assoc($result)) {
			$trainers[] = $a;
		}
	}
	else{
		$trainers = "No Record";
	}
	$data = array("trainers"=>$trainers);
	print json_encode($data);
 ?>