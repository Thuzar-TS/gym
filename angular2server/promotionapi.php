<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: X-Requested-With');
header('Access-Control-Allow-Methods: PUT, POST, GET, UPDATE, DELETE, EDIT, OPTIONS');

include("connectdb.inc");
include("date.php");
$data = json_decode(file_get_contents("php://input"));
$can = "";
	if ($data) {
		$btn = $data->btn;

		if ($btn == "save") {
			$proname = $data->proname;
			$protype = $data->protype;
			$fromdate = $data->fromdate;
			$todate = $data->todate;
			$prodes = $data->prodes;
			$remark = $data->remark;
			if ($protype == "day") {
				$num = $data->num;
			}
			elseif($protype == "amount") {
				if($data->numper == 0){
					$num = $data->numamt;
					$num = $num.",amt";	
				}
				elseif($data->numamt == 0) {
					$num = $data->numper;
					$num = $num.",per";
				}
			}
			elseif ($protype == "member") {
				$regmbr = $data->regmbr;
				$freembr = $data->freembr;

				$num = $regmbr.",".$freembr;
			}

			$sql1 = "INSERT INTO promotion (pro_type,pro_num,from_date,to_date,pro_description,pro_name,remark,user_id,createddate) 
			VALUES('$protype','$num','$fromdate','$todate','$prodes','$proname','$remark',1,'$stoday')";
			mysqli_query($connect,$sql1)or die("Error in query".$sql1);
		}
		elseif ($btn == "delete") {
			$proid = $data->proid;
			$sql = "SELECT income_header_id FROM income_header WHERE type_pro_id = $proid AND recordstatus=1";
			$res = mysqli_query($connect,$sql)or die("Error in query".$sql);
			if (mysqli_num_rows($res)>0) {
				$can = "cannot";
			}
			else{
				$sql1 = "UPDATE promotion SET recordstatus=2 WHERE promotion_id=$proid";
				mysqli_query($connect,$sql1)or die("Error in query".$sql1);
				$can = "can";
			}			
		}
		elseif ($btn == "edit") {
			$proid = $data->proid;
			$proname = $data->proname;
			$protype = $data->protype;
			$fromdate = $data->fromdate;
			$todate = $data->todate;
			$prodes = $data->prodes;
			$remark = $data->remark;
			if ($protype == "day") {
				$num = $data->num;
			}
			elseif($protype == "amount") {
				if($data->numper == 0){
					$num = $data->numamt;
					$num = $num.",amt";	
				}
				elseif($data->numamt == 0) {
					$num = $data->numper;
					$num = $num.",per";
				}
			}
			elseif ($protype == "member") {
				$regmbr = $data->regmbr;
				$freembr = $data->freembr;

				$num = $regmbr.",".$freembr;
			}

			$sql1 = "UPDATE promotion SET pro_name='$proname',pro_type='$protype',from_date='$fromdate',to_date='$todate',
			pro_num='$num',pro_description='$prodes',remark='$remark',user_id=1,modifieddate='$stoday' 
			WHERE promotion_id=$proid AND recordstatus=1";
			mysqli_query($connect,$sql1)or die("Error in query".$sql1);
		}
		elseif ($btn == "searchdate") {
			//$name = $data->name;
			//$protype = $data->protype;
			$date = $data->date;
			if ($date == "all") {
				$sql = "SELECT * FROM promotion WHERE recordstatus=1 ORDER BY STR_TO_DATE(from_date, '%m/%d/%Y') DESC";
			}
			else{
				$sql = "SELECT * FROM promotion WHERE recordstatus=1 AND
				STR_TO_DATE(from_date, '%m/%d/%Y')<=STR_TO_DATE('".$date."', '%m/%d/%Y') 
				AND STR_TO_DATE(to_date, '%m/%d/%Y')>=STR_TO_DATE('".$date."', '%m/%d/%Y')
				ORDER BY STR_TO_DATE(from_date, '%m/%d/%Y') DESC";
			}
			
			$result = mysqli_query($connect,$sql)or die("Error in query".$sql);
			if (mysqli_num_rows($result)>0) {
				while ($a = mysqli_fetch_assoc($result)) {
					$promotion[] = $a;
				}
			}
			else{
				$promotion = "No Record";
			}

			$data = array("promotion"=>$promotion);
			print json_encode($data);
			exit();
		}
	}

	$sql2 = "UPDATE promotion SET pro_end=1 WHERE STR_TO_DATE(to_date, '%m/%d/%Y')<STR_TO_DATE('".$stoday."', '%m/%d/%Y') AND recordstatus=1";
	mysqli_query($connect,$sql2)or die("Error in query".$sql2);

	$sql = "SELECT * FROM promotion WHERE recordstatus=1 ORDER BY STR_TO_DATE(from_date, '%m/%d/%Y') DESC";
	$result = mysqli_query($connect,$sql)or die("Error in query".$sql);
	if (mysqli_num_rows($result)>0) {
		while ($a = mysqli_fetch_assoc($result)) {
			$promotion[] = $a;
		}
	}
	else{
		$promotion = "No Record";
	}

	$data = array("promotion"=>$promotion, "can"=>$can);
	print json_encode($data);
 ?>