<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: X-Requested-With');
header('Access-Control-Allow-Methods: PUT, POST, GET, UPDATE, DELETE, EDIT, OPTIONS');

include("connectdb.inc");
$data = json_decode(file_get_contents("php://input"));

	if ($data) {
		$btn = $data->btn;

		if ($btn == "save") {
			$categoryname = $data->categoryname;
			$sql1 = "INSERT INTO category (category_name) VALUES('$categoryname')";
			mysqli_query($connect,$sql1)or die("Error in query".$sql1);
		}
		elseif ($btn == "delete") {
			$categoryid = $data->categoryid;
			$sql1 = "UPDATE category SET recordstatus=2 WHERE category_id=$categoryid";
			mysqli_query($connect,$sql1)or die("Error in query".$sql1);
		}
		elseif ($btn == "edit") {
			$categoryid = $data->categoryid;
			$categoryname = $data->categoryname;
			$sql1 = "UPDATE category SET category_name='$categoryname' WHERE category_id=$categoryid AND recordstatus=1";
			mysqli_query($connect,$sql1)or die("Error in query".$sql1);
		}
	}

	$sql = "SELECT * FROM category WHERE recordstatus=1";
	$result = mysqli_query($connect,$sql)or die("Error in query".$sql);
	if (mysqli_num_rows($result)>0) {
		while ($a = mysqli_fetch_assoc($result)) {
			$category[] = $a;
		}
	}
	else{
		$category = "No Record";
	}
	$data = array("category"=>$category);
	print json_encode($data);
 ?>