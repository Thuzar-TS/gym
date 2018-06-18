<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: X-Requested-With');
header('Access-Control-Allow-Methods: PUT, POST, GET, UPDATE, DELETE, EDIT, OPTIONS');

include("connectdb.inc");
include("date.php");
$data = json_decode(file_get_contents("php://input"));
$dupli = "";
$fromd = $data->fromd;
$tod = $data->tod;

if ($fromd == "" || $fromd == null) {
	$fromd = $stoday;
}
if ($tod == "" || $tod == null) {
	$tod = $stoday;
}

$btn = $data->btn;
	if ($btn == "reg") {
		$sqlexcel = "SELECT income_header.income_header_id,income_header.start_date,income_header.end_date,
		income_header.register_date, income_header.income_description, income_header.num_days, income_header.total_amt,
		income_header.voucher, income_header.mbr_end, members.member_register_id, members.member_name, 
		members.register_date as setup_date, members.dob, 
		(CASE WHEN members.gender='1' THEN 'Male' ELSE 'Female' END) as gender, members.phone,
		member_type.mbr_type_name, 
		IFNULL(promotion.pro_description,'-') as pro_description, promotion.pro_name 
		FROM income_header 
		INNER JOIN members ON members.member_id = income_header.member_id
		INNER JOIN member_type ON member_type.mbr_type_id = income_header.mbr_type_id
		LEFT JOIN promotion ON promotion.promotion_id = income_header.type_pro_id
		WHERE income_header.recordstatus=1 AND members.recordstatus = 1 AND member_type.recordstatus=1
		AND STR_TO_DATE(income_header.register_date, '%m/%d/%Y') 
		BETWEEN STR_TO_DATE('$fromd', '%m/%d/%Y') AND STR_TO_DATE('$tod', '%m/%d/%Y')
		ORDER BY STR_TO_DATE(members.register_date, '%m/%d/%Y') DESC";
	
		$result = mysqli_query($connect,$sqlexcel)or die("Error in query".$sqlexcel);
		if (mysqli_num_rows($result)>0) {
			while ($a = mysqli_fetch_assoc($result)) {
				$excel[] = $a;
			}
		}
		else{
			$excel = "No Record";
		}
	}
	elseif ($btn == "daily") {
		$sqldaily = "SELECT IFNULL(alert_list.alert_description,'-') as alert_description,daily_action.*,training.training_description,trainers.trainer_name FROM daily_action 
		LEFT JOIN training ON training.training_id=daily_action.training_id
		LEFT JOIN trainers ON trainers.trainer_id=daily_action.trainer_id
		LEFT JOIN alert_list ON alert_list.alert_date = daily_action.action_date AND alert_list.member_id=daily_action.member_id
		WHERE daily_action.recordstatus=1 
		AND STR_TO_DATE(daily_action.action_date, '%m/%d/%Y') 
		BETWEEN STR_TO_DATE('$fromd', '%m/%d/%Y') AND STR_TO_DATE('$tod', '%m/%d/%Y')
		ORDER BY STR_TO_DATE(daily_action.action_date, '%m/%d/%Y') DESC, daily_action_id DESC";

		$resultdaily = mysqli_query($connect,$sqldaily)or die("Error in query".$sqldaily);
		if (mysqli_num_rows($resultdaily)>0) {
			while ($a = mysqli_fetch_assoc($resultdaily)) {
				$excel[] = $a;
			}
		}
		else{
			$excel = "No Record";
		}
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
	
	$data = array("excel"=>$excel, "trainers"=>$trainers);

	print json_encode($data);
 ?>