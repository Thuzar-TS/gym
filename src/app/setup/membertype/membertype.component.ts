import { Component, OnInit } from '@angular/core';
import { MembertypeService } from './membertype.service';
import { Observable }     from 'rxjs/Observable';
import { commonRouteUrl } from 'app/app.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-membertype',
  templateUrl: './membertype.component.html',
  styleUrls: ['./membertype.component.scss'],
  providers: [MembertypeService,commonRouteUrl]
})
export class MembertypeComponent implements OnInit {

  public data: any[];
  public data1: any[];
  public typename;
  private typeid;
  public saveVal = false;
  public namefilter = null;

  public filterQuery = "";
  public rowsOnPage = 3;
  public sortBy = "income_date";
  public sortOrder = "asc";

  constructor(private membertypeService: MembertypeService, private userdata: commonRouteUrl, private router: Router) { }

  ngOnInit() {
    if(this.userdata.roleId == "1"){
      return this.membertypeService.getType().subscribe(data => {
       if(data != "No Record") {
        this.data = data;
        this.data1 = data;
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

  createType(mtype) {
  if(mtype!=null && mtype!='' && mtype!=undefined){
  let typesave = {typename: mtype, btn:'save'};
    this.membertypeService.createType(typesave).subscribe(
       data => {
         typesave = null;
         if(data != "No Record") {
            this.data = data;
            this.data1 = data;
          }
          else{
            this.data = [];
            this.data1 = [];
          }
         this.clearType();
       },
       error => {
         alert("Error Saving member type. Contact with site admin.!");
         return Observable.throw(error);
       }
    );
  }
  else{
   alert("Please Fill Completely.");
  }
    
  }
 
  editType(mtype) {
  this.typename = mtype.mbr_type_name;
  this.typeid = mtype.mbr_type_id;
  this.saveVal = true;
  }

  updateType(mtype) {
  if(mtype!=null && mtype!='' && mtype!=undefined){
  let updatetype = {mbr_type_id: this.typeid, typename: mtype, btn:'edit'};
    this.membertypeService.updateType(updatetype).subscribe(
       data => {
         updatetype = null;
         if(data != "No Record") {
            this.data = data;
            this.data1 = data;
          }
          else{
            this.data = [];
            this.data1 = [];
          }
         this.clearType();
       },
       error => {
         alert("Error editing! Please Check your Data! Contact with site admin.");
         return Observable.throw(error);
       }
    );
  }
   else{
   alert("Please Fill Completely.");
   } 
  }
 
  deleteType(types) {
    if (confirm("Are you sure you want to delete " + types.mbr_type_name + "?")) {
    let deletetype = {mbr_type_id: types.mbr_type_id, btn:'delete'}
      this.membertypeService.deleteType(deletetype).subscribe(
         data => {
           deletetype = null;
           if(data != "No Record") {
            this.data = data;
            this.data1 = data;
          }
          else{
            this.data = [];
            this.data1 = [];
          }
          this.clearType();
         },
         error => {
           alert("Error Deleting! Contact with site admin.");
           return Observable.throw(error);
         }
      );
    }
  }

  clearType() {
   this.typename = null;
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
            item => item.mbr_type_name.toLowerCase().indexOf(this.namefilter.toLowerCase()) > -1
          // item => item.user_name.indexOf(this.namefilter) > -1            
         )
       }
     }      
  }

}
