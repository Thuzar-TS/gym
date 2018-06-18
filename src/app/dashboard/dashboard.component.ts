import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Observable }     from 'rxjs/Observable';
import { commonRouteUrl } from 'app/app.service';
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { Pipe, PipeTransform } from '@angular/core';
//import { MyFilterPipe } from '../shared/pipes/my-filter.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@Component({
  templateUrl: 'dashboard.component.html',
  providers: [DashboardService,commonRouteUrl,DatePipe,Ng2SearchPipeModule],
})
export class DashboardComponent implements OnInit {
public promo: any[];
public offday:any[];
public adminincome1;
public adminexp1;
public filterdate;
public dailymbr = 0;
public monthlymbr = 0;
public activembr = 0;
public endmbr = 0;

public filterQuery = "";
public rowsOnPage = 5;
public sortBy = "income_date";
public sortOrder = "asc";
public exptotal = 0;
public inctotal = 0;
public baltotal = 0;

  constructor(private filter:Ng2SearchPipeModule,private admledgService: DashboardService, private userdata: commonRouteUrl, private router: Router, private datePipe:DatePipe) { }

   ngOnInit() {
     if(this.userdata.roleId == "1"){
      return this.admledgService.getLedger().subscribe(data => {
        this.dailymbr = data.dailymbr;
        this.monthlymbr = data.monthlymbr;
        this.activembr = data.activembr;
        this.endmbr = data.endmbr;

        if(data.promotion != "No Record") {
          this.promo = data.promotion;
        }
        else{
          this.promo = [];
        }

        if(data.offday != "No Record") {
          this.offday = data.offday;
        }
        else{
          this.offday = [];
        }
      });
     }
     else{
      this.router.navigate(['/']);
     }      
  }

}
