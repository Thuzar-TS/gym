import { Component, OnInit } from '@angular/core';
import { DailyactionService } from './dailyaction.service';
import { Observable }     from 'rxjs/Observable';
import { commonRouteUrl } from 'app/app.service';

import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-dailyaction',
  templateUrl: './dailyaction.component.html',
  styleUrls: ['./dailyaction.component.scss'],
  providers: [DailyactionService,commonRouteUrl,DatePipe]
})

export class DailyactionComponent implements OnInit {
@ViewChild('fileinput') 
el : ElementRef; 

public data: any[];
public data1: any[];

public alertdata: any[];
public alertdata1: any[];
public alertdes = "";
public xx;
public dailyid=0;

public saveVal = false;
public passVal = true;
public setupVal = true;
public alertVal = true;
public hideVal = true;
public photoVal = true;
public actionid;
public alertid;
public mbrid;
public mbr;
public armfile;
//public form = new FormData();
public formData:FormData = new FormData();

public actiondate = this.datePipe.transform(new Date(),"yyyy-MM-dd");
public alertdate = this.datePipe.transform(new Date(),"yyyy-MM-dd");
public week = "";
public days = [{day_id:0,day:"-- Days --"},{day_id:1,day:"Day One"},{day_id:2,day:"Day Two"},{day_id:3,day:"Day Three"},
{day_id:4,day:"Day Four"},{day_id:5,day:"Day Five"},{day_id:6,day:"Day Six"},{day_id:7,day:"Day Seven"}];
public day = 0;
public training = 0;
public trainings;
public trainer = 0;
public trainers;
public photo = "";
public weight = "";
public height = "";
public measure = "";
public chest = "";
public arm = "";
public waist = "";
public thigh = "";
public glute = "";
public calf = "";

public filterQuery = "";
public rowsOnPage = 10;
public rowsOnPage1 = 5;
public sortBy = "income_date";
public sortOrder = "asc";
public mbfromdatefilter = "";
public mbtodatefilter = "";
public trainingfilter = 0;
public trainerfilter = 0;
public routeurl = this.userdata.commonroute;

uploadFile="";
orname = "";
  hasBaseDropZoneOver: boolean = false;
  options: Object = {
    url: this.userdata.commonroute+'dailyalertupload.php'
  };
  sizeLimit = 2000000;
 
  handleUpload(data): void {
    if (data && data.response) {
      data = JSON.parse(data.response);
      if (this.uploadFile == "") {
        this.uploadFile = data["generatedName"];
        this.orname = data["originalName"];
      }
      else{
        this.uploadFile = this.uploadFile+","+data["generatedName"];
        this.orname = this.orname+","+data["originalName"];
      }
      
    //  this.uploadFile.push({"generatedname":data["generatedName"],"originalname":data["originalName"]});
    }
  }
 
  fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  beforeUpload(uploadingFile): void {
    if (uploadingFile.size > this.sizeLimit) {
      uploadingFile.setAbort();
      alert('File is too large');
    }
  }

  constructor(private elementRef: ElementRef,private route: ActivatedRoute,private cateService: DailyactionService, public userdata: commonRouteUrl, private router: Router, private datePipe:DatePipe) { }

   ngOnInit() {
     this.mbrid = this.route.snapshot.params['id'];
     if(this.userdata.roleId == "1"){
      let filterdate = {fromd: this.datePipe.transform(this.mbfromdatefilter,"MM/dd/yyyy"),tod: this.datePipe.transform(this.mbtodatefilter,"MM/dd/yyyy"), btn:""}
      return this.cateService.getDailyaction(filterdate,this.mbrid).subscribe(data => {
        this.mbr = data.memberinfo;
        if(data.actions != "No Record") {
          this.data = data.actions;
          this.data1 = data.actions;
        }
        else{
          this.data = [];
          this.data1 = [];
        }

        if(data.training != "No Record") {
          this.trainings = data.training;
          this.trainings.splice(0, 0, {training_id:0,training_description:"-- Choose Training --"});
          this.training = this.trainings[0].training_id;
        }
        else{
          this.trainings = [{training_id:0, training_description:"-- No Training --"}];
          this.training = this.trainings[0].training_id;
        }
        
        if(data.trainers != "No Record") {
          this.trainers = data.trainers;
          this.trainers.splice(0, 0, {trainer_id:0,trainer_name:"-- Choose Trainer --"});
          this.trainer = this.trainers[0].trainer_id;
        }
        else{
          this.trainers = [{trainer_id:0, trainer_name:"-- No Trainer --"}];
          this.trainer = this.trainers[0].trainer_id;
        }            

        this.assignCopy();
      });
      
     }
     else{
      this.router.navigate(['/']);
     }      
  }

