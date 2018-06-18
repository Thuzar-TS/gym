import { Component, OnInit } from '@angular/core';
import { ExpenseService } from './expense.service';
import { Observable }     from 'rxjs/Observable';
import { commonRouteUrl } from 'app/app.service';
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss'],
  providers: [ExpenseService,commonRouteUrl,DatePipe]
})
export class ExpenseComponent implements OnInit {
public data: any[];
public data1: any[];
public expense_name = "";
public expense_amt = 0;
public expense_remark = "";
public saveVal = false;
public category;
public cagegoryname;
public categoryfilter;
public expdatefilter = "";
public setupVal = true;
public hideVal = true;
public finishedVal = false;
public expdate = this.datePipe.transform(new Date(),"yyyy-MM-dd");
private expid;
public expfromdatefilter = "";
public exptodatefilter = "";
public exptotal = 0;
public categoryfilterval;

public filterQuery = "";
public rowsOnPage = 5;
public sortBy = "income_date";
public sortOrder = "asc";

  constructor(private expenseService: ExpenseService, private userdata: commonRouteUrl, private router: Router, private datePipe:DatePipe) { }

  ngOnInit() {
  //  this.categoryfilter = 0;
    if(this.userdata.roleId == "1"){
      let filterdate = {fromd: this.datePipe.transform(this.expfromdatefilter,"MM/dd/yyyy"),tod: this.datePipe.transform(this.exptodatefilter,"MM/dd/yyyy"), btn:""}
      return this.expenseService.getExpense(filterdate).subscribe(data => {
      if(data.exp != "No Record") {
          this.data = data.exp;
          this.data1 = data.exp;          
        }
        else{
          this.data = [];
          this.data1 = [];
        }
      if (data.cate != "No Record") {
            this.category = data.cate;
            this.category.splice(0, 0, {category_id:0,category_name:"-- Choose Category --"});
            this.cagegoryname = this.category[0].category_id;
            this.categoryfilter = this.category[0];
          }
          else{
            this.category = [{category_id:0,category_name:"-- Choose Category --"}];
            this.cagegoryname = this.category[0].category_id;
            this.categoryfilter = this.category[0];
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

  createExpense() {
    this.finishedVal = true;
    if(this.expense_name!=null && this.expense_name!='' && this.expense_name!=undefined && this.cagegoryname.category_id!=0 && this.expense_amt!=null && this.expense_amt!=0 && this.expense_amt!=undefined){
      
      let exp = {fromd: this.datePipe.transform(this.expfromdatefilter,"MM/dd/yyyy"),
      tod: this.datePipe.transform(this.exptodatefilter,"MM/dd/yyyy"),
      expdescription: this.expense_name,amount: this.expense_amt, 
      expdate: this.datePipe.transform(this.expdate,"MM/dd/yyyy"),
      category_id: this.cagegoryname,remark: this.expense_remark,btn:'save'};
      this.expenseService.createExpense(exp).subscribe(
        data => {
          exp = null;
          if(data.exp != "No Record") {
            this.data = data.exp;
            this.data1 = data.exp;
          }
          else{
            this.data = [];
            this.data1 = [];
          }
          if (data.cate != "No Record") {
              this.category = data.cate;
              this.category.splice(0, 0, {category_id:0,category_name:"-- Choose Category --"});
              this.cagegoryname = this.category[0].category_id;
              this.categoryfilter = this.category[0];
            }
            else{
              this.category = [{category_id:0,category_name:"-- Choose Category --"}];
              this.cagegoryname = this.category[0].category_id;
              this.categoryfilter = this.category[0];
            }
          alert("Save Success!");
          this.clearExpense();
        },
        error => {
          alert("Error saving Expense! Contact with site admin.");
          return Observable.throw(error);
        }
      );
    }
    else{
      alert("Please Fill Completely.");
      this.finishedVal = false;
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
          <title>Expense Ledger</title>
          <link href="../../assets/css/print-style.css" rel="stylesheet">
        </head>
        <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }
 
  editExpense(exp) {
  this.showsetup();
  this.expid = exp.expense_id;
  this.saveVal = true;
  this.expense_name = exp.exp_description;
  this.expense_amt = exp.amount;
  this.expense_remark = exp.remark;
  this.cagegoryname = exp.category_id;
  this.expdate = this.datePipe.transform(exp.exp_date,"yyyy-MM-dd");
  }

  updateExpense() {
    this.finishedVal = true;
    if(this.expense_name!=null && this.expense_name!='' && this.expense_name!=undefined && this.cagegoryname!=0 && this.expense_amt!=null && this.expense_amt!=0 && this.expense_amt!=undefined){

      let updateexp = {fromd: this.datePipe.transform(this.expfromdatefilter,"MM/dd/yyyy"),
      tod: this.datePipe.transform(this.exptodatefilter,"MM/dd/yyyy"),
      expense_id:this.expid,expdescription: this.expense_name,amount: 
      this.expense_amt,expdate: this.datePipe.transform(this.expdate,"MM/dd/yyyy"),
      category_id: this.cagegoryname,remark: this.expense_remark,btn:'edit'};

      this.expenseService.updateExpense(updateexp).subscribe(
        data => {
          updateexp = null;
          if(data.exp != "No Record") {
            this.data = data.exp;
            this.data1 = data.exp;
          }
          else{
            this.data = [];
            this.data1 = [];
          }
          if (data.cate != "No Record") {
              this.category = data.cate;
              this.category.splice(0, 0, {category_id:0,category_name:"-- Choose Category --"});
              this.cagegoryname = this.category[0].category_id;
              this.categoryfilter = this.category[0];
            }
            else{
              this.category = [{category_id:0,category_name:"-- Choose Category --"}];
              this.cagegoryname = this.category[0].category_id;
              this.categoryfilter = this.category[0];
            }
          alert("Edit Success!");
          this.clearExpense();
        },
        error => {
          alert("Error editing expense!  Contact with site admin.");
          return Observable.throw(error);
        }
      );
    }
    else{
      alert("Please Fill Completely.");
      this.finishedVal = false;
    }    
  }
 
  deleteExpense(exp) {
    if (confirm("Are you sure you want to delete " + exp.exp_description + "?")) {
    let deleteexp = {fromd: this.datePipe.transform(this.expfromdatefilter,"MM/dd/yyyy"),
    tod: this.datePipe.transform(this.exptodatefilter,"MM/dd/yyyy"),
    expense_id:exp.expense_id,btn:'delete'}
      this.expenseService.deleteExpense(deleteexp).subscribe(
         data => {
           deleteexp = null;
           if(data.exp != "No Record") {
            this.data = data.exp;
            this.data1 = data.exp;
          }
          else{
            this.data = [];
            this.data1 = [];
          }
          if (data.cate != "No Record") {
              this.category = data.cate;
              this.category.splice(0, 0, {category_id:0,category_name:"-- Choose Category --"});
              this.cagegoryname = this.category[0].category_id;
              this.categoryfilter = this.category[0];
            }
            else{
              this.category = [{category_id:0,category_name:"-- Choose Category --"}];
              this.cagegoryname = this.category[0].category_id;
              this.categoryfilter = this.category[0];
            }
          alert("Delete Success!");
         },
         error => {
           alert("Error deleting Expense!  Contact with site admin.");
           return Observable.throw(error);
         }
      );
    }
  }

  clearExpense() {
   this.expense_name = null;
   this.expense_amt = null;
   this.expense_remark = "";
   this.saveVal = false;
   this.setupVal = true;
   this.hideVal = true;
   this.finishedVal = false;
  }

  assignCopy(){
   this.data = Object.assign([], this.data1);
   for (var i = this.data.length - 1; i >= 0; i--) {
      this.exptotal += parseFloat(this.data[i].amount);
    }
  }

 /* filterItem(value){
   if(value.length == 0) {
     this.assignCopy();
   }
   else{    
    var incdate = this.datePipe.transform(value,"MM/dd/yyyy");
         this.data = Object.assign([], this.data1).filter(
          //  item => item.category_name.toLowerCase().indexOf(this.offdatefilter.toLowerCase()) > -1
           item => item.exp_date.indexOf(incdate) > -1            
         )
     }      
  }*/

  filterItem(aa,catefilter,expdatefilter){
  this.categoryfilterval = aa;
   if(catefilter == null && expdatefilter.length == 0) {
     this.assignCopy();
   }
   else{    
      var exp1;
      var exp2;
      this.exptotal = 0;
      
      if (catefilter == 0) {
        catefilter = "";
      }
      if (expdatefilter.length != 0) {
        expdatefilter = this.datePipe.transform(expdatefilter,"MM/dd/yyyy");
      }
      else{
        expdatefilter = "";
      }
        
         exp1 = Object.assign([], this.data1).filter(
            item => item.category_id.toLowerCase().indexOf(catefilter.toLowerCase()) > -1
         )
         exp2 = Object.assign([], exp1).filter(
            item => item.exp_date.indexOf(expdatefilter) > -1
         )
         this.data = exp2;

         for (var i = this.data.length - 1; i >= 0; i--) {
          this.exptotal += parseFloat(this.data[i].amount);
        }
     }      
  }

}
