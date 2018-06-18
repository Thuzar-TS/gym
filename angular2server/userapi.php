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
			$username = $data->username;
			$login_id = $data->login_id;
			$pass = $data->pass;
			$pa = md5($pass);
			$sql1 = "INSERT INTO user(user_name,login_id,password,role_id,createddate) VALUES('$username','$login_id','$pa',1,'$stoday')";
			mysqli_query($connect,$sql1)or die("Error in query".$sql1);
		}
		elseif ($btn == "delete") {
			$user_id = $data->user_id;
			$sql1 = "UPDATE user SET recordstatus=2 WHERE user_id=$user_id";
			mysqli_query($connect,$sql1)or die("Error in query".$sql1);
		}
		elseif ($btn == "edit") {
			$user_id = $data->user_id;
			$username = $data->username;
			$login_id = $data->login_id;
			$pass = $data->pass;
			$pa = md5($pass);
			$sql1 = "UPDATE user SET user_name='$username',login_id='$login_id',password='$pa' WHERE user_id=$user_id AND recordstatus=1";
			mysqli_query($connect,$sql1)or die("Error in query".$sql1);
		}
	}

	$sql = "SELECT * FROM user WHERE recordstatus=1 ORDER BY STR_TO_DATE(createddate, '%m/%d/%Y') DESC";
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
 ?>