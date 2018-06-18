import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {commonRouteUrl} from 'app/app.service';

@Injectable()
export class ProfileService {

  constructor(private http:Http, public comcom: commonRouteUrl) { }

  getLedger(a,mbrid) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(a);
     return this.http.post(this.comcom.commonroute+'profileapi.php?mbrid='+mbrid, body, options )
   // return this.http.get(this.comcom.commonroute+'ledgersapi.php?mbrid='+mbrid)
    .map((res:Response) => res.json());
  }
}
