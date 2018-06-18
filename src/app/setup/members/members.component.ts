import { Component, OnInit, ElementRef } from '@angular/core';
import { MembersService } from './members.service';
import { Observable }     from 'rxjs/Observable';
import { commonRouteUrl } from 'app/app.service';
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-members',
  host: {
        '(document:click)': 'handleClick($event)',
    },
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
  providers: [MembersService,commonRouteUrl,DatePipe]
})
export class MembersComponent implements OnInit {
public data: any[];
public data1: any[];
public new_mbr = "";
public phone = "";
public gender = "1";
public saveVal = false;
public passVal = false;
public memberid;
public regdate = this.datePipe.transform(new Date(),"yyyy-MM-dd");
public mbregdate = this.datePipe.transform(new Date(),"yyyy-MM-dd");
public startdate = this.datePipe.transform(new Date(),"yyyy-MM-dd");
public enddate = this.datePipe.transform(new Date(),"yyyy-MM-dd");
public dob = this.datePipe.transform(new Date(),"yyyy-MM-dd");
public setupVal = true;
public memberlist = true;
public regVal = true;
public hideVal = true;
public proVal = true;
public finishedVal = false;
public membertype;
public membertypes;
public promo;
public promotions;
public totalamt = 0;
public voucher = "";
public incomedes = "Register Income";
public remark = "";
public weight = "";
public height = "";
public target = "";
public measure = "";
public remarksetup = "";
public injury = "";
public work = "";
public address = "";
public recentgym = "no";
public prodescription = null;
public mbrname;
public namefilter = null;
public idfilter = null;
public regdatefilter = "";
public genderfilter = "";
public activembr = "";

public filterQuery = "";
public rowsOnPage = 5;
public sortBy = "income_date";
public sortOrder = "asc";

public mbrlist;
public registermbr;
public totalmbr;
public addmbrVal = false;
public query = '';
public selected = [];
public filteredList = [];
public elementRef;
selectedIdx: number;

  constructor(myElement: ElementRef,private membersService: MembersService, private userdata: commonRouteUrl, private router: Router, private datePipe:DatePipe) { 
    this.elementRef = myElement;
    this.selectedIdx = -1;
  }

  filter(event: any) {
      if (this.query !== "") {
          this.filteredList = this.mbrlist.filter(function (el) {
              return el.member_name.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
          }.bind(this));
          if (event.code == "ArrowDown" && this.selectedIdx < this.filteredList.length) {
              this.selectedIdx++;
          } else if (event.code == "ArrowUp" && this.selectedIdx > 0) {
              this.selectedIdx--;
          }
      } else {
          this.filteredList = [];
      }
  }

  select(item) {
    this.selected.push({"member_id":item.member_id,"member_name":item.member_name});
    this.query = '';
    this.filteredList = [];
    if(this.selected.length == (this.totalmbr-1) || this.selected.length > (this.totalmbr-1)){
      this.addmbrVal = true;
    }
  }

  handleBlur() {
     if(this.selectedIdx > -1){
        this.query = this.filteredList[this.selectedIdx];
      }
      this.filteredList = [];
      this.selectedIdx = -1;
  }

  handleClick(event) {
      var clickedComponent = event.target;
      var inside = false;
      do {
          if (clickedComponent === this.elementRef.nativeElement) {
              inside = true;
          }
          clickedComponent = clickedComponent.parentNode;
      } while (clickedComponent);
      if (!inside) {
          this.filteredList = [];
      }
      this.selectedIdx = -1;
  }

  remove(item){
    this.selected.splice(this.selected.indexOf(item),1);
    if(this.selected.length < (this.totalmbr-1)){
      this.addmbrVal = false;
    }
  }
  
