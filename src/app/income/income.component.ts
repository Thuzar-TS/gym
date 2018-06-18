import { Component, OnInit } from '@angular/core';
import { IncomeService } from './income.service';
import { Observable }     from 'rxjs/Observable';
import { commonRouteUrl } from 'app/app.service';
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss'],
  providers: [IncomeService,commonRouteUrl,DatePipe]
})
export class IncomeComponent implements OnInit {
public data: any[];
public data1: any[];
public data2: any[];
public detail: any[];
public income_name = "";
public income_amt = 0;
public income_remark = "";
public saveVal = false;
public setupVal = true;
public hideVal = true;
public startdate = this.datePipe.transform(new Date(),"yyyy-MM-dd");
private incomehid;
public incfromdatefilter = "";
public inctodatefilter = "";
public inctotal = 0;
public namefilter = null;
public idfilter = null;
public regdatefilter = "";

public filterQuery = "";
public rowsOnPage = 5;
public sortBy = "income_date";
public sortOrder = "asc";
public headerVal = false;

  constructor(private incomeService: IncomeService, private userdata: commonRouteUrl, private router: Router, private datePipe:DatePipe) { }

  ngOnInit() {   
    if(this.userdata.roleId == "1"){

      let filterdate = {fromd: this.datePipe.transform(this.incfromdatefilter,"MM/dd/yyyy"),tod: this.datePipe.transform(this.inctodatefilter,"MM/dd/yyyy"), btn:""}
      //console.log(filterdate);
      return this.incomeService.getIncome(filterdate).subscribe(data => {
      if(data.inc != "No Record") {
          this.data = data.inc;
          this.data1 = data.inc;
          this.data2 = data.inc;          
        }
        else{
          this.data = [];
          this.data1 = []; 
          this.data2 = [];
        }
        this.assignCopy();
      });
    }
    else{
      this.router.navigate(['/']);
    }  
  }

