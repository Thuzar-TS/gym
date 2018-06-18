import { Component, OnInit } from '@angular/core';
import { PromotiontypeService } from './promotiontype.service';
import { Observable }     from 'rxjs/Observable';
import { commonRouteUrl } from 'app/app.service';
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-promotiontype',
  templateUrl: './promotiontype.component.html',
  styleUrls: ['./promotiontype.component.scss'],
  providers: [PromotiontypeService,commonRouteUrl,DatePipe]
})
export class PromotiontypeComponent implements OnInit {
public data: any[];
public data1: any[];
public saveVal = false;
public setupVal = true;
public hideVal = true;
public protype = 'day';
public proid;
public num_day;
public num_per;
public num_amt;
public reg_member;
public free_member;
public pro_name = "";
public from_date = this.datePipe.transform(new Date(),"yyyy-MM-dd");
public to_date = this.datePipe.transform(new Date(),"yyyy-MM-dd");
public pro_description = "";
public remark = "";
private pro;
public protypefilter = "";
public namefilter = null;
public fromfilter = "";
public tofilter ="";
public typeradio = false;
public promotiontypelbl = "";
public searchdate;

public filterQuery = "";
public rowsOnPage = 5;
public sortBy = "income_date";
public sortOrder = "asc";

  constructor(private promoService: PromotiontypeService, private userdata: commonRouteUrl, private router: Router, private datePipe:DatePipe) { }