  showPhoto(a,b){
    
    this.hideVal = false;
    this.photoVal = false;
    if(a == "" || a == null){
      this.xx = [];
    }
    else{
      this.xx = a.split(",");
      this.dailyid = b;
    }
  }

  deletePhoto(a){
    var con = confirm("Are you sure to delete this photo?");
    if(con == true){
      const index: number = this.xx.indexOf(a);
      if(index !== -1){
        this.xx.splice(index,1);
      }
      var str = this.xx.join(",");
      let deleteP = {fromd: this.datePipe.transform(this.mbfromdatefilter,"MM/dd/yyyy"),tod: this.datePipe.transform(this.mbtodatefilter,"MM/dd/yyyy"),
      photo:str, deletephoto:a, did:this.dailyid, btn:"photodelete"};
      return this.cateService.deletePhoto(deleteP,this.mbrid).subscribe(data => {
      this.mbr = data.memberinfo;
          if(data.actions != "No Record") {
          this.data = data.actions;
          this.data1 = data.actions;
        }
        else{
          this.data = [];
          this.data1 = [];
        }
        
        if(data.training != "No Record") {
          this.trainings = data.training;
          this.trainings.splice(0, 0, {training_id:0,training_description:"-- Choose Training --"});
          this.training = this.trainings[0].training_id;
        }
        else{
          this.trainings = [{training_id:0, training_description:"-- No Training --"}];
          this.training = this.trainings[0].training_id;
        }
        
        if(data.trainers != "No Record") {
          this.trainers = data.trainers;
          this.trainers.splice(0, 0, {trainer_id:0,trainer_name:"-- Choose Trainer --"});
          this.trainer = this.trainers[0].trainer_id;
        }
        else{
          this.trainers = [{trainer_id:0, trainer_name:"-- No Trainer --"}];
          this.trainer = this.trainers[0].trainer_id;
        }      
        alert("Deleted");
        },
        error => {
          alert("Error Deleting!  Contact with site admin.");
          return Observable.throw(error);
        });  
    }
    
  }

  showsetup(){
    this.setupVal = false;
    this.hideVal = false;
  }

  alertsetup(a){
    this.passVal = false;
    return this.cateService.getAlertaction(this.mbrid).subscribe(data => {
      if(data.dailyalert != "No Record") {
          this.alertdata = data.dailyalert; 
          this.alertdata1 = data.dailyalert;         
        }
        else{
          this.alertdata = [];
          this.alertdata1 = []; 
        }
      this.alertVal = false;
      this.hideVal = false;
    });    
  }

  daychange(a){
    if (a == 0) {
      this.passVal = true;
    }
    else{
      this.passVal = false;
    }
  }

  clearAction() { 
   this.saveVal = false;
   this.passVal = false;  
   this.setupVal = true;
   this.hideVal = true;  
   this.alertVal = true;
   this.photoVal = true;
  }

  createDailyaction() {
    if(this.day != 0){      
      let cate = {fromd: this.datePipe.transform(this.mbfromdatefilter,"MM/dd/yyyy"),tod: this.datePipe.transform(this.mbtodatefilter,"MM/dd/yyyy"),
      week:this.week, days:this.day, training:this.training, trainer:this.trainer, weight:this.weight, 
      height:this.height, actiondate: this.datePipe.transform(this.actiondate,"MM/dd/yyyy"),
      chest:this.chest, arm:this.arm, waist:this.waist, thigh:this.thigh, glute:this.glute, calf:this.calf, 
      org_name:this.orname, gen_name:this.uploadFile, btn:'save'};

      this.cateService.createDailyaction(cate,this.mbrid).subscribe(
        data => {
          this.mbr = data.memberinfo;
          cate = null;
          if(data.actions != "No Record") {
          this.data = data.actions;
          this.data1 = data.actions;
        }
        else{
          this.data = [];
          this.data1 = [];
        }
        
        if(data.training != "No Record") {
          this.trainings = data.training;
          this.trainings.splice(0, 0, {training_id:0,training_description:"-- Choose Training --"});
          this.training = this.trainings[0].training_id;
        }
        else{
          this.trainings = [{training_id:0, training_description:"-- No Training --"}];
          this.training = this.trainings[0].training_id;
        }
        
        if(data.trainers != "No Record") {
          this.trainers = data.trainers;
          this.trainers.splice(0, 0, {trainer_id:0,trainer_name:"-- Choose Trainer --"});
          this.trainer = this.trainers[0].trainer_id;
        }
        else{
          this.trainers = [{trainer_id:0, trainer_name:"-- No Trainer --"}];
          this.trainer = this.trainers[0].trainer_id;
        }      
        alert("Save Success.");
        this.clearDailyaction();      
        },
        error => {
          alert("Error saving Daily Action!  Contact with site admin.");
          return Observable.throw(error);
        }
      );
    }
    else{
      alert("Please Fill Days.");
    }   
  }

