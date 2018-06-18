<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: X-Requested-With');
header('Access-Control-Allow-Methods: PUT, POST, GET, UPDATE, DELETE, EDIT, OPTIONS');

include("connectdb.inc");
$data = json_decode(file_get_contents("php://input"));
if($_GET["mbrid"]) {
	$mbrid = $_GET["mbrid"];
	$sql = "SELECT * FROM members WHERE member_id=$mbrid AND recordstatus=1";
	$result = mysqli_query($connect,$sql)or die("Error in query".$sql);
	if (mysqli_num_rows($result)>0) {
		while ($a = mysqli_fetch_assoc($result)) {
			$memberdata[] = $a;
		}
	}
	else{
		$memberdata = "No Record";
	}
	$data = array("memberdata"=>$memberdata);
	print json_encode($data);
}	
 ?>