   ngOnInit() {
     if(this.userdata.roleId == "1"){
      return this.promoService.getPromotion().subscribe(data => {
        if(data.promotion != "No Record") {
          this.data = data.promotion;
          this.data1 = data.promotion;
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

  createPromotion() {
    if(this.pro_name!=null && this.pro_name!='' && this.pro_name!=undefined){
      if (this.from_date>this.to_date) {
        alert("Please, choose correct date values.");
      }
      else{
        if(this.protype == "day") {
          if (this.num_day != "" && this.num_day != 0 && this.num_day != null) {
            this.pro = {proname: this.pro_name, protype:this.protype, num:this.num_day, fromdate:this.datePipe.transform(this.from_date,"MM/dd/yyyy"), 
            todate:this.datePipe.transform(this.to_date,"MM/dd/yyyy"), prodes:this.pro_description, remark:this.remark, btn:'save'};
            this.sendData(this.pro);
          }
          else{
            alert("Please Insert Promotion Days!");
          }           
        }
        else if (this.protype == "amount") {
          if (this.num_amt == null && this.num_per == null) {
             alert("Please Insert Discount % or Amount!");
          }
          else{
            if(this.num_amt == null){
              this.num_amt = 0;
            }
            if(this.num_per == null){
              this.num_per = 0;
            }

            this.pro = {proname: this.pro_name, protype:this.protype, numper:this.num_per, numamt:this.num_amt, fromdate:this.datePipe.transform(this.from_date,"MM/dd/yyyy"), 
            todate:this.datePipe.transform(this.to_date,"MM/dd/yyyy"), prodes:this.pro_description, remark:this.remark, btn:'save'};
            this.sendData(this.pro);
          }          
        }
        else if (this.protype == "member") {
          if (this.reg_member != null && this.free_member != null) {
            if(this.reg_member == null){
              this.reg_member = 0;
            }
            if(this.free_member == null){
              this.free_member = 0;
            }
            this.pro = {proname: this.pro_name, protype:this.protype, regmbr:this.reg_member, freembr:this.free_member, fromdate:this.datePipe.transform(this.from_date,"MM/dd/yyyy"), 
            todate:this.datePipe.transform(this.to_date,"MM/dd/yyyy"), prodes:this.pro_description, remark:this.remark, btn:'save'};
            this.sendData(this.pro);
          }
          else{
            alert("Please Insert Register Member and Free Member Completely!");
          }
        }        
      }      
    }
    else{
      alert("Please Fill Completely.");
    }   
  }

  sendData(aa){
    this.promoService.createPromotion(aa).subscribe(
          data => {
            this.pro = null;
            if(data.promotion != "No Record") {
              this.data = data.promotion;
              this.data1 = data.promotion;
              this.pro_name = null;
            }
            else{
              this.data = [];
              this.data1 = [];
            }  
            alert("Success!");
            this.clearPromotion();          
          },
          error => {
            alert("Error, please Check your Data! Contact with site admin");
            return Observable.throw(error);
          }
        );
  }

  radioChange(a) {
   //
  }

  showsetup(){
    this.setupVal = false;
    this.hideVal = false;
    this.typeradio = false;
  }

   
  editPromotion(pro) {
   this.proid = pro.promotion_id;
   this.pro_name = pro.pro_name;
   this.protype = pro.pro_type;
   this.typeradio = true;
   this.promotiontypelbl = pro.pro_type;
   if (pro.pro_type == "day") {
     this.num_day = parseInt(pro.pro_num);
   }
   else if(pro.pro_type == "amount") {
     var nn = pro.pro_num.split(",");
     if(nn[1] == "per") {
      this.num_per = parseInt(nn[0]);
     }
     else if(nn[1] == "amt") {
      this.num_amt = parseInt(nn[0]);
     }
   }
   else if(pro.pro_type == "member") {
     var nn = pro.pro_num.split(",");
     this.reg_member = nn[0];
     this.free_member = nn[1];
   }
   
   this.pro_description = pro.pro_description;
   this.remark = pro.remark;
   
   this.from_date = this.datePipe.transform(pro.from_date,"yyyy-MM-dd");
   this.to_date = this.datePipe.transform(pro.to_date,"yyyy-MM-dd");
   
   this.saveVal = true;
   this.setupVal = false;
   this.hideVal = false;
  }

  updatePromotion() {
    if(this.pro_name!=null && this.pro_name!='' && this.pro_name!=undefined){

      if(this.protype == "day") {
         this.pro = {proid:this.proid, proname: this.pro_name, protype:this.protype, num:this.num_day, fromdate:this.datePipe.transform(this.from_date,"MM/dd/yyyy"), 
          todate:this.datePipe.transform(this.to_date,"MM/dd/yyyy"), prodes:this.pro_description, remark:this.remark, btn:'edit'};
      }
      else if (this.protype == "amount") {
        if(this.num_amt == null){
          this.num_amt = 0;
        }
        else if(this.num_per == null){
          this.num_per = 0;
        }
        this.pro = {proid:this.proid, proname: this.pro_name, protype:this.protype, numper:this.num_per, numamt:this.num_amt, fromdate:this.datePipe.transform(this.from_date,"MM/dd/yyyy"), 
          todate:this.datePipe.transform(this.to_date,"MM/dd/yyyy"), prodes:this.pro_description, remark:this.remark, btn:'edit'};
      }
      else if (this.protype == "member") {
        this.pro = {proid:this.proid, proname: this.pro_name, protype:this.protype, regmbr:this.reg_member, freembr:this.free_member, fromdate:this.datePipe.transform(this.from_date,"MM/dd/yyyy"), 
          todate:this.datePipe.transform(this.to_date,"MM/dd/yyyy"), prodes:this.pro_description, remark:this.remark, btn:'edit'};
      }      
   
      this.promoService.updatePromotion(this.pro).subscribe(
        data => {
          this.pro = null;
          if(data.promotion != "No Record") {
            this.data = data.promotion;
            this.data1 = data.promotion;
            this.pro_name = null;
          }
          else{
            this.data = [];
            this.data1 = [];
          }  
          alert("Successfully Edited!");
          this.clearPromotion();          
        },
        error => {
          alert("Error, please Check your Data! Contact with site admin");
          return Observable.throw(error);
        }
      );
    }
    else{
      alert("Please Fill Completely.");
    }    
  }
 
  deletePromotion(pro) {
    if (confirm("Are you sure you want to delete " + pro.pro_name + "?")) {
    let deletecate = {proid: pro.promotion_id, btn:'delete'}
      this.promoService.deletePromotion(deletecate).subscribe(
         data => {
           deletecate = null;
           if (data.can == "cannot") {
             alert("Cannot Delete! There're some transactions.");
           }
           else{
             alert("Successfully Deleted.");
           }
           if(data.promotion != "No Record") {
            this.data = data.promotion;
            this.data1 = data.promotion;
          }
          else{
            this.data = [];
            this.data1 = [];
          }
          this.clearPromotion();      
         },
         error => {
           alert("Error Deleting!");
           return Observable.throw(error);
         }
      );
    }
  }

  clearPromotion() {
   this.pro_name = null;
   this.saveVal = false;
   this.setupVal = true;
   this.hideVal = true;
   this.pro_name = null;
   this.protype = "day";
   this.reg_member = null;
   this.free_member = null;
   this.pro_description = null;
   this.remark = null;
   this.num_day = null;
   this.num_per = null;
   this.num_amt = null;   
   this.from_date = this.datePipe.transform(new Date(),"yyyy-MM-dd");
   this.to_date = this.datePipe.transform(new Date(),"yyyy-MM-dd");
  }

  assignCopy(){
   this.data = Object.assign([], this.data1);
  }

  searchDate(a,b,c){
    if (c == "" || c == null) {
      this.searchdate = {name: a, protype:b, date: "all", btn:'searchdate'};
    }
    else{
      this.searchdate = {name: a, protype:b, date: this.datePipe.transform(c,"MM/dd/yyyy"), btn:'searchdate'}
    }
    
      this.promoService.searchDate(this.searchdate).subscribe(
         data => {
           this.searchdate = null;
          
           if(data.promotion != "No Record") {
            this.data = data.promotion;
            this.data1 = data.promotion;
          }
          else{
            this.data = [];
            this.data1 = [];
          }
         },
         error => {
           alert("Error searching !");
           return Observable.throw(error);
         }
      );
  }

  filterItem(namefilter,protypefilter){
  
   if(namefilter == null && protypefilter == null) {
     this.assignCopy();
   }
   else{    
      var exp1;
      var exp2;
      var exp3;
      var exp4;      
      
      if (namefilter == null) {
        namefilter = "";
      }
      if (protypefilter == null) {
        protypefilter = "";
      }
     /* if (fromfilter.length != 0) {
        fromfilter = this.datePipe.transform(fromfilter,"MM/dd/yyyy");
      }
      else{
        fromfilter = "";
      }*/
     /* if (tofilter.length != 0) {
        tofilter = this.datePipe.transform(tofilter,"MM/dd/yyyy");
      }
      else{
        tofilter = "";
      }*/
    
         exp1 = Object.assign([], this.data1).filter(
            item => item.pro_type.toLowerCase().indexOf(protypefilter.toLowerCase()) > -1
         )
         exp2 = Object.assign([], exp1).filter(
            item => item.pro_name.toLowerCase().indexOf(namefilter.toLowerCase()) > -1
         )
         /*exp3 = Object.assign([], exp2).filter(
            item => item.from_date.indexOf(fromfilter) > -1
         )
         exp4 = Object.assign([], exp3).filter(
            item => item.to_date.indexOf(tofilter) > -1
         )*/
         this.data = exp2;

     }      
  }

}