  createDailyalert(){
    let cate = {des:this.alertdes, alertdate: this.datePipe.transform(this.alertdate,"MM/dd/yyyy"), btn:"save"};
    this.cateService.createDailyalert(cate,this.mbrid).subscribe(
        data => {
          if(data.dailyalert != "No Record") {
          this.alertdata = data.dailyalert; 
          this.alertdata1 = data.dailyalert;         
        }
        else{
          this.alertdata = [];
          this.alertdata1 = []; 
        }
        alert("Success.");
        this.alertdate = this.datePipe.transform(new Date(),"yyyy-MM-dd");
        this.alertdes = "";
      })
  }

  editDailyalert(a){
    this.alertdate = this.datePipe.transform(a.alert_date,"yyyy-MM-dd");
    this.alertdes = a.alert_description;
    this.alertid = a.alert_list_id;
    this.passVal = false;
    this.saveVal = true;
  }

  updateDailyalert(){
    if (this.alertdate != "" && this.alertdate != null) {
      let cate = {alert_list_id:this.alertid,des:this.alertdes, alertdate: this.datePipe.transform(this.alertdate,"MM/dd/yyyy"), btn:"edit"};
      this.cateService.createDailyalert(cate,this.mbrid).subscribe(
          data => {
            if(data.dailyalert != "No Record") {
            this.alertdata = data.dailyalert; 
            this.alertdata1 = data.dailyalert;         
          }
          else{
            this.alertdata = [];
            this.alertdata1 = []; 
          }
        },
         error => {
           alert("Error deleting Action!  Contact with site admin.");
           return Observable.throw(error);
         }
      );
    }
    else{
      alert("Please insert Date.");
    }
  }

  deleteDailyalert(a){
    if (confirm("Are you sure you want to delete " + a.alert_date + "?")) {
    let deletecate = {alert_list_id: a.alert_list_id, btn:'delete'}
      this.cateService.createDailyalert(deletecate,this.mbrid).subscribe(
          data => {
            if(data.dailyalert != "No Record") {
            this.alertdata = data.dailyalert; 
            this.alertdata1 = data.dailyalert;         
          }
          else{
            this.alertdata = [];
            this.alertdata1 = []; 
          }
          alert("Deleted");
        },
         error => {
           alert("Error deleting Action!  Contact with site admin.");
           return Observable.throw(error);
         }
      );
    }
  }
 
  editDailyaction(cate) {
   this.passVal = false;
   this.setupVal = false;
   this.hideVal = false;
   this.saveVal = true;
   this.day = parseInt(cate.days);
   this.training = cate.training_id;
   this.trainer = cate.trainer_id;
   this.photo = "";
   this.week = cate.week;
   this.weight = cate.weight;
   this.height = cate.height;
   this.chest = cate.chest;
   this.arm = cate.arm;
   this.waist = cate.waist;
   this.thigh = cate.thigh;
   this.glute = cate.glute;
   this.calf = cate.calf;
   this.actionid = cate.daily_action_id;
   this.orname = cate.org_name;
   this.uploadFile = cate.gen_name;
  }

