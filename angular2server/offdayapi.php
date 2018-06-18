<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: X-Requested-With');
header('Access-Control-Allow-Methods: PUT, POST, GET, UPDATE, DELETE, EDIT, OPTIONS');

include("connectdb.inc");
include("date.php");
$data = json_decode(file_get_contents("php://input"));
$duplicatedata = 0;
$confirmdata = 0;
//$testing = null;
	if ($data) {
		$btn = $data->btn;
		
		if ($btn == "save") {
			$offdate = $data->offdate;
			$offdes = $data->offdes;
			$sql = "SELECT off_day_id FROM off_day WHERE off_date='$offdate' AND recordstatus=1";
			$result = mysqli_query($connect,$sql)or die("Error in query".$sql);
			if (mysqli_num_rows($result)>0) {
				$duplicatedata = 1;
			}
			else{
				$sql2 = "SELECT income_detail_id FROM income_detail WHERE income_date = '$offdate' AND recordstatus=1";
				$result2 = mysqli_query($connect,$sql2)or die("Error in query".$sql2);
				if (mysqli_num_rows($result2)>0) {
					$confirmdata = 1;
				}
				else{
					$sql1 = "INSERT INTO off_day (off_date,description,user_id,createddate) VALUES('$offdate','$offdes',1,'$stoday')";
					mysqli_query($connect,$sql1)or die("Error in query".$sql1);
				}								
			}			
		}
		elseif ($btn == "delete") {
			$offday_id = $data->offday_id;
			$offdate = $data->offdate;

			$sql1 = "UPDATE off_day SET recordstatus=2 WHERE off_day_id=$offday_id";
			mysqli_query($connect,$sql1)or die("Error in query".$sql1);

			$sql = "SELECT income_header.income_header_id,income_header.end_date,member_type.mbr_type_id,income_header.num_days,income_header.total_amt 
			FROM income_header 
			INNER JOIN member_type ON member_type.mbr_type_id = income_header.mbr_type_id
			WHERE STR_TO_DATE(income_header.end_date, '%m/%d/%Y') > STR_TO_DATE('$offdate', '%m/%d/%Y') AND income_header.recordstatus=1";
			$result = mysqli_query($connect,$sql)or die("Error in query".$sql);
			if (mysqli_num_rows($result)>0) {
				while ($a = mysqli_fetch_assoc($result)) {
					$headerid[] = $a;
				}
			}

			if (isset($headerid)) {
				for ($i=0; $i < sizeof($headerid); $i++) { 
					$hid = intval($headerid[$i]["income_header_id"]);
					$edate = $headerid[$i]["end_date"];
					$typeid = $headerid[$i]["mbr_type_id"];

					$sqlcheck = "SELECT income_header_id FROM income_detail 
					WHERE income_date='$offdate' AND income_header_id=$hid AND recordstatus=1";
					$resultcheck = mysqli_query($connect,$sqlcheck)or die("Error in query".$sqlcheck);
					if (mysqli_num_rows($resultcheck)<1) {
						if ($typeid != 1) {
							$sqlmonth = "INSERT INTO income_detail(income_date,income_header_id,recordstatus) 
							VALUES('$offdate',$hid,1)";
							mysqli_query($connect,$sqlmonth)or die("Error in query".$sqlmonth);

							$total = $headerid[$i]["total_amt"];
							$numd = $headerid[$i]["num_days"];
							$numd++;
							$avg = $total/$numd;
							$sqlupd = "UPDATE income_header SET num_days=$numd,average_amt=$avg 
							WHERE income_header_id=$hid AND recordstatus=1";
							mysqli_query($connect,$sqlupd)or die("Error in query".$sqlupd);
						}
						else{
							$sql1 = "SELECT income_date FROM income_detail 
							WHERE income_date='$edate' AND income_header_id=$hid AND recordstatus=1";
							$result1 = mysqli_query($connect,$sql1)or die("Error in query".$sql1);
							if (mysqli_num_rows($result1)>0) {
								$sql2 = "UPDATE income_detail SET income_date='$offdate' 
								WHERE income_header_id=$hid AND income_date='$edate' AND recordstatus=1";
								mysqli_query($connect,$sql2)or die("Error in query".$sql2);

								$time = strtotime($edate.' -1 day');
			    					$daych = date("m/d/Y", $time);
			    					$endloop = 0;

			    					do{
				    					$sql3 = "SELECT off_date FROM off_day WHERE off_date='$daych' AND recordstatus=1";
				    					$result3 = mysqli_query($connect,$sql3)or die("Error in query".$sql3);
									if (mysqli_num_rows($result3)<1) {
										$sql4 = "UPDATE income_header SET end_date='$daych' 
										WHERE income_header_id=$hid AND recordstatus=1";
										mysqli_query($connect,$sql4)or die("Error in query".$sql4);
										$endloop = 1;
									}
									else{
										$time = strtotime($daych.' -1 day');
			    							$daych = date("m/d/Y", $time);
									}
			    					}while($endloop < 1);		    										
							}
						}
					}					
					
				}
				
			}
			
		}
		elseif ($btn == "confirm") {
			$confirm = $data->confirm;
			$offdate = $data->offdate;
			$offdes = $data->offdes;

			$sql = "SELECT income_header_id,income_detail_id FROM income_detail WHERE income_date='$offdate' AND recordstatus=1";
			$result = mysqli_query($connect,$sql)or die("Error in query".$sql);
			if (mysqli_num_rows($result)>0) {
				while ($a = mysqli_fetch_assoc($result)) {
					$headerid[] = $a["income_header_id"];
					$detailid[] = $a["income_detail_id"];
				}
			}

			if ($confirm == "replace") {
				if ($headerid) {
					for ($i=0; $i < sizeof($headerid); $i++) { 
						$hid = intval($headerid[$i]);
						$did = intval($detailid[$i]);
						$sql1 = "SELECT DATE_FORMAT(incomedate, '%m/%d/%Y') AS incomedate,income_detail_id 
						FROM (SELECT MAX(STR_TO_DATE(income_date, '%m/%d/%Y')) AS incomedate,income_detail_id 
							FROM income_detail WHERE income_header_id=$hid) AS aa";
						$result1 = mysqli_query($connect,$sql1)or die("Error in query".$sql1);
						if (mysqli_num_rows($result1)>0) {
							while ($a = mysqli_fetch_assoc($result1)) {
								$testing = $a["incomedate"];
								//$incomedetailid = $a["income_detail_id"];
							}							
						}
						else{
							$testing = null;
							//$incomedetailid = null;
						}

						if(!is_null($testing)) {
							$endloop = 0;
							do{
								$time = strtotime($testing.' +1 day');
	    							$dayadd = date("m/d/Y", $time);
	    							$sql2 = "SELECT off_date FROM off_day WHERE off_date='$dayadd' AND recordstatus=1";
	    							$result2 = mysqli_query($connect,$sql2)or die("Error in query".$sql2);
								if (mysqli_num_rows($result2)>0) {
									$endloop = 0;	
									$testing = $dayadd;							
								}
								else{
									$sql4 = "UPDATE income_detail SET income_date = '$dayadd' WHERE income_detail_id=$did";
									mysqli_query($connect,$sql4)or die("Error in query".$sql4);

									$sql5 = "UPDATE income_header SET end_date='$dayadd' WHERE income_header_id=$hid AND recordstatus=1";									
									mysqli_query($connect,$sql5)or die("Error in query".$sql5);

									$endloop = 1;
									break;
								}								
							}while($endloop < 1);							
						}
					}
				}								
			}
			elseif ($confirm == "noreplace") {		
				$sql1 = "UPDATE income_detail SET recordstatus=2 WHERE income_date='$offdate' AND recordstatus=1";
				mysqli_query($connect,$sql1)or die("Error in query".$sql1);

				if ($headerid) {
					for ($j=0; $j < sizeof($headerid); $j++) { 
						$hid = intval($headerid[$j]);
						$sql2 = "SELECT COUNT(income_detail_id) AS numofdays FROM income_detail 
						WHERE income_header_id=$hid AND recordstatus = 1";
						$result2 = mysqli_query($connect,$sql2)or die("Error in query".$sql2);
						if (mysqli_num_rows($result2)>0) {
							while ($a = mysqli_fetch_assoc($result2)) {
								$numday = $a["numofdays"];
							}							
						}

						$sql3 = "SELECT total_amt FROM income_header 
						WHERE income_header_id=$hid AND recordstatus = 1";
						$result3 = mysqli_query($connect,$sql3)or die("Error in query".$sql3);
						if (mysqli_num_rows($result3)>0) {
							while ($a = mysqli_fetch_assoc($result3)) {
								$totalamt = $a["total_amt"];
							}							
						}

						if ($numday) {
							if ($numday > 0) {	
								$avgamt = $totalamt/$numday;							
								$sql4 = "UPDATE income_header SET num_days=$numday,average_amt=$avgamt 
								WHERE recordstatus=1 AND income_header_id=$hid";
								mysqli_query($connect,$sql4)or die("Error in query".$sql4);
							}
							elseif ($numday == 0){
								$sql4 = "UPDATE income_header SET recordstatus=2 WHERE income_header_id=$hid AND recordstatus=1";
								mysqli_query($connect,$sql4)or die("Error in query".$sql4);
							}
						}
					}
				}
			}
			/*elseif ($confirm == "no") {
				# code...
			}*/
			$sql5 = "INSERT INTO off_day (off_date,description,user_id,createddate) VALUES('$offdate','$offdes',1,'$stoday')";
	    		mysqli_query($connect,$sql5)or die("Error in query".$sql5);
		}
	}

	$sql = "SELECT *,(CASE WHEN STR_TO_DATE(off_date, '%m/%d/%Y') < STR_TO_DATE('$stoday', '%m/%d/%Y') THEN '-' ELSE 'Delete' END) AS action FROM off_day 
	WHERE recordstatus=1 ORDER BY STR_TO_DATE(off_date, '%m/%d/%Y') DESC";
	$result = mysqli_query($connect,$sql)or die("Error in query".$sql);
	if (mysqli_num_rows($result)>0) {
		while ($a = mysqli_fetch_assoc($result)) {
			$offdays[] = $a;
		}
	}
	else{
		$offdays = "No Record";
	}
	$data = array("offdays"=>$offdays, "duplicatedata"=>$duplicatedata, "confirmdata"=>$confirmdata);
	print json_encode($data);
 ?>