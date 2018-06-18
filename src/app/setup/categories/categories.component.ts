import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './categories.service';
import { Observable }     from 'rxjs/Observable';
import { commonRouteUrl } from 'app/app.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers: [CategoriesService,commonRouteUrl]
})
export class CategoriesComponent implements OnInit {
public data: any[];
public data1: any[];
public categoryname;
public saveVal = false;
public cateid;
public namefilter = null;

public filterQuery = "";
public rowsOnPage = 5;
public sortBy = "income_date";
public sortOrder = "asc";

  constructor(private cateService: CategoriesService, private userdata: commonRouteUrl, private router: Router) { }

   ngOnInit() {
     if(this.userdata.roleId == "1"){
      return this.cateService.getCategory().subscribe(category => {
        if(category != "No Record") {
          this.data = category;
          this.data1 = category;
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

  createCategory() {
    if(this.categoryname!=null && this.categoryname!='' && this.categoryname!=undefined){
      
      let cate = {categoryname: this.categoryname, btn:'save'};
      this.cateService.createCategory(cate).subscribe(
        data => {
          cate = null;
          if(data != "No Record") {
            this.data = data;
            this.data1 = data;
            this.categoryname = null;
          }
          else{
            this.data = [];
            this.data1 = [];
          }            
        },
        error => {
          alert("Error saving Category!  Contact with site admin.");
          return Observable.throw(error);
        }
      );
    }
    else{
      alert("Please Fill Completely.");
    }   
  }
 
  editCategory(cate) {
  this.categoryname = cate.category_name;
  this.cateid = cate.category_id;
  this.saveVal = true;
  }

  updateCategory() {
    if(this.categoryname!=null && this.categoryname!='' && this.categoryname!=undefined){
      let updatecate = {categoryid: this.cateid, categoryname: this.categoryname, btn:'edit'};
      this.cateService.updateCategory(updatecate).subscribe(
        data => {
          updatecate = null;
          if(data != "No Record") {
            this.data = data;
            this.data1 = data;
          } 
          else{
            this.data = [];
            this.data1 = [];
          }   
          this.categoryname = null;
          this.saveVal = false;          
        },
        error => {
          alert("Error saving Category!  Contact with site admin.");
          return Observable.throw(error);
        }
      );
    }
    else{
      alert("Please Fill Completely.");
    }    
  }
 
  deleteCategory(cate) {
    if (confirm("Are you sure you want to delete " + cate.category_name + "?")) {
    let deletecate = {categoryid: cate.category_id, btn:'delete'}
      this.cateService.deleteCategory(deletecate).subscribe(
         data => {
           deletecate = null;
           if(data != "No Record") {
            this.data = data;
            this.data1 = data;
          }
          else{
            this.data = [];
            this.data1 = [];
          }
          this.categoryname = null;            
         },
         error => {
           alert("Error deleting Category!  Contact with site admin.");
           return Observable.throw(error);
         }
      );
    }
  }

  clearCategory() {
   this.categoryname = null;
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
