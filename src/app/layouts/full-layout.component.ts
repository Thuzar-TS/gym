import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { LayoutService } from './full-layout.service';
import { Observable }     from 'rxjs/Observable';
import { commonRouteUrl } from 'app/app.service';
import { Router } from "@angular/router";
import { ModalDirective } from 'ng2-bootstrap/modal/modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html',
  providers: [LayoutService,commonRouteUrl]
})
export class FullLayoutComponent implements OnInit {
//@ViewChild('primaryModal') primaryModal: ElementRef;
  constructor(private layoutService: LayoutService, private userdata: commonRouteUrl, private router: Router) { }

  public disabled:boolean = false;
  public status:{isopen:boolean} = {isopen: false};
  public noti;
  public data;
  public expirembr;
  public expiredate;
  private expirembrid;
  public expiredalert;
  public dailyalert;
  public expiredalertsize = 0;
  public dailyalertsize = 0;

  public toggled(open:boolean):void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event:MouseEvent):void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  showalert(aa){
    if (aa == "expir") {
      // code...
    }
    else{

    }
   /* this.expirembrid = aa.member_id;
    this.expirembr = aa.member_name;
    this.expiredate = aa.expired_date;*/
  }

  endmember(a,b){
    let exp = {mbrid: a,expdate: b,btn:'endmbr'};
      this.layoutService.endMember(exp).subscribe(
        data => {
          if(data.expiredalert != 0) {
          this.expiredalert = data.expiredalert;          
        }
        else{
          this.data = [];
          this.noti = 0; 
        }

        if(data.dailyalert != 0) {
          this.dailyalert = data.dailyalert;          
        }
        else{
          this.data = [];
          this.noti = 0; 
        }
        this.dailyalertsize = data.dailyalertsize;   
        this.expiredalertsize = data.expiredalertsize;   
        this.noti = data.noti;
          alert("Success.");          
          //window.location.reload();
        })
  }

  ngOnInit() {
    if(this.userdata.roleId == "1"){
      return this.layoutService.getIncome().subscribe(data => {
      if(data.expiredalert != 0) {
          this.expiredalert = data.expiredalert;          
        }
        else{
          this.data = [];
          this.noti = 0; 
        }

        if(data.dailyalert != 0) {
          this.dailyalert = data.dailyalert;          
        }
        else{
          this.data = [];
          this.noti = 0; 
        }
        this.dailyalertsize = data.dailyalertsize;   
        this.expiredalertsize = data.expiredalertsize;   
        this.noti = data.noti;
      });
    }
    else{
      this.router.navigate(['/']);
    }  
  }

 /* alertnoti(){
    alert("hi");
  }*/
}
