import { Component, OnInit } from '@angular/core';
import { TrainersService } from './trainers.service';
import { Observable }     from 'rxjs/Observable';
import { commonRouteUrl } from 'app/app.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.scss'],
  providers: [TrainersService,commonRouteUrl]
})
export class TrainersComponent implements OnInit {
public data: any[];
public data1: any[];
public trainername;
public remark = "";
public saveVal = false;
public cateid;
public namefilter = null;

public filterQuery = "";
public rowsOnPage = 5;
public sortBy = "income_date";
public sortOrder = "asc";

  constructor(private cateService: TrainersService, private userdata: commonRouteUrl, private router: Router) { }

   ngOnInit() {
     if(this.userdata.roleId == "1"){
      return this.cateService.getTrainer().subscribe(data => {
        if(data.trainers != "No Record") {
          this.data = data.trainers;
          this.data1 = data.trainers;
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

  createTrainer() {
    if(this.trainername!=null && this.trainername!='' && this.trainername!=undefined){
      
      let cate = {trainername: this.trainername, remark:this.remark, btn:'save'};
      this.cateService.createTrainer(cate).subscribe(
        data => {
          cate = null;
          if(data.trainers != "No Record") {
            this.data = data.trainers;
            this.data1 = data.trainers;
            this.trainername = null;
            this.remark = "";
            alert("Save Successful.");
          }
          else{
            this.data = [];
            this.data1 = [];
          }            
        },
        error => {
          alert("Error saving Trainer!  Contact with site admin.");
          return Observable.throw(error);
        }
      );
    }
    else{
      alert("Please Fill Completely.");
    }   
  }
 
  editTrainer(cate) {
  this.trainername = cate.trainer_name;
  this.cateid = cate.trainer_id;
  this.remark = cate.remark;
  this.saveVal = true;
  }

  updateTrainer() {
    if(this.trainername!=null && this.trainername!='' && this.trainername!=undefined){
      let updatecate = {trainerid: this.cateid, trainername: this.trainername, remark:this.remark, btn:'edit'};
      this.cateService.updateTrainer(updatecate).subscribe(
        data => {
          updatecate = null;
          if(data.trainers != "No Record") {
            this.data = data.trainers;
            this.data1 = data.trainers;
            alert("Edit Successful.");
          } 
          else{
            this.data = [];
            this.data1 = [];
          }   
          this.trainername = null;
          this.remark = "";
          this.saveVal = false;          
        },
        error => {
          alert("Error saving Trainer!  Contact with site admin.");
          return Observable.throw(error);
        }
      );
    }
    else{
      alert("Please Fill Completely.");
    }    
  }
 
  deleteTrainer(cate) {
    if (confirm("Are you sure you want to delete " + cate.trainer_name + "?")) {
    let deletecate = {trainerid: cate.trainer_id, btn:'delete'}
      this.cateService.deleteTrainer(deletecate).subscribe(
         data => {
           deletecate = null;
           if(data.trainers != "No Record") {
            this.data = data.trainers;
            this.data1 = data.trainers;
          }
          else{
            this.data = [];
            this.data1 = [];
          }
          this.trainername = null;       
          alert("Successfully Deleted.");     
         },
         error => {
           alert("Error deleting Trainer!  Contact with site admin.");
           return Observable.throw(error);
         }
      );
    }
  }

  clearTrainer() {
   this.trainername = null;
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
