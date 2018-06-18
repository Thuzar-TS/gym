<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: X-Requested-With');
header('Access-Control-Allow-Methods: PUT, POST, GET, UPDATE, DELETE, EDIT, OPTIONS');

include("connectdb.inc");
include("date.php");
$data = json_decode(file_get_contents("php://input"));
$fromd = $data->fromd;
$tod = $data->tod;

if ($fromd == "" || $fromd == null) {
	$fromd = $stoday;
}
if ($tod == "" || $tod == null) {
	$time = strtotime($d.' +1 month');
    	$tod = date("m/d/Y", $time);
}
if($_GET["mbrid"]) {
	$mbrid = $_GET["mbrid"];

	if ($data) {
		$btn = $data->btn;

		if ($btn == "save") {
			$week = $data->week;
			$days = $data->days;
			$training = $data->training;
			$trainer = $data->trainer;
			$weight = $data->weight;
			//$height = $data->height;
			//echo htmlspecialchars($height);
			//echo htmlentities($height);
			$height = mysqli_real_escape_string($data->height);
			$actiondate = $data->actiondate;
			$chest = mysqli_real_escape_string($data->chest);
			$arm = mysqli_real_escape_string($data->arm);
			$waist = mysqli_real_escape_string($data->waist);
			$thigh = mysqli_real_escape_string($data->thigh);
			$glute = mysqli_real_escape_string($data->glute);
			$calf = mysqli_real_escape_string($data->calf);
			$org_name = $data->org_name;
			$gen_name = $data->gen_name;
			$sql1 = "INSERT INTO daily_action (action_date,week,days,training_id,trainer_id,weight,height,chest,arm,
				waist,thigh,glute,calf,member_id,user_id,createddate,org_name,gen_name) 
				VALUES('$actiondate', '$week', '$days', $training, $trainer, '$weight', '$height', '$chest', '$arm',
				'$waist', '$thigh', '$glute', '$calf', $mbrid, 1, '$stoday','$org_name','$gen_name')";
			mysqli_query($connect,$sql1)or die("Error in query".$sql1);
		}
		elseif ($btn == "delete") {
			$dailyaction_id = $data->dailyaction_id;
			$sql1 = "UPDATE daily_action SET recordstatus=2 WHERE daily_action_id=$dailyaction_id";
			mysqli_query($connect,$sql1)or die("Error in query".$sql1);
		}
		elseif ($btn == "edit") {
			$dailyaction_id = $data->dailyaction_id;
			$week = $data->week;
			$days = $data->days;
			$training = $data->training;
			$trainer = $data->trainer;
			$weight = $data->weight;
			$height = mysqli_real_escape_string($data->height);
			$actiondate = $data->actiondate;
			$chest = mysqli_real_escape_string($data->chest);
			$arm = mysqli_real_escape_string($data->arm);
			$waist = mysqli_real_escape_string($data->waist);
			$thigh = mysqli_real_escape_string($data->thigh);
			$glute = mysqli_real_escape_string($data->glute);
			$calf = mysqli_real_escape_string($data->calf);
			$org_name = $data->org_name;
			$gen_name = $data->gen_name;
			$sql1 = "UPDATE daily_action SET week='$week',days='$days',training_id=$training,trainer_id=$trainer,
			weight='$weight',height='$height',action_date='$actiondate',chest='$chest',arm='$arm',waist='$waist',thigh='$thigh',
			glute='$glute',calf='$calf',org_name='$org_name',gen_name='$gen_name' WHERE daily_action_id=$dailyaction_id AND member_id=$mbrid AND recordstatus=1";
			mysqli_query($connect,$sql1)or die("Error in query".$sql1);
		}
		elseif ($btn == "photodelete") {
			$photo = $data->photo;
		            $did = $data->did;
		            $deletephoto = $data->deletephoto;

			$sql1 = "UPDATE daily_action SET gen_name='$photo' WHERE daily_action_id=$did";
			mysqli_query($connect,$sql1)or die("Error in query".$sql1);

            $delfile = "upload/".$deletephoto;
            unlink($delfile);
		}
	}

	$sql = "SELECT daily_action.*,training.training_description,trainers.trainer_name FROM daily_action 
	LEFT JOIN training ON training.training_id=daily_action.training_id
	LEFT JOIN trainers ON trainers.trainer_id=daily_action.trainer_id
	WHERE daily_action.member_id=$mbrid AND daily_action.recordstatus=1 
	AND STR_TO_DATE(daily_action.action_date, '%m/%d/%Y') 
	BETWEEN STR_TO_DATE('$fromd', '%m/%d/%Y') AND STR_TO_DATE('$tod', '%m/%d/%Y')
	ORDER BY STR_TO_DATE(daily_action.action_date, '%m/%d/%Y') DESC, daily_action_id DESC";
	$result = mysqli_query($connect,$sql)or die("Error in query".$sql);
	if (mysqli_num_rows($result)>0) {
		while ($a = mysqli_fetch_assoc($result)) {
			$actions[] = $a;
		}
	}
	else{
		$actions = "No Record";
	}

	$sql1 = "SELECT * FROM members WHERE member_id=$mbrid AND recordstatus=1";
	$result1 = mysqli_query($connect,$sql1)or die("Error in query".$sql1);
	if (mysqli_num_rows($result1)>0) {
		while ($a1 = mysqli_fetch_assoc($result1)) {
			$memberinfo[] = $a1;
		}
	}
	else{
		$memberinfo = "No Record";
	}

	$sql2 = "SELECT * FROM training WHERE recordstatus=1";
	$result2 = mysqli_query($connect,$sql2)or die("Error in query".$sql2);
	if (mysqli_num_rows($result2)>0) {
		while ($a2 = mysqli_fetch_assoc($result2)) {
			$trainingdata[] = $a2;
		}
	}
	else{
		$trainingdata = "No Record";
	}

	$sql3 = "SELECT * FROM trainers WHERE recordstatus=1";
	$result3 = mysqli_query($connect,$sql3)or die("Error in query".$sql3);
	if (mysqli_num_rows($result3)>0) {
		while ($a3 = mysqli_fetch_assoc($result3)) {
			$trainers[] = $a3;
		}
	}
	else{
		$trainers = "No Record";
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

	$data = array("actions"=>$actions, "training"=>$trainingdata, "trainers"=>$trainers, "memberinfo"=>$memberinfo, "dailyalert"=>$dailyalert);
	print json_encode($data);
}	
 ?>