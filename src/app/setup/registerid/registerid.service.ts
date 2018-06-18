import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {commonRouteUrl} from 'app/app.service';

@Injectable()
export class RegisteridService {

  constructor(private http:Http, public comcom: commonRouteUrl) { }

  getType() {
    return this.http.get(this.comcom.commonroute+'registeridapi.php')
    .map((res:Response) => res.json());
  }

  updateType(types) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(types);
    return this.http.put(this.comcom.commonroute+'registeridapi.php', body, options )
    .map((res: Response) => res.json());
  }  
}
