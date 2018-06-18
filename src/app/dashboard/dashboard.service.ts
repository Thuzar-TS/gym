import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {commonRouteUrl} from 'app/app.service';

@Injectable()
export class DashboardService {

  constructor(private http:Http, public comcom: commonRouteUrl) { }

  getLedger() {  
    return this.http.get(this.comcom.commonroute+'dashboardapi.php')
    .map((res:Response) => res.json());
  }

}