  showsetup(){
    this.setupVal = false;
    this.hideVal = false;
  }

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Income Ledger</title>
          <link href="../../assets/css/print-style.css" rel="stylesheet">
        </head>
        <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
}

  createIncome() {
    if(this.income_name!=null && this.income_name!='' && this.income_name!=undefined && this.income_amt!=null && this.income_amt!=0 && this.income_amt!=undefined){
      
      let exp = {fromd: this.datePipe.transform(this.incfromdatefilter,"MM/dd/yyyy"),tod: this.datePipe.transform(this.inctodatefilter,"MM/dd/yyyy"),
      incomedes: this.income_name,amount: 
      this.income_amt,startdate: this.datePipe.transform(this.startdate,"MM/dd/yyyy"),
      remark: this.income_remark,btn:'save'};
      this.incomeService.createIncome(exp).subscribe(
        data => {
          exp = null;
          if(data.inc != "No Record") {          
            this.data = data.inc;
            this.data1 = data.inc; 
            this.data2 = data.inc;
          }
          else{
            this.data = [];
            this.data1 = []; 
            this.data2 = [];
          }
          alert("Save Success!");
          this.assignCopy();
          this.clearIncome();
        },
        error => {
          alert("Error saving Income!  Contact with site admin.");
          return Observable.throw(error);
        }
      );
    }
    else{
      alert("Please Fill Completely.");
    }   
  }
 
  editIncome(inc) {
  this.showsetup();
  this.incomehid = inc.income_header_id;
  this.saveVal = true;
  this.income_name = inc.income_description;
  this.income_amt = inc.average_amt;
  this.income_remark = inc.remark;
  this.startdate = this.datePipe.transform(inc.income_date,"yyyy-MM-dd");
  }

  updateIncome() {
    if(this.income_name!=null && this.income_name!='' && this.income_name!=undefined && this.income_amt!=null && this.income_amt!=0 && this.income_amt!=undefined){

      let updateexp = {fromd: this.datePipe.transform(this.incfromdatefilter,"MM/dd/yyyy"),tod: this.datePipe.transform(this.inctodatefilter,"MM/dd/yyyy"),
      incomehid:this.incomehid,incomedes: this.income_name,amount: 
      this.income_amt,startdate: this.datePipe.transform(this.startdate,"MM/dd/yyyy"),
      remark: this.income_remark,btn:'edit'};

      this.incomeService.updateIncome(updateexp).subscribe(
        data => {
          updateexp = null;
          if(data.inc != "No Record") {
            this.data = data.inc;
            this.data1 = data.inc; 
            this.data2 = data.inc;
          }
          else{
            this.data = [];
            this.data1 = []; 
            this.data2 = [];
          }
          alert("Edit Success!");
          this.assignCopy();
          this.clearIncome();
        },
        error => {
          alert("Error editing Income!  Contact with site admin.");
          return Observable.throw(error);
        }
      );
    }
    else{
      alert("Please Fill Completely.");
    }    
  }
 
  deleteIncome(inc) {
    if (confirm("Are you sure you want to delete " + inc.income_description + "?")) {
    let deleteinc = {fromd: this.datePipe.transform(this.incfromdatefilter,"MM/dd/yyyy"),tod: this.datePipe.transform(this.inctodatefilter,"MM/dd/yyyy"),
    incomehid:inc.income_header_id,btn:'delete'}
      this.incomeService.deleteIncome(deleteinc).subscribe(
         data => {
           deleteinc = null;
           if(data.inc != "No Record") {
            this.data = data.inc;
            this.data1 = data.inc; 
            this.data2 = data.inc;
          }
          else{
            this.data = [];
            this.data1 = []; 
            this.data2 = [];
          }
          alert("Delete Success!");
         },
         error => {
           alert("Error deleting Income!  Contact with site admin.");
           return Observable.throw(error);
         }
      );
    }
  }

  clearIncome() {
   this.income_name = null;
   this.income_amt = null;
   this.income_remark = "";
   this.saveVal = false;
   this.setupVal = true;
   this.hideVal = true;
   this.startdate = this.datePipe.transform(new Date(),"yyyy-MM-dd");
  }

  assignCopy(){
    this.inctotal = 0;
   this.data = Object.assign([], this.data2);

   for (var i = this.data.length - 1; i >= 0; i--) {
      this.inctotal += parseFloat(this.data[i].average_amt);
    }
  }

   /*filterItem(){
     console.log(this.regdatefilter);
   if(this.namefilter == null && this.idfilter == null && this.regdatefilter.length == 0) {
     this.assignCopy();
   }
   else{
     var exp1;
     var exp2;
     var exp3;
     this.inctotal = 0;

     if (this.namefilter == null) {
        this.namefilter = "";
      }

      if (this.idfilter == null) {
        this.idfilter = "";
      }

      if (this.regdatefilter.length != 0) {
        var reg = this.datePipe.transform(this.regdatefilter,"MM/dd/yyyy");
      }
      else{
        var reg = "";
      }  

        exp1 = Object.assign([], this.data1).filter(
            item => item.member_name.toLowerCase().indexOf(this.namefilter.toLowerCase()) > -1
         )
         exp2 = Object.assign([], exp1).filter(
            item => item.member_register_id.toLowerCase().indexOf(this.idfilter.toLowerCase()) > -1
         )
         exp3 = Object.assign([], exp2).filter(
            item => item.income_date.indexOf(reg) > -1
         )
    
      this.data = exp3;

      for (var i = this.data.length - 1; i >= 0; i--) {
        this.inctotal += parseFloat(this.data[i].average_amt);
      }
   } 
  }*/

  filterItem(){
   if(this.namefilter == null && this.idfilter == null && this.regdatefilter.length == 0) {
     this.assignCopy();
   }
   else{     
      var exp1;
      var exp2;
      var exp3;
      this.inctotal = 0;
      
      if (this.namefilter == null) {
        this.namefilter = "";
      }
     
      if (this.idfilter == null) {
        this.idfilter = "";
      }

      if (this.regdatefilter.length != 0) {
        var reg = this.datePipe.transform(this.regdatefilter,"MM/dd/yyyy");
      }
      else{
        var reg = "";
      }
    
         exp1 = Object.assign([], this.data1).filter(
            item => item.member_name.toLowerCase().indexOf(this.namefilter.toLowerCase()) > -1
         )
         exp2 = Object.assign([], exp1).filter(
            item => item.member_register_id.toLowerCase().indexOf(this.idfilter.toLowerCase()) > -1
         )
         exp3 = Object.assign([], exp2).filter(
            item => item.income_date.indexOf(reg) > -1
         )
        
         this.data = exp3;

         for (var i = this.data.length - 1; i >= 0; i--) {
          this.inctotal += parseFloat(this.data[i].average_amt);
        }

     }      
  }

 /*filterItem(fromd,tod){
   if(fromd.length == 0 || tod.length == 0) {
     this.assignCopy();
   }
   else{    
     this.inctotal = 0;
     var exp1;
     if (fromd.length != 0) {
        var fromdate = this.datePipe.transform(fromd,"MM/dd/yyyy");
      }
     if (tod.length != 0) {
        var todate = this.datePipe.transform(tod,"MM/dd/yyyy");
      }

    var ff = new Date(fromdate);
    var tt = new Date(todate);
    var days = (tt.getTime()-ff.getTime())/(24*60*60*1000);

    exp1 = Object.assign([], this.data1).filter(
      item => item.income_date.indexOf(fromdate) > -1
   )
    var cc = ff.getTime()+(24*60*60*1000);
    var ddd = this.datePipe.transform(new Date(cc),"MM/dd/yyyy");

    var ee = exp1;
    var dd = ddd;
    if (fromd.length != 0 && tod.length != 0) {

      for (var i = days - 1; i >= 0; i--) {      
           exp1 = Object.assign([], this.data2).filter(
              item => item.income_date.indexOf(dd) > -1
           )
           for (var j = exp1.length - 1; j >= 0; j--) {
             ee.push(exp1[j]);
           }
           var tt = new Date(dd);
           var ccc = tt.getTime()+(24*60*60*1000);
           dd = this.datePipe.transform(new Date(ccc),"MM/dd/yyyy");      
        }
        this.data = ee;

        for (var i = this.data.length - 1; i >= 0; i--) {
          this.inctotal += parseFloat(this.data[i].average_amt);
        }
     }
 
     }      
 }*/

}
