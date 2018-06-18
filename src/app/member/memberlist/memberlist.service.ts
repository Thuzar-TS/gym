import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {commonRouteUrl} from 'app/app.service';

@Injectable()
export class MemberlistService {

  constructor(private http:Http, public comcom: commonRouteUrl) { }

  getMembers() {
    return this.http.get(this.comcom.commonroute+'memberapi.php')
    .map((res:Response) => res.json());
  }

  createMembers(member) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(member);
    return this.http.post(this.comcom.commonroute+'memberapi.php', body, options )
    .map((res: Response) => res.json());
  }

  registerMembers(register) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(register);
    return this.http.post(this.comcom.commonroute+'memberapi.php', body, options )
    .map((res: Response) => res.json());
  }

  updateMembers(member) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(member);
    return this.http.put(this.comcom.commonroute+'memberapi.php', body, options )
    .map((res: Response) => res.json());
  }

  deleteMembers(deletemember) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(deletemember);
    return this.http.post(this.comcom.commonroute+'memberapi.php', body, options )
    .map((res: Response) => res.json());
  }

}
