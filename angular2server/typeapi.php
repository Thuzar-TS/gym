<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: X-Requested-With');
header('Access-Control-Allow-Methods: PUT, POST, GET, UPDATE, DELETE, EDIT, OPTIONS');

include("connectdb.inc");
$data = json_decode(file_get_contents("php://input"));

	if ($data) {
		$btn = $data->btn;

		if ($btn == "save") {
			$typename = $data->typename;
			$sql1 = "INSERT INTO member_type (mbr_type_name) VALUES('$typename')";
			mysqli_query($connect,$sql1)or die("Error in query".$sql1);
		}
		elseif ($btn == "delete") {
			$mbr_type_id = $data->mbr_type_id;
			$sql1 = "UPDATE member_type SET recordstatus=2 WHERE mbr_type_id=$mbr_type_id";
			mysqli_query($connect,$sql1)or die("Error in query".$sql1);
		}
		elseif ($btn == "edit") {
			$mbr_type_id = $data->mbr_type_id;
			$typename = $data->typename;
			$sql1 = "UPDATE member_type SET mbr_type_name='$typename' WHERE mbr_type_id=$mbr_type_id AND recordstatus=1";
			mysqli_query($connect,$sql1)or die("Error in query".$sql1);
		}
	}

	$sql = "SELECT * FROM member_type WHERE recordstatus=1";
	$result = mysqli_query($connect,$sql)or die("Error in query".$sql);
	if (mysqli_num_rows($result)>0) {
		while ($a = mysqli_fetch_assoc($result)) {
			$types[] = $a;
		}
	}
	else{
		$types = "No Record";
	}
	$data = array("types"=>$types);
	print json_encode($data);
 ?>