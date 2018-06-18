import { Component, OnInit } from '@angular/core';
import { RegisteridService } from './registerid.service';
import { Observable }     from 'rxjs/Observable';
import { commonRouteUrl } from 'app/app.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-registerid',
  templateUrl: './registerid.component.html',
  styleUrls: ['./registerid.component.scss'],
  providers: [RegisteridService,commonRouteUrl]
})
export class RegisteridComponent implements OnInit {

  public data: any[];
  public reg: any[];
  public prefix;
  public nn = 0;
  private typeid;
  public setupVal = true;
  public hideVal = true;
  public namefilter = null;
  public num = "";
  public editbtn = false;

  public filterQuery = "";
  public rowsOnPage = 3;
  public sortBy = "income_date";
  public sortOrder = "asc";

  constructor(private registeridService: RegisteridService, private userdata: commonRouteUrl, private router: Router) { }

  ngOnInit() {
    if(this.userdata.roleId == "1"){
      return this.registeridService.getType().subscribe(data => {
       if(data.aaa != "No Record") {
        this.reg = data.aaa;
        for (var i = this.reg[0].num - 1; i >= 0; i--) {
          this.num = this.num+"x";
        }
       }
       else{
         this.reg = [];
       }
       if (data.count != 0) {
         this.editbtn = true;
       }
      });

    }
    else{
      this.router.navigate(['/']);
    }      
  }
 
  editID(aa) {
  this.prefix = aa.prefix;
  this.nn = aa.num;
  this.setupVal = false;
  this.hideVal = false;
  }

  updateId() {
  if(this.prefix!=null && this.prefix!="" && this.prefix!=undefined && this.nn!=null){
  let updatetype = {num: this.nn, prefix: this.prefix, btn:'edit'};
    this.registeridService.updateType(updatetype).subscribe(
       data => {
         updatetype = null;
         if(data.aaa != "No Record") {
            this.reg = data.aaa;
            this.num = "";
            for (var i = this.reg[0].num - 1; i >= 0; i--) {
              this.num = this.num+"x";
            }
          }
          else{
            this.data = [];
          }
         this.clearId();
       },
       error => {
         alert("Error Editing Type! Contact with site admin");
         return Observable.throw(error);
       }
    );
  }
   else{
   alert("Please Fill Completely.");
   } 
  }
 
  clearId() {
   this.prefix = null;
   this.nn = null;
   this.setupVal = true;
   this.hideVal = true;
  }

}
