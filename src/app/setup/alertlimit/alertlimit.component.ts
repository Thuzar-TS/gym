import { Component, OnInit } from '@angular/core';
import { AlertLimitService } from './alertlimit.service';
import { Observable }     from 'rxjs/Observable';
import { commonRouteUrl } from 'app/app.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-alertlimit',
  templateUrl: './alertlimit.component.html',
  styleUrls: ['./alertlimit.component.scss'],
  providers: [AlertLimitService,commonRouteUrl]
})
export class AlertLimitComponent implements OnInit {
public data: any[];
public limitnum;
public saveVal = false;
public cateid;
public namefilter = null;

public filterQuery = "";
public rowsOnPage = 5;
public sortBy = "income_date";
public sortOrder = "asc";

  constructor(private alertService: AlertLimitService, private userdata: commonRouteUrl, private router: Router) { }

   ngOnInit() {
     if(this.userdata.roleId == "1"){
      return this.alertService.getAlertLimit().subscribe(data => {
        if(data.alertlimit != "No Record") {
          this.data = data.alertlimit;
        }
        else{
          this.data = [];
        }
      });
     }
     else{
      this.router.navigate(['/']);
     }      
  }
 
  editAlertLimit(cate) {
  this.limitnum = cate.limit_no;
  this.cateid = cate.alert_limit_id;
  this.saveVal = true;
  }

  updateAlertLimit() {
    if(this.limitnum!=null && this.limitnum!='' && this.limitnum!=undefined){
      let updatecate = {limitid: this.cateid, limitnum: this.limitnum, btn:'edit'};
      this.alertService.updateAlertLimit(updatecate).subscribe(
        data => {
          updatecate = null;
          if(data.alertlimit != "No Record") {
            this.data = data.alertlimit;
          } 
          else{
            this.data = [];
          }   
          this.limitnum = null;
          this.saveVal = false; 
          alert("Successfully Edited!");         
        },
        error => {
          alert("Error updating Alert Limit!  Contact with site admin.");
          return Observable.throw(error);
        }
      );
    }
    else{
      alert("Please Fill Completely.");
    }    
  } 
  
  clearCategory() {
   this.limitnum = null;
   this.saveVal = false;
  } 

}
