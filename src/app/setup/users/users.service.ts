import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {commonRouteUrl} from 'app/app.service';

@Injectable()
export class UsersService {

  constructor(private http:Http, public comcom: commonRouteUrl) { }

  getUsers() {
    return this.http.get(this.comcom.commonroute+'userapi.php')
    .map((res:Response) => res.json().users);
  }

  createUser(user) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(user);
    return this.http.post(this.comcom.commonroute+'userapi.php', body, options )
    .map((res: Response) => res.json().users);
  }

  updateUser(user) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(user);
    return this.http.put(this.comcom.commonroute+'userapi.php', body, options )
    .map((res: Response) => res.json().users);
  }

  deleteUser(deleteuser) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(deleteuser);
    return this.http.post(this.comcom.commonroute+'userapi.php', body, options )
    .map((res: Response) => res.json().users);
  }

}