  ngOnInit() {
    if(this.userdata.roleId == "1"){
      return this.membersService.getMembers().subscribe(data => {
      if(data.members != "No Record") {
          this.data = data.members;
          this.data1 = data.members;
          this.mbrlist = data.members;          
        }
        else{
          this.data = [];
        }
        
       if (data.membertypes != "No Record") {
          this.membertypes = data.membertypes;
          this.membertypes.splice(0, 0, {mbr_type_id:0,mbr_type_name:"-- Choose Member Type --"});
          this.membertype = this.membertypes[0].mbr_type_id;
        }
        else{
            this.membertypes = [{mbr_type_id:0,mbr_type_name:"-- Choose Member Type --"}];
            this.membertype = this.membertypes[0].mbr_type_id;
          }

          if (data.promotions != "No Record") {
          this.promotions = data.promotions;
          this.promotions.splice(0, 0, {promotion_id:0,pro_name:"-- Choose Promotion --"});
          this.promo = this.promotions[0];
        }
        else{
            this.promotions = [{promotion_id:0,pro_name:"-- Choose Promotion --"}];
            this.promo = this.promotions[0];
          }
      });
    }
    else{
      this.router.navigate(['/']);
    }  
  }

  datechange(){
    let datech = {datech:this.datePipe.transform(this.regdate,"MM/dd/yyyy"), btn:"datech"};
    this.membersService.datechangeMembers(datech).subscribe(      
          data => {        
          console.log(data);    
            this.registermbr = null;          
           if (data.promotions != "No Record") {
              this.promotions = data.promotions;
              this.promotions.splice(0, 0, {promotion_id:0,pro_name:"-- Choose Promotion --"});
              this.promo = this.promotions[0];
            }
            else{
                this.promotions = [{promotion_id:0,pro_name:"-- Choose Promotion --"}];
                this.promo = this.promotions[0];
              }                      
          },
          error => {
            alert("Error catch promotions");
            return Observable.throw(error);
          }
        );
  }

  registerMember() {
    this.finishedVal = true;
    if(this.startdate != "" && this.enddate != "" && this.regdate != "") {
      if (this.startdate>this.enddate) {
        alert("Please, choose correct date values");
      }
      else{
        if(this.promo.pro_type == "member") {
          if (this.selected.length == (this.totalmbr-1)) {
            this.registermbr = {mbrid:this.memberid, startdate:this.datePipe.transform(this.startdate,"MM/dd/yyyy"), 
            enddate:this.datePipe.transform(this.enddate,"MM/dd/yyyy"),regdate:this.datePipe.transform(this.regdate,"MM/dd/yyyy"), 
            des:this.incomedes, membertype:this.membertype, promotion:this.promo.promotion_id, mbrlist:this.selected, 
            totalamt:this.totalamt, remark:this.remark, voucher:this.voucher, btn:"register"};
            this.realregister(this.registermbr);
          }
          else{
            alert("Please, select Additional Members correctly!");
          }          
        }
        else{
          this.registermbr = {mbrid:this.memberid, startdate:this.datePipe.transform(this.startdate,"MM/dd/yyyy"), 
          enddate:this.datePipe.transform(this.enddate,"MM/dd/yyyy"),regdate:this.datePipe.transform(this.regdate,"MM/dd/yyyy"), 
          des:this.incomedes, membertype:this.membertype, promotion:this.promo.promotion_id, totalamt:this.totalamt, 
          remark:this.remark, voucher:this.voucher, btn:"register"};
          this.realregister(this.registermbr);
        }        
      }      
    }
    else{
      alert("Please Fill Completely.");
      this.finishedVal = false;
    }
  }

  realregister(aa){
    this.membersService.registerMembers(aa).subscribe(      
          data => {            
            this.registermbr = null;          
            if(data.members != "No Record") {
              this.data = data.members;            
            }
            else{
              this.data = [];
            }
            if (data.membertypes != "No Record") {
              this.membertypes = data.membertypes;
              this.membertypes.splice(0, 0, {mbr_type_id:0,mbr_type_name:"-- Choose Member Type --"});
              this.membertype = this.membertypes[0].mbr_type_id;
            }
            else{
                this.membertypes = [{mbr_type_id:0,mbr_type_name:"-- Choose Member Type --"}];
                this.membertype = this.membertypes[0].mbr_type_id;
              }   

            if (data.duplicate == "duplicate") {
              alert("Duplicate Register.");
              this.finishedVal = false;
              this.proVal = true;
            }
            else{
              alert("Register Success!");
              this.clearRegister(); 
            }                          
          },
          error => {
            alert("Error registration! Please check your data or contact with site admin.");
            return Observable.throw(error);
          }
        );
  }

