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
	$tod = $stoday;
}

	if ($data) {
		$btn = $data->btn;

		if ($btn == "save") {
			$expdescription = $data->expdescription;
			$amount = $data->amount;
			$expdate = $data->expdate;
			$category_id = $data->category_id;
			$remark = $data->remark;
			$sql1 = "INSERT INTO expense(exp_description,amount,exp_date,category_id,remark,user_id,createddate) VALUES('$expdescription','$amount','$expdate',$category_id,'$remark',1,'$stoday')";
			mysqli_query($connect,$sql1)or die("Error in query".$sql1);
		}
		elseif ($btn == "delete") {
			$exp_id = $data->expense_id;
			$sql1 = "UPDATE expense SET recordstatus=2 WHERE expense_id=$exp_id";
			mysqli_query($connect,$sql1)or die("Error in query".$sql1);
		}
		elseif ($btn == "edit") {
			$exp_id = $data->expense_id;
			$expdescription = $data->expdescription;
			$amount = $data->amount;
			$expdate = $data->expdate;
			$category_id = $data->category_id;
			$remark = $data->remark;
			$sql1 = "UPDATE expense SET exp_description='$expdescription',amount='$amount',exp_date='$expdate',remark='$remark',category_id=$category_id WHERE expense_id=$exp_id AND recordstatus=1";
			mysqli_query($connect,$sql1)or die("Error in query".$sql1);
		}
	}

	$sql = "SELECT expense.*,category.category_name,category.category_id FROM expense 
	INNER JOIN category ON expense.category_id=category.category_id
	WHERE expense.recordstatus=1 AND STR_TO_DATE(expense.exp_date, '%m/%d/%Y') 
	BETWEEN STR_TO_DATE('$fromd', '%m/%d/%Y') AND STR_TO_DATE('$tod', '%m/%d/%Y')
	ORDER BY STR_TO_DATE(expense.exp_date, '%m/%d/%Y') DESC";
	$result = mysqli_query($connect,$sql)or die("Error in query".$sql);
	if (mysqli_num_rows($result)>0) {
		while ($a = mysqli_fetch_assoc($result)) {
			$adminexp[] = $a;
		}
	}
	else{
		$adminexp = "No Record";
	}

	$sql = "SELECT * FROM income_detail
	INNER JOIN income_header ON income_header.income_header_id = income_detail.income_header_id
	WHERE income_header.recordstatus=1 AND STR_TO_DATE(income_detail.income_date, '%m/%d/%Y') 
	BETWEEN STR_TO_DATE('$fromd', '%m/%d/%Y') AND STR_TO_DATE('$tod', '%m/%d/%Y')
	ORDER BY STR_TO_DATE(income_detail.income_date, '%m/%d/%Y') DESC";
	$result = mysqli_query($connect,$sql)or die("Error in query".$sql);
	if (mysqli_num_rows($result)>0) {
		while ($a = mysqli_fetch_assoc($result)) {
			$adminincome[] = $a;
		}
	}
	else{
		$adminincome = "No Record";
	}

	$sql = "SELECT * FROM category WHERE recordstatus=1";
	$result = mysqli_query($connect,$sql)or die("Error in query".$sql);
	if (mysqli_num_rows($result)>0) {
		while ($a = mysqli_fetch_assoc($result)) {
			$cate[] = $a;
		}
	}
	else{
		$cate = "No Record";
	}

	$data = array("adminexp"=>$adminexp, "adminincome"=>$adminincome, "cate"=>$cate);
	print json_encode($data);
 ?>