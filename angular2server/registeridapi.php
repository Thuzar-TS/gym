<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: X-Requested-With');
header('Access-Control-Allow-Methods: PUT, POST, GET, UPDATE, DELETE, EDIT, OPTIONS');

include("connectdb.inc");
$data = json_decode(file_get_contents("php://input"));

	if ($data) {
		$btn = $data->btn;

		if ($btn == "edit") {
			$prefix = $data->prefix;
			$num = $data->num;
			$sql1 = "UPDATE register_id SET prefix='$prefix',num=$num";
			mysqli_query($connect,$sql1)or die("Error in query".$sql1);
		}
	}

	$sql = "SELECT * FROM register_id";
	$result = mysqli_query($connect,$sql)or die("Error in query".$sql);
	if (mysqli_num_rows($result)>0) {
		while ($a = mysqli_fetch_assoc($result)) {
			$aaa[] = $a;
		}
	}
	else{
		$aaa = "No Record";
	}

	$sql1 = "SELECT COUNT(member_id) as mbr FROM members WHERE recordstatus=1";
	$result1 = mysqli_query($connect,$sql1)or die("Error in query".$sql1);
	if (mysqli_num_rows($result1)>0) {
		while ($a = mysqli_fetch_assoc($result1)) {
			$aa = $a["mbr"];
		}
	}

	$data = array("aaa"=>$aaa,"count"=>$aa);
	print json_encode($data);
 ?>