import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {commonRouteUrl} from 'app/app.service';

@Injectable()
export class IncomeService {

  constructor(private http:Http, public comcom: commonRouteUrl) { }

  getIncome(a) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(a);
    return this.http.post(this.comcom.commonroute+'incomeapi.php', body, options)
    .map((res:Response) => res.json());
  }

  createIncome(user) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(user);
    return this.http.post(this.comcom.commonroute+'incomeapi.php', body, options )
    .map((res: Response) => res.json());
  }
  
  detailIncome(inc) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(inc);
    return this.http.put(this.comcom.commonroute+'incomeapi.php', body, options )
    .map((res: Response) => res.json());
  }

  updateIncome(user) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(user);
    return this.http.put(this.comcom.commonroute+'incomeapi.php', body, options )
    .map((res: Response) => res.json());
  }

  deleteIncome(deleteuser) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(deleteuser);
    return this.http.post(this.comcom.commonroute+'incomeapi.php', body, options )
    .map((res: Response) => res.json());
  }

}
