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
			$trainingname = $data->trainingname;
			$remark = $data->remark;
			$sql1 = "INSERT INTO training (training_description,remark,createddate,user_id) VALUES('$trainingname','$remark','$stoday',1)";
			mysqli_query($connect,$sql1)or die("Error in query".$sql1);
		}
		elseif ($btn == "delete") {
			$trainingid = $data->trainingid;
			$sql1 = "UPDATE training SET recordstatus=2 WHERE training_id=$trainingid";
			mysqli_query($connect,$sql1)or die("Error in query".$sql1);
		}
		elseif ($btn == "edit") {
			$trainingname = $data->trainingname;
			$remark = $data->remark;
			$trainingid = $data->trainingid;
			$sql1 = "UPDATE training SET training_description='$trainingname',remark='$remark' WHERE training_id=$trainingid AND recordstatus=1";
			mysqli_query($connect,$sql1)or die("Error in query".$sql1);
		}
	}

	$sql = "SELECT * FROM training WHERE recordstatus=1";
	$result = mysqli_query($connect,$sql)or die("Error in query".$sql);
	if (mysqli_num_rows($result)>0) {
		while ($a = mysqli_fetch_assoc($result)) {
			$training[] = $a;
		}
	}
	else{
		$training = "No Record";
	}	
	$data = array("training"=>$training);
	print json_encode($data);
 ?>