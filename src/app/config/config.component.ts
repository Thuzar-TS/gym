import { Component, OnInit } from '@angular/core';
import { ConfigService } from './config.service';
import { Observable }     from 'rxjs/Observable';
import { commonRouteUrl } from 'app/app.service';
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { Pipe, PipeTransform } from '@angular/core';
//import { MyFilterPipe } from '../shared/pipes/my-filter.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
  providers: [ConfigService,commonRouteUrl,DatePipe,Ng2SearchPipeModule],
})
export class ConfigComponent implements OnInit {
public adminexp:any[];
public adminincome:any[];
public adminincome1;
public adminexp1;
public filterdate;
public adfromdatefilter = "";
public adtodatefilter = "";

public filterQuery = "";
public rowsOnPage = 5;
public sortBy = "income_date";
public sortOrder = "asc";
public exptotal = 0;
public inctotal = 0;
public baltotal = 0;

  constructor(private filter:Ng2SearchPipeModule,private configService: ConfigService, private userdata: commonRouteUrl, private router: Router, private datePipe:DatePipe) { }

   ngOnInit() {
     if(this.userdata.roleId == "1"){
       let filterdate = {fromd: this.datePipe.transform(this.adfromdatefilter,"MM/dd/yyyy"),tod: this.datePipe.transform(this.adtodatefilter,"MM/dd/yyyy"), btn:""}
      return this.configService.getConfig(filterdate).subscribe(data => {
        if(data.adminexp != "No Record") {
          this.adminexp = data.adminexp;
          this.adminexp1 = data.adminexp;          
        }
        else{
          this.adminexp = [];
          this.adminexp1 = [];
        }

        if(data.adminincome != "No Record") {
          this.adminincome = data.adminincome;
          this.adminincome1 = data.adminincome;
        }
        else{
          this.adminincome = [];
          this.adminincome1 = [];
        }

        this.assignCopy();
      });
     }
     else{
      this.router.navigate(['/']);
     }      
  }

  assignCopy(){
   this.exptotal = 0;
   this.inctotal = 0;
   this.baltotal = 0;
   this.adminexp = Object.assign([], this.adminexp1);
   this.adminincome = Object.assign([], this.adminincome1);

   for (var i = this.adminexp.length - 1; i >= 0; i--) {
    this.exptotal += parseFloat(this.adminexp[i].amount);
   }

   for (var i = this.adminincome.length - 1; i >= 0; i--) {
    this.inctotal += parseFloat(this.adminincome[i].average_amt);

   }
   this.baltotal = this.inctotal-this.exptotal;

}

  filterItem(value){
   if(value.length == 0) {
     this.assignCopy();
   }
   else{
     this.exptotal = 0;
      this.inctotal = 0;
      this.baltotal = 0;
     value = this.datePipe.transform(value,"MM/dd/yyyy");
     this.adminexp = Object.assign([], this.adminexp1).filter(
       // item => item.exp_date.toLowerCase().indexOf(value.toLowerCase()) > -1
        item => item.exp_date.indexOf(value) > -1
     )
     this.adminincome = Object.assign([], this.adminincome1).filter(
       // item => item.exp_date.toLowerCase().indexOf(value.toLowerCase()) > -1
        item => item.income_date.indexOf(value) > -1
     )
     for (var i = this.adminexp.length - 1; i >= 0; i--) {
      this.exptotal += parseFloat(this.adminexp[i].amount);
    }

    for (var i = this.adminincome.length - 1; i >= 0; i--) {
      this.inctotal += parseFloat(this.adminincome[i].average_amt);
    }
    this.baltotal = this.inctotal-this.exptotal;
   } //when nothing has typed
   
}
}
