import { Component, OnInit } from '@angular/core';
import { RegistersService } from './registers.service';
import { Observable }     from 'rxjs/Observable';
import { commonRouteUrl } from 'app/app.service';
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-registers',
  templateUrl: './registers.component.html',
  styleUrls: ['./registers.component.scss'],
  providers: [RegistersService,commonRouteUrl,DatePipe]
})
export class RegistersComponent implements OnInit {
 
    public filterQuery = "";
    public rowsOnPage = 5;
    public sortBy = "income_date";
    public sortOrder = "asc";

    public data: any[];
    public data1: any[];
    private mbrid;
    public mbr;
    private incomeid;
    public dailyVal = true;
    public finishedVal = false;
    public hideVal = true;
    public dailyaction = null;
    public dailyfood = null;
    public mbfromdatefilter = "";
    public mbtodatefilter = "";

  constructor(private route: ActivatedRoute,private regService: RegistersService, private userdata: commonRouteUrl, private router: Router, private datePipe:DatePipe) { }

   ngOnInit() {
     this.mbrid = this.route.snapshot.params['id'];
     if(this.userdata.roleId == "1"){
       let filterdate = {fromd: this.datePipe.transform(this.mbfromdatefilter,"MM/dd/yyyy"),tod: this.datePipe.transform(this.mbtodatefilter,"MM/dd/yyyy"), btn:""}
      return this.regService.getLedger(filterdate,this.mbrid).subscribe(data => {
        if(data.ledger != "No Record") {
          this.data = data.ledger;
          this.data1 = data.ledger;
        }
        else{
          this.data = [];
          this.data1 = [];
        }
        this.mbr = data.member;
        this.assignCopy();
      });
     }
     else{
      this.router.navigate(['/']);
     }      
  }
  public toInt(num: string) {
        return +num;
    }

    public remove(item) {
        let index = this.data.indexOf(item);
        if(index>-1) {
            this.data.splice(index, 1);
        }
    }

    print(): void {
      let printContents, popupWin;
      printContents = document.getElementById('print-section').innerHTML;
      popupWin = window.open('', '', 'top=0,left=0,height=100%,width=auto');
      popupWin.document.open();
      popupWin.document.write(`
        <html>
          <head>
            <title>Member Ledger</title>
            <link href="../../assets/css/print-style.css" rel="stylesheet">
          </head>
          <body onload="window.print();window.close()">${printContents}</body>
        </html>`
      );
      popupWin.document.close();
  }

    dailyAction(ledg){
     this.dailyaction = ledg.daily_action;
     this.dailyfood = ledg.daily_food;
     this.dailyVal = false;
     this.hideVal = false;
     this.incomeid = ledg.income_detail_id;
    }

    dailySave(){
      this.finishedVal = true;
      if((this.dailyaction != "" && this.dailyaction != null) || (this.dailyfood != "" && this.dailyfood != null)){
        let dailysave = {fromd: this.datePipe.transform(this.mbfromdatefilter,"MM/dd/yyyy"),tod: this.datePipe.transform(this.mbtodatefilter,"MM/dd/yyyy"),dailyaction: this.dailyaction, dailyfood:this.dailyfood, incomeid:this.incomeid, btn:'daily'}
        return this.regService.createDaily(dailysave,this.mbrid).subscribe(data => {
          if(data.ledger != "No Record") {
            this.data = data.ledger;
            this.data1 = data.ledger;
          }
          else{
            this.data = [];
            this.data1 = [];
          }
          alert("Success!");
          this.clearDaily();
        });
      }
      else{
        alert("Please Fill Completely");
        this.finishedVal = false;
      }
    }
    
    clearDaily(){
     this.dailyVal = true;
     this.hideVal = true;
     this.dailyaction = null;
     this.dailyaction = null;
     this.dailyfood = null;
     this.finishedVal = false;
    }

    assignCopy(){
     this.data = Object.assign([], this.data1);
    }

    filterItem(value){
     if(value.length == 0) {
       this.assignCopy();
     }
     else{    
      var incdate = this.datePipe.transform(value,"MM/dd/yyyy");
           this.data = Object.assign([], this.data1).filter(
            //  item => item.category_name.toLowerCase().indexOf(this.offdatefilter.toLowerCase()) > -1
             item => item.register_date.indexOf(incdate) > -1            
           )
       }      
    }
}