  mbrtypechange(a){    
    if(a == 3){
      this.proVal = false;
    }
    else{
      this.proVal = true;
      this.promo = this.promotions[0];
      this.prodescription = null;
      this.memberlist = true;
    }
  }

  promochange(a){
  //  console.log(a);
    if (a.promotion_id == 0) {
      this.prodescription = null;
    }
    else{
      this.prodescription = a.pro_description;
      if(a.pro_type == "member"){
        this.memberlist = false;
      }
      else{
        this.memberlist = true;
        this.selected = [];
      }
      var nn = a.pro_num.split(",");
       this.totalmbr = parseInt(nn[0])+parseInt(nn[1]);
    }    
  }

  showsetup(){
    this.setupVal = false;
    this.hideVal = false;
    this.finishedVal = false;
  }

  mbregister(mbr) {
    this.memberid = mbr.member_id;
    this.mbrname = mbr.member_name;
    this.regVal = false;
    this.hideVal = false;
    this.finishedVal = true;
  }

  createMember() {
    this.finishedVal = true;
    if(this.new_mbr!=null && this.new_mbr!='' && this.new_mbr!=undefined){
      
      let member = {gender:this.gender, phone:this.phone,membername: this.new_mbr, 
      reg_date: this.datePipe.transform(this.mbregdate,"MM/dd/yyyy"), 
      dob:this.datePipe.transform(this.dob,"MM/dd/yyyy"), 
      target: this.target, measure:this.measure, recgym: this.recentgym, 
      injury:this.injury, remark:this.remarksetup, work:this.work, address:this.address, btn:'save'};

      this.membersService.createMembers(member).subscribe(      
        data => {
          member = null;
          if(data.members != "No Record") {
            this.data = data.members;
            
          }
          else{
            this.data = [];
          }
          if (data.membertypes != "No Record") {
            this.membertypes = data.membertypes;
            this.membertypes.splice(0, 0, {mbr_type_id:0,mbr_type_name:"-- Choose Member Type --"});
            this.membertype = this.membertypes[0].mbr_type_id;
          }
          else{
              this.membertypes = [{mbr_type_id:0,mbr_type_name:"-- Choose Member Type --"}];
              this.membertype = this.membertypes[0].mbr_type_id;
            }
          alert("Save Success!");
          this.clearMember();          
        },
        error => {
          alert("Error saving member! Please check your data or contact with site admin.");
          return Observable.throw(error);
        }
      );
    }
    else{
      alert("Please Fill Completely.");
      this.finishedVal = false;
    }   
  }
 
  editMember(mbr) {
  this.showsetup();
  this.new_mbr = mbr.member_name;
  this.memberid = mbr.member_id;
  this.saveVal = true;
  this.finishedVal = false;
  this.phone = mbr.phone;
  this.mbregdate = this.datePipe.transform(mbr.register_date,"yyyy-MM-dd");
  this.dob = this.datePipe.transform(mbr.dob,"yyyy-MM-dd");  
  this.target = mbr.target;
  this.recentgym = mbr.recent_gym;
  this.gender = mbr.gender;
  this.injury = mbr.injury;
  this.remarksetup = mbr.remark;
  this.address = mbr.address;
  this.work = mbr.work;
  this.measure = mbr.measure;
  }

