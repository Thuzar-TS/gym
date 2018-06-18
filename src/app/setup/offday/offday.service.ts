import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {commonRouteUrl} from 'app/app.service';

@Injectable()
export class OffdayService {

  constructor(private http:Http, public comcom: commonRouteUrl) { }

  getOffday() {
    return this.http.get(this.comcom.commonroute+'offdayapi.php')
    .map((res:Response) => res.json().offdays);
  }

  createOffday(offday) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(offday);
    return this.http.post(this.comcom.commonroute+'offdayapi.php', body, options )
    .map((res: Response) => res.json());
  }

  confirmOffday(offday) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(offday);
    return this.http.post(this.comcom.commonroute+'offdayapi.php', body, options )
    .map((res: Response) => res.json());
  }

  deleteOffday(deleteoffday) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(deleteoffday);
    return this.http.post(this.comcom.commonroute+'offdayapi.php', body, options )
    .map((res: Response) => res.json().offdays);
  }

}
