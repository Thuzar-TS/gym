import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { commonRouteUrl } from 'app/app.service';

@Injectable()
export class LoginService {

  constructor(private http:Http, public comcom: commonRouteUrl) { }

  loginUser(login) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(login);
    return this.http.post(this.comcom.commonroute+'loginapi.php', body, options )
    .map((res: Response) => res.json().users);
  }

}
