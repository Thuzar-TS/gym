<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: X-Requested-With');
header('Access-Control-Allow-Methods: PUT, POST, GET, UPDATE, DELETE, EDIT, OPTIONS');

include("connectdb.inc");
$data = json_decode(file_get_contents("php://input"));

	if ($data) {
		$loginid = $data->loginid;
		$pass = $data->pass;
		$pa = md5($pass);
		$sql = "SELECT * FROM user WHERE login_id='$loginid' AND password='$pa' AND recordstatus=1";
		$result = mysqli_query($connect,$sql)or die("Error in query".$sql);
		if (mysqli_num_rows($result)>0) {
			while ($a = mysqli_fetch_assoc($result)) {
				$users[] = $a;
			}
		}
		else{
			$users = "No Record";
		}
		$data = array("users"=>$users);
		print json_encode($data);
	}
	else{
		echo "Error";
	}
 ?>