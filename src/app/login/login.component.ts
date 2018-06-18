import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LoginService } from './login.service';
import {Observable}     from 'rxjs/Observable';
import { commonRouteUrl } from 'app/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService,commonRouteUrl]
})
export class LoginComponent implements OnInit {

public loginid;
public pass;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    localStorage.removeItem("userID");
    localStorage.removeItem("roleID");
  }

  loginUser() {
  if (this.loginid!=null && this.loginid!='' && this.loginid!=undefined && this.pass!=null && this.pass!='' && this.pass!=undefined){
  let loginuser = {loginid: this.loginid, pass:this.pass, btn:'login'};
    this.loginService.loginUser(loginuser).subscribe(
       data => {
         loginuser = null;   
         if (data != "No Record" && data != "Error") {           
           localStorage.setItem("userID",data[0].user_id);
           localStorage.setItem("roleID",data[0].role_id);
           this.router.navigate(['/dashboard']);
         }
         else if (data == "No Record") {
           alert("Invalid Login ID and Password");
         }
         else {
           alert("Error");
         }
       },
       error => {
         alert("Connection Error");
         console.error("Error Login!");
         return Observable.throw(error);
       }
    );
  }
  else{
   alert("Please Fill Completely.");
  }
    
  }

}
