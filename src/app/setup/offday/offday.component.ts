import { Component, OnInit } from '@angular/core';
import { OffdayService } from './offday.service';
import { Observable }     from 'rxjs/Observable';
import { commonRouteUrl } from 'app/app.service';
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-offday',
  templateUrl: './offday.component.html',
  styleUrls: ['./offday.component.scss'],
  providers: [OffdayService,commonRouteUrl,DatePipe]
})

export class OffdayComponent implements OnInit {
public data: any[];
public data1: any[];
public offdayname = this.datePipe.transform(new Date(),"yyyy-MM-dd");
public offdesc = "";
public offdayid;
public confirmVal = true;
public hideVal = true;
public offdayconfirm;
public radioconfirm = "no";
public offdatefilter = "";

public filterQuery = "";
public rowsOnPage = 5;
public sortBy = "income_date";
public sortOrder = "asc";

  constructor(private offService: OffdayService, private userdata: commonRouteUrl, private router: Router, private datePipe:DatePipe) { }

   ngOnInit() {    
     if(this.userdata.roleId == "1"){
      return this.offService.getOffday().subscribe(offdays => {
        if(offdays != "No Record") {
          this.data = offdays;
          this.data1 = offdays;
        }
        else{
          this.data = [];
          this.data1 = [];
        }
      });
     }
     else{
      this.router.navigate(['/']);
     }      
  }

  createOffday() { 
      let creoffday = {offdate: this.datePipe.transform(this.offdayname,"MM/dd/yyyy"), offdes: this.offdesc, btn:'save'};
      this.offService.createOffday(creoffday).subscribe(
        data => {
          creoffday = null;
           if(data.offdays != "No Record") {
            this.data = data.offdays;
            this.data1 = data.offdays;
          }
          else{
            this.data = [];
            this.data1 = [];
          } 

          if(data.duplicatedata == 1){
              alert("Duplicate Off Day!");
            }
            else if(data.confirmdata == 1){
              this.offdayconfirm = this.datePipe.transform(this.offdayname,"MM/dd/yyyy");
              this.confirmVal = false;
              this.hideVal = false;
            }
            else{
              alert("Success!");  
              this.offdesc = null;
            }   
          
          this.offdayname = this.datePipe.transform(new Date(),"yyyy-MM-dd");       
        },
        error => {
          alert("Error! Please Check your Data or Contact with site admin");
          return Observable.throw(error);
        }
      );     
  }

  confirmOffday() {
    let conoffdat = {confirm: this.radioconfirm, offdate: this.offdayconfirm, offdes: this.offdesc, btn:'confirm'};
    console.log(this.offdesc);
    this.offService.confirmOffday(conoffdat).subscribe(
        data => {
         if(data.offdays != "No Record") {           
            this.data = data.offdays;
            this.data1 = data.offdays;
          }
          else{
            this.data = [];
            this.data1 = [];
          }      
          this.offdayname = this.datePipe.transform(new Date(),"yyyy-MM-dd"); 
          this.offdesc = "";
        })
    alert("Success!");
    this.clearConfirm();
  }

  clearConfirm() {
    this.offdayconfirm = "";
    this.offdesc = "";
    this.confirmVal = true;
    this.hideVal = true;
    this.offdayname = this.datePipe.transform(new Date(),"yyyy-MM-dd");      
  }
 
  deleteOffday(offday) {
    if (confirm("Are you sure you want to delete " + offday.off_date + "?")) {
    let deleteoff = {offday_id: offday.off_day_id, offdate:offday.off_date, btn:'delete'}
      this.offService.deleteOffday(deleteoff).subscribe(
         data => {
           deleteoff = null;
           if(data != "No Record") {
            this.data = data;
            this.data1 = data;
          }
          else{
            this.data = [];
            this.data1 = [];
          }
          alert("Successfully Deleted.");
         },
         error => {
           alert("Error Deleting!");
           return Observable.throw(error);
         }
      );
    }
  }

  assignCopy(){
   this.data = Object.assign([], this.data1);
  }

  filterItem(value){
   if(value.length == 0) {
     this.assignCopy();
   }
   else{    
    var offdate = this.datePipe.transform(value,"MM/dd/yyyy");
         this.data = Object.assign([], this.data1).filter(
          //  item => item.category_name.toLowerCase().indexOf(this.offdatefilter.toLowerCase()) > -1
           item => item.off_date.indexOf(offdate) > -1            
         )
     }      
  }

}