  updateMember() {
    this.finishedVal = true;
    if(this.new_mbr!=null && this.new_mbr!='' && this.new_mbr!=undefined){

      let updateuser = {memberid:this.memberid,gender:this.gender, phone:this.phone,membername: this.new_mbr, 
      reg_date: this.datePipe.transform(this.mbregdate,"MM/dd/yyyy"), 
      dob:this.datePipe.transform(this.dob,"MM/dd/yyyy"), 
      target: this.target, measure:this.measure, recgym: this.recentgym, 
      injury:this.injury, remark:this.remarksetup, work:this.work, address:this.address, btn:'edit'};
      this.membersService.updateMembers(updateuser).subscribe(
        data => {
          updateuser = null;
          if(data.members != "No Record") {
            this.data = data.members;
            
          }
          else{
            this.data = [];
          }
          if (data.membertypes != "No Record") {
            this.membertypes = data.membertypes;
            this.membertypes.splice(0, 0, {mbr_type_id:0,mbr_type_name:"-- Choose Member Type --"});
            this.membertype = this.membertypes[0].mbr_type_id;
          }
          else{
              this.membertypes = [{mbr_type_id:0,mbr_type_name:"-- Choose Member Type --"}];
              this.membertype = this.membertypes[0].mbr_type_id;
            }
          alert("Edit Success!");
          this.clearMember();
        },
        error => {
          alert("Error saving member! Please check your data or contact with site admin.");
          return Observable.throw(error);
        }
      );
    }
    else{
      alert("Please Fill Completely.");
      this.finishedVal = false;
    }    
  }
 
  deleteMember(mbr) {
    if (confirm("Are you sure you want to delete " + mbr.member_name + "?")) {
    let deletembr = {memberid: mbr.member_id, btn:'delete'}
      this.membersService.deleteMembers(deletembr).subscribe(
         data => {
           mbr = null;
           if(data.members != "No Record") {
            this.data = data.members;
            
          }
          else{
            this.data = [];
          }
          if (data.membertypes != "No Record") {
            this.membertypes = data.membertypes;
            this.membertypes.splice(0, 0, {mbr_type_id:0,mbr_type_name:"-- Choose Member Type --"});
            this.membertype = this.membertypes[0].mbr_type_id;
          }
          else{
              this.membertypes = [{mbr_type_id:0,mbr_type_name:"-- Choose Member Type --"}];
              this.membertype = this.membertypes[0].mbr_type_id;
            }
          alert("Delete Success!");
         },
         error => {
           alert("Error deleting user!  Contact with site admin.");
           return Observable.throw(error);
         }
      );
    }
  }

  clearMember() {
   this.passVal = false;
   this.new_mbr = null;
   this.saveVal = false;
   this.setupVal = true;
   this.hideVal = true;   
   this.finishedVal = true;

   this.phone = "";
   this.gender = "1";
   this.recentgym = "no";
   this.memberid = null;
   this.mbregdate = this.datePipe.transform(new Date(),"yyyy-MM-dd");
   this.dob = this.datePipe.transform(new Date(),"yyyy-MM-dd");   
   this.target = "";
   this.address = "";
   this.work = "";
   this.injury = "";
   this.remarksetup = "";
   this.measure = "";
  }

  clearRegister() {
   this.regVal = true;
   this.hideVal = true;
   this.proVal = true;
   this.finishedVal = false;
   this.totalamt = 0;
   this.incomedes = "Register Income";
   this.memberid = null;
   this.membertype = 0;
   this.promo = this.promotions[0];
   this.prodescription = null;
   this.remark = null;
   this.regdate = this.datePipe.transform(new Date(),"yyyy-MM-dd");
   this.startdate = this.datePipe.transform(new Date(),"yyyy-MM-dd");
   this.enddate = this.datePipe.transform(new Date(),"yyyy-MM-dd");
   this.selected = [];
   this.memberlist = true;
   this.voucher = "";
  }

  assignCopy(){
   this.data = Object.assign([], this.data1);
  }

  filterItem(){
  
   if(this.genderfilter == "" && this.activembr == "" && this.namefilter == null && this.idfilter == null && this.regdatefilter.length == 0) {
     this.assignCopy();
   }
   else{    
      var exp1;
      var exp2;
      var exp3;
      var exp4;
      var exp5;
      
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
         exp4 = Object.assign([], exp3).filter(
            item => item.mbr_end.indexOf(this.activembr) > -1
         )
         exp5 = Object.assign([], exp4).filter(
            item => item.gender.indexOf(this.genderfilter) > -1
          // item => item.gender.toLowerCase().indexOf(this.genderfilter.toLowerCase(),true) > -1
         )
        
         this.data = exp5;

     }      
  }

  
}
