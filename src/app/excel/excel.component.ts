import { Component, OnInit } from '@angular/core';
import { ExcelService } from './excel.service';
import { Observable }     from 'rxjs/Observable';
import { commonRouteUrl } from 'app/app.service';
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { saveAs } from 'file-saver';
//import * as saveAs from 'file-saver';

@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.scss'],
  providers: [ExcelService,commonRouteUrl,DatePipe]
})
export class ExcelComponent implements OnInit {
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
public incfromdatefilter = this.datePipe.transform(new Date(),"yyyy-MM-dd");
public inctodatefilter = this.datePipe.transform(new Date(),"yyyy-MM-dd");
private incomehid;

public inctotal = 0;
public namefilter = null;
public idfilter = null;
public regdatefilter = "";
public dailydate = "";
public template;
public regexcel = true;
public trainers;
public trainerfilter = 0;

public filterQuery = "";
public rowsOnPage = 10;
public rowsOnPage1 = 10;
public sortBy = "income_date";
public sortOrder = "asc";
public headerVal = false;

  constructor(private incomeService: ExcelService, private userdata: commonRouteUrl, private router: Router, private datePipe:DatePipe) { }

  ngOnInit() {   
    if(this.userdata.roleId == "1"){

      let filterdate = {fromd: this.datePipe.transform(this.incfromdatefilter,"MM/dd/yyyy"),tod: this.datePipe.transform(this.inctodatefilter,"MM/dd/yyyy"), btn:"reg"}
      
      return this.incomeService.getExcel(filterdate).subscribe(data => {
      if(data.excel != "No Record") {
          this.data = data.excel;
          this.data1 = data.excel;
          this.data2 = data.excel;         
        }
        else{
          this.data = [];
          this.data1 = []; 
          this.data2 = [];
        }

        if(data.trainers != "No Record") {
          this.trainers = data.trainers;
          this.trainers.splice(0, 0, {trainer_id:0,trainer_name:"-- Choose Trainer --"});
        }
        else{
          this.trainers = [{trainer_id:0, trainer_name:"-- No Trainer --"}];
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

  tableToExcel() {
    if (this.regexcel == true) {
      var table = "regtable";
    }
    else{
      var table = "dailytable";
    }

     var blob = new Blob(["\ufeff",document.getElementById(table).innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
     saveAs(blob, "ExcelReport.xls");
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

  dailyExcel(a){
    if (a == "daily") {
      this.regexcel = false;
      let filterdate = {fromd: this.datePipe.transform(this.incfromdatefilter,"MM/dd/yyyy"),tod: this.datePipe.transform(this.inctodatefilter,"MM/dd/yyyy"), btn:"daily"}
      return this.incomeService.getExcel(filterdate).subscribe(data => {
      if(data.excel != "No Record") {
          this.data = data.excel;
          this.data1 = data.excel;
          this.data2 = data.excel;         
        }
        else{
          this.data = [];
          this.data1 = []; 
          this.data2 = [];
        }

        if(data.trainers != "No Record") {
          this.trainers = data.trainers;
          this.trainers.splice(0, 0, {trainer_id:0,trainer_name:"-- Choose Trainer --"});
          this.trainerfilter = this.trainers[0].trainer_id;
        }
        else{
          this.trainers = [{trainer_id:0, trainer_name:"-- No Trainer --"}];
          this.trainerfilter = this.trainers[0].trainer_id;
        }   
        this.assignCopy();
      });
    }
    else{
      this.regexcel = true;
      let filterdate = {fromd: this.datePipe.transform(this.incfromdatefilter,"MM/dd/yyyy"),tod: this.datePipe.transform(this.inctodatefilter,"MM/dd/yyyy"), btn:"reg"}
      return this.incomeService.getExcel(filterdate).subscribe(data => {
      if(data.excel != "No Record") {
          this.data = data.excel;
          this.data1 = data.excel;
          this.data2 = data.excel;         
        }
        else{
          this.data = [];
          this.data1 = []; 
          this.data2 = [];
        }

        if(data.trainers != "No Record") {
          this.trainers = data.trainers;
          this.trainers.splice(0, 0, {trainer_id:0,trainer_name:"-- Choose Trainer --"});
          this.trainerfilter = this.trainers[0].trainer_id;
        }
        else{
          this.trainers = [{trainer_id:0, trainer_name:"-- No Trainer --"}];
          this.trainerfilter = this.trainers[0].trainer_id;
        }   
        this.assignCopy();
      });
    }
  }

  filterItem1(trainerfilter,dailydate){
   if(this.dailydate.length == 0 && trainerfilter == null) {
     this.assignCopy();
   }
   else{    
     var exp1;
     var exp2;

     if (trainerfilter == 0) {
        trainerfilter = "";
      }

      if (this.dailydate.length != 0) {
        var dai = this.datePipe.transform(this.dailydate,"MM/dd/yyyy");
      }
      else{
        var dai = "";
      }
 
      exp1 = Object.assign([], this.data1).filter(
          item => item.trainer_id.toLowerCase().indexOf(trainerfilter.toLowerCase()) > -1
       )
      exp2 = Object.assign([], exp1).filter(
            item => item.action_date.indexOf(dai) > -1
         )
      this.data = exp2;
   } 
  }

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
            item => item.register_date.indexOf(reg) > -1
         )
        
         this.data = exp3;
     }      
  }

}
