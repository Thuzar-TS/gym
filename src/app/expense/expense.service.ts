import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {commonRouteUrl} from 'app/app.service';

@Injectable()
export class ExpenseService {

  constructor(private http:Http, public comcom: commonRouteUrl) { }

  getExpense(a) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(a);
    return this.http.post(this.comcom.commonroute+'expenseapi.php', body, options)
    .map((res:Response) => res.json());
  }

  createExpense(user) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(user);
    return this.http.post(this.comcom.commonroute+'expenseapi.php', body, options )
    .map((res: Response) => res.json());
  }

  updateExpense(user) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(user);
    return this.http.put(this.comcom.commonroute+'expenseapi.php', body, options )
    .map((res: Response) => res.json());
  }

  deleteExpense(deleteuser) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(deleteuser);
    return this.http.post(this.comcom.commonroute+'expenseapi.php', body, options )
    .map((res: Response) => res.json());
  }

}
