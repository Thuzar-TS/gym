import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { Observable }     from 'rxjs/Observable';
import { commonRouteUrl } from 'app/app.service';
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [ProfileService,commonRouteUrl,DatePipe]
})

export class ProfileComponent implements OnInit {
 
    public filterQuery = "";
    public rowsOnPage = 5;
    public sortBy = "income_date";
    public sortOrder = "asc";

    public data: any[];
    public data1: any[];
    private mbrid;
    public mbr;
    private incomeid;
    public dailyVal = true;
    public finishedVal = false;
    public hideVal = true;
    public dailyaction = null;
    public dailyfood = null;
    public mbfromdatefilter = "";
    public mbtodatefilter = "";

  constructor(private route: ActivatedRoute,private ledgService: ProfileService, private userdata: commonRouteUrl, private router: Router, private datePipe:DatePipe) { }

   ngOnInit() {
     this.mbrid = this.route.snapshot.params['id'];
     if(this.userdata.roleId == "1"){
       let filterdate = {fromd: this.datePipe.transform(this.mbfromdatefilter,"MM/dd/yyyy"),tod: this.datePipe.transform(this.mbtodatefilter,"MM/dd/yyyy"), btn:""}
      return this.ledgService.getLedger(filterdate,this.mbrid).subscribe(data => {
        if(data.memberdata != "No Record") {
          this.data = data.memberdata;
          this.data1 = data.memberdata;
        }
        else{
          this.data = [];
          this.data1 = [];
        }
        this.mbr = data.member;
      });
     }
     else{
      this.router.navigate(['/']);
     }      
  }
}