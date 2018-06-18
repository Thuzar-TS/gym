import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { Observable }     from 'rxjs/Observable';
import { commonRouteUrl } from 'app/app.service';
import { Router } from "@angular/router";
//import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UsersService,commonRouteUrl]
})
export class UsersComponent implements OnInit {
public data: any[];
public data1: any[];
public new_user;
public login_id;
public pass;
public compass;
public saveVal = false;
public passVal = false;
private userid;
public setupVal = true;
public hideVal = true;
public namefilter = null;
public idfilter = null;

public filterQuery = "";
public rowsOnPage = 10;
public sortBy = "income_date";
public sortOrder = "asc";

//public data: any[];

  constructor(private usersService: UsersService, private userdata: commonRouteUrl, private router: Router) { }

  ngOnInit() {
    if(this.userdata.roleId == "1"){
      
      return this.usersService.getUsers().subscribe(users => {
      if(users != "No Record") {
          this.data = users;
          this.data1 = users;
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

  match() {
    if(this.pass == this.compass)
    {
      this.passVal = true;
      return false;
    }
    else{
      this.passVal = false;
    }
  }

  showsetup(){
    this.setupVal = false;
    this.hideVal = false;
  }

  createUser() {
    //console.log(this.new_user);
    if(this.new_user!=null && this.new_user!='' && this.new_user!=undefined && this.login_id!=null && this.login_id!='' && this.login_id!=undefined && this.pass!=null && this.pass!=''){
      
      let user = {username: this.new_user,login_id: this.login_id, pass:this.pass, btn:'save'};

      this.usersService.createUser(user).subscribe(
        data => {
          user = null;
          if(data != "No Record") {
            this.data = data;
            this.data1 = data;
          }
          else{
            this.data = [];
            this.data1 = [];
          }
          alert("Save Success!");
          this.clearUser();
        },
        error => {
          alert("Error saving user! Contact with site admin");
          return Observable.throw(error);
        }
      );
    }
    else{
      alert("Please Fill Completely.");
    }   
  }
 
  editUser(user) {
  this.showsetup();
  this.new_user = user.user_name;
  this.login_id = user.login_id;
  this.userid = user.user_id;
  this.saveVal = true;
  }

  updateUser() {
    if(this.new_user!=null && this.new_user!='' && this.new_user!=undefined && this.login_id!=null && this.login_id!='' && this.login_id!=undefined && this.pass!=null && this.pass!=''){
      let updateuser = {user_id: this.userid, username: this.new_user,login_id: this.login_id, pass:this.pass, btn:'edit'};
      this.usersService.updateUser(updateuser).subscribe(
        data => {
          updateuser = null;
          if(data != "No Record") {
            this.data = data;
            this.data1 = data;
          }
          else{
            this.data = [];
            this.data1 = [];
          }
          alert("Edit Success!");
          this.clearUser();
        },
        error => {
          alert("Error editing user! Contact with site admin");
          return Observable.throw(error);
        }
      );
    }
    else{
      alert("Please Fill Completely.");
    }    
  }
 
  deleteUser(user) {
    if (confirm("Are you sure you want to delete " + user.user_name + "?")) {
    let deleteuser = {user_id: user.user_id, btn:'delete'}
      this.usersService.deleteUser(deleteuser).subscribe(
         data => {
           user = null;
           if(data != "No Record") {
            this.data = data;
            this.data1 = data;
          }
          else{
            this.data = [];
            this.data1 = [];
          }
          alert("Delete Success");          
         },
         error => {
           alert("Error deleting user! Contact with site admin");
           return Observable.throw(error);
         }
      );
    }
  }

  clearUser() {
  this.new_user = null;
  this.login_id = null;
  this.pass = null;
  this.compass = null;
  this.saveVal = false;
  this.passVal = false;  
  this.setupVal = true;
  this.hideVal = true;
  }

  assignCopy(){
   this.data = Object.assign([], this.data1);
  }

  filterItem(namefilter,idfilter){
  
   if(namefilter == null && idfilter == null) {
     this.assignCopy();
   }
   else{    
      var exp1;
      var exp2;
      
      if (namefilter == null) {
        namefilter = "";
      }
      if (idfilter == null) {
        idfilter = "";
      }
        
      exp1 = Object.assign([], this.data1).filter(
        item => item.user_name.toLowerCase().indexOf(namefilter.toLowerCase()) > -1
      )
      exp2 = Object.assign([], exp1).filter(
        item => item.login_id.toLowerCase().indexOf(idfilter.toLowerCase()) > -1
      )
    
      this.data = exp2;
     }      
  }

}
