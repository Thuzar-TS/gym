<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: X-Requested-With');
header('Access-Control-Allow-Methods: PUT, POST, GET, UPDATE, DELETE, EDIT, OPTIONS');

include("connectdb.inc");
include("date.php");
$data = json_decode(file_get_contents("php://input"));
$dupli = "";
	if ($data) {
		$btn = $data->btn;

		if ($btn == "save") {
			$membername = $data->membername;
			$reg_date = $data->reg_date;
			$dob = $data->dob;
			$gender = $data->gender;
			$phone = $data->phone;
			$work = $data->work;
			$address = $data->address;

			//$height = mysqli_real_escape_string($data->height);
			//$height = htmlspecialchars($height);
			/*$myString = 'She said: "I don\'t know."';
			printf('<input type="text" name="myInput" value="%s" />'
			       , htmlspecialchars($myString));*/

			$target = $data->target;
			$recgym = $data->recgym;
			$measure = $data->measure;
			$injury = $data->injury;
			$remark = $data->remark;

			$sql7 = "SELECT prefix,num FROM register_id";
			$result7 = mysqli_query($connect,$sql7)or die("Error in query".$sql7);
			if (mysqli_num_rows($result7)>0) {
				while ($aa = mysqli_fetch_assoc($result7)) {
					$prefix = $aa["prefix"];
					$nn = intval($aa["num"]);
				}
				$prefix = $prefix;
			}

			$sql8 = "SELECT MAX(member_id) AS mbrid FROM members WHERE recordstatus=1";
			$result8 = mysqli_query($connect,$sql8)or die("Error in query".$sql8);
			if (mysqli_num_rows($result8)>0) {
				while ($a = mysqli_fetch_assoc($result8)) {
					$max = $a["mbrid"];
				}
				$max++;
			}
			else{
				$max = 1;
			}

			//CONCAT('B',LPAD( mledger_id, 6, '0'))
			$sql1 = "INSERT INTO members(target,recent_gym,member_register_id,member_name,register_date,dob,
				gender,phone,work,address,injury,remark,measure,user_id,createddate) 
				VALUES('$target','$recgym',CONCAT('$prefix',LPAD( $max, $nn, '0')),'$membername','$reg_date','$dob',
					'$gender','$phone','$work','$address','$injury','$remark','$measure',1,'$stoday')";
				mysqli_query($connect,$sql1)or die("Error in query".$sql1);
		}
		elseif ($btn == "delete") {
			$memberid = $data->memberid;
			$sql1 = "UPDATE members SET recordstatus=2 WHERE member_id=$memberid";
			mysqli_query($connect,$sql1)or die("Error in query".$sql1);
		}
		elseif ($btn == "edit") {
			$memberid = $data->memberid;
			$membername = $data->membername;
			$reg_date = $data->reg_date;
			$dob = $data->dob;
			$gender = $data->gender;
			$phone = $data->phone;
			$work = $data->work;
			$address = $data->address;
			$target = $data->target;
			$recgym = $data->recgym;
			$measure = $data->measure;
			$injury = $data->injury;
			$remark = $data->remark;

			$sql1 = "UPDATE members SET target='$target',recent_gym='$recgym',
			member_name='$membername',register_date='$reg_date',dob='$dob',gender='$gender',phone='$phone',
			user_id=1,modifieddate='$stoday',work='$work', measure='$measure', address='$address', injury='$injury', remark='$remark' 
			WHERE member_id=$memberid  AND recordstatus=1";
			mysqli_query($connect,$sql1)or die("Error in query".$sql1);
		}
		elseif ($btn == "register") {
			$nummbr = 1;
			$startdate = $data->startdate;
			$regdate = $data->regdate;
			$enddate = $data->enddate;
			$des = $data->des;
			$membertype = $data->membertype;
			$promotion = $data->promotion;
			$promotion = intval($promotion);			

			$mbrid = $data->mbrid;
			$totalamt = $data->totalamt;
			$remark = $data->remark;	
			$voucher = $data->voucher;

			$sql6 = "SELECT income_detail_id FROM income_detail 
			INNER JOIN income_header ON income_detail.income_header_id=income_header.income_header_id
			WHERE income_detail.income_date='$startdate' AND income_header.member_id=$mbrid AND income_header.recordstatus=1";
			$result6 = mysqli_query($connect,$sql6)or die("Error in query".$sql6);
			if (mysqli_num_rows($result6)<1) {
				$numdays = (strtotime($enddate)-strtotime($startdate))/(24*60*60);	

				$sql1 = "SELECT * FROM promotion WHERE promotion_id=$promotion AND recordstatus=1";
				$result1 = mysqli_query($connect,$sql1)or die("Error in query".$sql1);
				if (mysqli_num_rows($result1)>0) {
					while ($a = mysqli_fetch_assoc($result1)) {
						$promo[] = $a;
					}

					if($promo[0]["pro_type"] == "day") {
						$numdays += intval($promo[0]["pro_num"]);
					}
					elseif($promo[0]["pro_type"] == "amount") {
						$arr = explode(",",$promo[0]["pro_num"]);
						if($arr[1] == "per") {
							$totalper = $totalamt*(intval($arr[0])/100);
							$totalamt -= $totalper;
						}
						elseif($arr[1] == "amt") {
							$totalamt -= intval($arr[0]);
						}
					}
					elseif($promo[0]["pro_type"] == "member") {
						$arr = explode(",",$promo[0]["pro_num"]);
						$nummbr = intval($arr[0])+intval($arr[1]);
					}
				}
				
				if($numdays == 0){
					$avgamt = $totalamt/$nummbr;
				}
				else{
					$avgamt = $totalamt/$nummbr;
					$avgamt = $avgamt/$numdays;
				}						

				$sql3 = "INSERT INTO income_header(member_id,start_date,end_date,register_date,income_description,
				num_days,average_amt,total_amt,voucher,mbr_type_id,type_pro_id,remark,user_id,createddate)
				VALUES($mbrid,'$startdate','$enddate','$regdate','$des',$numdays,$avgamt,$totalamt,'$voucher',$membertype,$promotion,'$remark',1,'$stoday')";
				mysqli_query($connect,$sql3)or die("Error in query".$sql3);

				$sqldel = "DELETE FROM alerttemp WHERE member_id=$mbrid AND alert_type='day' AND STR_TO_DATE(expired_date, '%m/%d/%Y')<STR_TO_DATE('$enddate', '%m/%d/%Y')";
		        		mysqli_query($connect,$sqldel)or die("Error in query".$sqldel);

		        		$sqlend = "UPDATE members SET mbr_end=0 WHERE member_id=$mbrid AND members.recordstatus=1";
		        		mysqli_query($connect,$sqlend)or die("Error in query".$sqlend);

				$sql4 = "SELECT MAX(income_header_id) as hid,mbr_type_id,num_days,total_amt FROM income_header WHERE recordstatus=1";
				$result4 = mysqli_query($connect,$sql4)or die("Error in query".$sql4);
				while ($a = mysqli_fetch_assoc($result4)) {
					$incomeheaderid = $a["hid"];
				}
				
				$sql1 = "SELECT off_date FROM off_day WHERE recordstatus=1";
				$result1 = mysqli_query($connect,$sql1)or die("Error in query".$sql1);
				if (mysqli_num_rows($result1)>0) {
					while ($a = mysqli_fetch_assoc($result1)) {
						$offdays[] = $a["off_date"];
					}
				}
				else{
					$offdays = 0;
				}

				if($offdays != 0){
					$numday = 0;
					for($i=0; $i<=$numdays; $i++){
					$time = strtotime($startdate."+$i day");
	    				$applyday = date("m/d/Y", $time);
						if(!in_array($applyday,$offdays)){
							$sql2 = "INSERT INTO income_detail(income_header_id,income_date,createddate) 
							VALUES($incomeheaderid,'$applyday','$stoday')";
							mysqli_query($connect,$sql2)or die("Error in query".$sql2);

							$sql4 = "UPDATE income_header SET end_date='$applyday' WHERE income_header_id=$incomeheaderid";
							mysqli_query($connect,$sql4)or die("Error in query".$sql4);
							$numday++;
						}						
					}

					if ($membertype == 1) {
						$numdays++;
						$reqday = $numdays - $numday;
						if ($reqday > 0) {
							for($i=1; $i<=$reqday; $i++){
								$time = strtotime($applyday."+$i day");
	    							$appd = date("m/d/Y", $time);
	    							if(!in_array($appd,$offdays)){
	    								$sql2 = "INSERT INTO income_detail(income_header_id,income_date,createddate) 
									VALUES($incomeheaderid,'$appd','$stoday')";
									mysqli_query($connect,$sql2)or die("Error in query".$sql2);

									$sql4 = "UPDATE income_header SET end_date='$appd' WHERE income_header_id=$incomeheaderid";
									mysqli_query($connect,$sql4)or die("Error in query".$sql4);
									$numday++;
	    							}
							}
						}
					}

					if($numday != 0){
						if ($membertype == 1) {
							$avgamt = $totalamt/$numday;
							$sql5 = "UPDATE income_header SET num_days=$numday,average_amt=$avgamt WHERE income_header_id=$incomeheaderid";
							mysqli_query($connect,$sql5)or die("Error in query".$sql5);
						}
						else{
							$avgamt = $totalamt/$nummbr;
							$avgamt = $avgamt/$numday;
							$sql5 = "UPDATE income_header SET num_days=$numday,average_amt=$avgamt WHERE income_header_id=$incomeheaderid";
							mysqli_query($connect,$sql5)or die("Error in query".$sql5);
						}
						
					}				
				}
				else{
					$numday = 0;
					for($i=0; $i<=$numdays; $i++){
					$time = strtotime($startdate."+$i day");
	    				$applyday = date("m/d/Y", $time);
						$sql2 = "INSERT INTO income_detail(income_header_id,income_date,createddate) 
						VALUES($incomeheaderid,'$applyday','$stoday')";
						mysqli_query($connect,$sql2)or die("Error in query".$sql2);
						$numday++;
					}
					if($numday != 0){
						$avgamt = $totalamt/$nummbr;
						$avgamt = $avgamt/$numday;
						$sql5 = "UPDATE income_header SET num_days=$numday,average_amt=$avgamt WHERE income_header_id=$incomeheaderid";
						mysqli_query($connect,$sql5)or die("Error in query".$sql5);
					}
				}

				if($promotion != 0) {
					if($promo[0]["pro_type"] == "member") {
						foreach ($data->mbrlist as $rows) {
							$mbrid = mysqli_real_escape_string($rows->member_id);

							$sql3 = "INSERT INTO income_header(member_id,start_date,end_date,register_date,income_description,
							num_days,average_amt,total_amt,voucher,mbr_type_id,type_pro_id,remark,user_id,createddate)
							VALUES($mbrid,'$startdate','$enddate','$regdate','$des',$numdays,$avgamt,$totalamt,'$voucher',$membertype,$promotion,'$remark',1,'$stoday')";
							mysqli_query($connect,$sql3)or die("Error in query".$sql3);

							$sql4 = "SELECT MAX(income_header_id) as hid FROM income_header WHERE recordstatus=1";
							$result4 = mysqli_query($connect,$sql4)or die("Error in query".$sql4);
							while ($a = mysqli_fetch_assoc($result4)) {
								$incomeheaderid = $a["hid"];
							}

							$sqldel = "DELETE FROM alerttemp WHERE member_id=$mbrid AND alert_type='day' AND STR_TO_DATE(expired_date, '%m/%d/%Y')<STR_TO_DATE('$enddate', '%m/%d/%Y')";
		        					mysqli_query($connect,$sqldel)or die("Error in query".$sqldel);

		        					$sqlend = "UPDATE members SET mbr_end=0 WHERE member_id=$mbrid AND members.recordstatus=1";
		        					mysqli_query($connect,$sqlend)or die("Error in query".$sqlend);

							if($offdays != 0){
								$numday = 0;
								for($i=0; $i<=$numdays; $i++){
									$time = strtotime($startdate."+$i day");
									$applyday = date("m/d/Y", $time);
									if(!in_array($applyday,$offdays)){
										$sql2 = "INSERT INTO income_detail(income_header_id,income_date,createddate) 
										VALUES($incomeheaderid,'$applyday','$stoday')";
										mysqli_query($connect,$sql2)or die("Error in query".$sql2);
										$numday++;
									}
								}
								
								if($numday != 0){
									$avgamt = $totalamt/$nummbr;
									$avgamt = $avgamt/$numday;
									$sql5 = "UPDATE income_header SET num_days=$numday,average_amt=$avgamt WHERE income_header_id=$incomeheaderid";
									mysqli_query($connect,$sql5)or die("Error in query".$sql5);
								}				
							}
						}
					}
					
				}
			}
			else{
				$dupli = "duplicate";
			}		
		}
		elseif ($btn == "datech") {
			$datech = $data->datech;
			$sql1 = "SELECT * FROM promotion WHERE STR_TO_DATE(from_date, '%m/%d/%Y')<=STR_TO_DATE('".$datech."', '%m/%d/%Y') 
			AND STR_TO_DATE(to_date, '%m/%d/%Y')>=STR_TO_DATE('".$datech."', '%m/%d/%Y') AND recordstatus=1";
			$result1 = mysqli_query($connect,$sql1)or die("Error in query".$sql1);
			if (mysqli_num_rows($result1)>0) {
				while ($a = mysqli_fetch_assoc($result1)) {
					$promotions[] = $a;
				}
			}
			else{
				$promotions = "No Record";
			}
			$data = array("promotions"=>$promotions);
			print json_encode($data);
			exit();
		}
	}

	$sql = "SELECT * FROM members 		
		WHERE recordstatus=1		
	 	ORDER BY STR_TO_DATE(register_date, '%m/%d/%Y') DESC";
	$result = mysqli_query($connect,$sql)or die("Error in query".$sql);
	if (mysqli_num_rows($result)>0) {
		while ($a = mysqli_fetch_assoc($result)) {
			$members[] = $a;
		}
	}
	else{
		$members = "No Record";
	}

	$sql = "SELECT members.* 
		FROM members 
		LEFT JOIN income_header ON members.member_id=income_header.member_id 
		WHERE members.recordstatus=1 AND income_header.recordstatus=1
		GROUP BY members.member_id
	 	ORDER BY STR_TO_DATE(members.register_date, '%m/%d/%Y') DESC";
	$result = mysqli_query($connect,$sql)or die("Error in query".$sql);
	if (mysqli_num_rows($result)>0) {
		while ($a = mysqli_fetch_assoc($result)) {
			$memberlist[] = $a;
		}
	}
	else{
		$memberlist = "No Record";
	}

	$sql1 = "SELECT * FROM member_type WHERE recordstatus=1";
	$result1 = mysqli_query($connect,$sql1)or die("Error in query".$sql1);
	if (mysqli_num_rows($result1)>0) {
		while ($a = mysqli_fetch_assoc($result1)) {
			$membertypes[] = $a;
		}
	}
	else{
		$membertypes = "No Record";
	}

	$sql1 = "SELECT * FROM promotion WHERE pro_end!=1 AND STR_TO_DATE(from_date, '%m/%d/%Y')<=STR_TO_DATE('".$stoday."', '%m/%d/%Y') AND STR_TO_DATE(to_date, '%m/%d/%Y')>=STR_TO_DATE('".$stoday."', '%m/%d/%Y') AND recordstatus=1";
	$result1 = mysqli_query($connect,$sql1)or die("Error in query".$sql1);
	if (mysqli_num_rows($result1)>0) {
		while ($a = mysqli_fetch_assoc($result1)) {
			$promotions[] = $a;
		}
	}
	else{
		$promotions = "No Record";
	}

	$data = array("memberlist"=>$memberlist, "members"=>$members, "membertypes"=>$membertypes, "promotions"=>$promotions, "duplicate"=>$dupli);
	print json_encode($data);
 ?>