  updateDailyaction() {
    if(this.day != 0){ 
      let updatecate = {fromd: this.datePipe.transform(this.mbfromdatefilter,"MM/dd/yyyy"),tod: this.datePipe.transform(this.mbtodatefilter,"MM/dd/yyyy"),
      dailyaction_id:this.actionid, week:this.week, days:this.day, training:this.training, trainer:this.trainer, weight:this.weight, 
      height:this.height, actiondate: this.datePipe.transform(this.actiondate,"MM/dd/yyyy"),
      chest:this.chest, arm:this.arm, waist:this.waist, thigh:this.thigh, glute:this.glute, calf:this.calf, 
      org_name:this.orname, gen_name:this.uploadFile, btn:'edit'};
      this.cateService.updateDailyaction(updatecate,this.mbrid).subscribe(
        data => {
          this.mbr = data.memberinfo;
          updatecate = null;
          if(data.actions != "No Record") {
          this.data = data.actions;
          this.data1 = data.actions;
        }
        else{
          this.data = [];
          this.data1 = [];
        }
        
        if(data.training != "No Record") {
          this.trainings = data.training;
          this.trainings.splice(0, 0, {training_id:0,training_description:"-- Choose Training --"});
          this.training = this.trainings[0].training_id;
        }
        else{
          this.trainings = [{training_id:0, training_description:"-- No Training --"}];
          this.training = this.trainings[0].training_id;
        }
        
        if(data.trainers != "No Record") {
          this.trainers = data.trainers;
          this.trainers.splice(0, 0, {trainer_id:0,trainer_name:"-- Choose Trainer --"});
          this.trainer = this.trainers[0].trainer_id;
        }
        else{
          this.trainers = [{trainer_id:0, trainer_name:"-- No Trainer --"}];
          this.trainer = this.trainers[0].trainer_id;
        }
         alert("Edit Success.");
          this.clearDailyaction();          
        },
        error => {
          alert("Error saving Action!  Contact with site admin.");
          return Observable.throw(error);
        }
      );
    }
    else{
      alert("Please Fill Days.");
    }    
  }
 
  deleteDailyaction(cate) {
    if (confirm("Are you sure you want to delete " + cate.action_date + "?")) {
    let deletecate = {fromd: this.datePipe.transform(this.mbfromdatefilter,"MM/dd/yyyy"),tod: this.datePipe.transform(this.mbtodatefilter,"MM/dd/yyyy"),
    dailyaction_id: cate.daily_action_id, btn:'delete'}
      this.cateService.deleteDailyaction(deletecate,this.mbrid).subscribe(
         data => {
           this.mbr = data.memberinfo;
           deletecate = null;
           if(data.actions != "No Record") {
          this.data = data.actions;
          this.data1 = data.actions;
        }
        else{
          this.data = [];
          this.data1 = [];
        }
        
        if(data.training != "No Record") {
          this.trainings = data.training;
          this.trainings.splice(0, 0, {training_id:0,training_description:"-- Choose Training --"});
          this.training = this.trainings[0].training_id;
        }
        else{
          this.trainings = [{training_id:0, training_description:"-- No Training --"}];
          this.training = this.trainings[0].training_id;
        }
        
        if(data.trainers != "No Record") {
          this.trainers = data.trainers;
          this.trainers.splice(0, 0, {trainer_id:0,trainer_name:"-- Choose Trainer --"});
          this.trainer = this.trainers[0].trainer_id;
        }
        else{
          this.trainers = [{trainer_id:0, trainer_name:"-- No Trainer --"}];
          this.trainer = this.trainers[0].trainer_id;
        }
         },
         error => {
           alert("Error deleting Action!  Contact with site admin.");
           return Observable.throw(error);
         }
      );
    }
  }

  clearDailyalert(){
    this.alertdate = this.datePipe.transform(new Date(),"yyyy-MM-dd");
    this.alertdes = "";
    this.alertid = "";
    this.saveVal = false;
  }

  clearDailyaction() {
   this.saveVal = false;
   this.passVal = true;
   this.setupVal = true;
   this.hideVal = true;
   this.week = "";
   this.day = 0;
   this.training = 0;
   this.trainer = 0;
   this.photo = "";
   this.weight = "";
   this.height = "";
   this.measure = "";
   this.chest = "";
   this.arm = "";
   this.waist = "";
   this.thigh = "";
   this.glute = "";
   this.calf = "";
   this.orname = "";
   this.uploadFile = "";
   //angular.element("input[type='file']").val(null);
  // document.getElementById("fileinput") = null;
  this.el.nativeElement.value = "";

  }

  assignCopy(){
   this.data = Object.assign([], this.data1);   
  }

   filterItem(trainerfilter,trainingfilter){
   if(trainerfilter == null && trainingfilter == null) {
     this.assignCopy();
   }
   else{    
     var exp1;
     var exp2;

     if (trainerfilter == 0) {
        trainerfilter = "";
      }
      if (trainingfilter == 0) {
        trainingfilter = "";
      }

      exp1 = Object.assign([], this.data1).filter(
          item => item.trainer_id.toLowerCase().indexOf(trainerfilter.toLowerCase()) > -1
       )
      exp2 = Object.assign([], exp1).filter(
        item => item.training_id.toLowerCase().indexOf(trainingfilter.toLowerCase()) > -1
      )
    
      this.data = exp2;
   } 
  }

}
