import { Component, OnInit } from '@angular/core';
import { TrainingService } from './training.service';
import { Observable }     from 'rxjs/Observable';
import { commonRouteUrl } from 'app/app.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
  providers: [TrainingService,commonRouteUrl]
})
export class TrainingComponent implements OnInit {
public data: any[];
public data1: any[];
public trainingname;
public remark = "";
public saveVal = false;
public cateid;
public namefilter = null;

public filterQuery = "";
public rowsOnPage = 5;
public sortBy = "income_date";
public sortOrder = "asc";

  constructor(private cateService: TrainingService, private userdata: commonRouteUrl, private router: Router) { }

   ngOnInit() {
     if(this.userdata.roleId == "1"){
      return this.cateService.getTraining().subscribe(data => {
        if(data.training != "No Record") {
          this.data = data.training;
          this.data1 = data.training;
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

  createTraining() {
    if(this.trainingname!=null && this.trainingname!='' && this.trainingname!=undefined){
      
      let cate = {trainingname: this.trainingname, remark:this.remark, btn:'save'};
      this.cateService.createTraining(cate).subscribe(
        data => {
          cate = null;
          if(data.training != "No Record") {
            this.data = data.training;
            this.data1 = data.training;
            this.trainingname = null;
            this.remark = "";
            alert("Save Successful.");
          }
          else{
            this.data = [];
            this.data1 = [];
          }            
        },
        error => {
          alert("Error saving Training!  Contact with site admin.");
          return Observable.throw(error);
        }
      );
    }
    else{
      alert("Please Fill Completely.");
    }   
  }
 
  editTraining(cate) {
  this.trainingname = cate.training_description;
  this.cateid = cate.training_id;
  this.remark = cate.remark;
  this.saveVal = true;
  }

  updateTraining() {
    if(this.trainingname!=null && this.trainingname!='' && this.trainingname!=undefined){
      let updatecate = {trainingid: this.cateid, trainingname: this.trainingname, remark:this.remark, btn:'edit'};
      this.cateService.updateTraining(updatecate).subscribe(
        data => {
          updatecate = null;
          if(data.training != "No Record") {
            this.data = data.training;
            this.data1 = data.training;
            alert("Edit Successful.");
          } 
          else{
            this.data = [];
            this.data1 = [];
          }   
          this.clearTraining();        
        },
        error => {
          alert("Error editing Training!  Contact with site admin.");
          return Observable.throw(error);
        }
      );
    }
    else{
      alert("Please Fill Completely.");
    }    
  }
 
  deleteTraining(cate) {
    if (confirm("Are you sure you want to delete " + cate.training_id + "?")) {
    let deletecate = {trainingid: cate.training_id, btn:'delete'}
      this.cateService.deleteTraining(deletecate).subscribe(
         data => {
           deletecate = null;
           if(data.training != "No Record") {
            this.data = data.training;
            this.data1 = data.training;
          }
          else{
            this.data = [];
            this.data1 = [];
          }
          this.trainingname = null;         
          alert("Successfully Deleted.");   
         },
         error => {
           alert("Error deleting Category!  Contact with site admin.");
           return Observable.throw(error);
         }
      );
    }
  }

  clearTraining() {
   this.trainingname = null;
   this.remark = "";
   this.saveVal = false;
  }

  assignCopy(){
   this.data = Object.assign([], this.data1);
  }

  filterItem(value){
   if(value.length == 0) {
     this.assignCopy();
   }
   else{    
     if (this.namefilter != null) {
         this.data = Object.assign([], this.data1).filter(
            item => item.category_name.toLowerCase().indexOf(this.namefilter.toLowerCase()) > -1
          // item => item.user_name.indexOf(this.namefilter) > -1            
         )
       }
     }      
  }

}
