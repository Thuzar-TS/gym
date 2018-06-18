import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {commonRouteUrl} from 'app/app.service';

@Injectable()
export class PromotiontypeService {

  constructor(private http:Http, public comcom: commonRouteUrl) { }

  getPromotion() {
    return this.http.get(this.comcom.commonroute+'promotionapi.php')
    .map((res:Response) => res.json());
  }

  createPromotion(promo) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(promo);
    return this.http.post(this.comcom.commonroute+'promotionapi.php', body, options )
    .map((res: Response) => res.json());
  }

  updatePromotion(promo) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(promo);
    return this.http.put(this.comcom.commonroute+'promotionapi.php', body, options )
    .map((res: Response) => res.json());
  }

  searchDate(searchdate) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(searchdate);
    return this.http.put(this.comcom.commonroute+'promotionapi.php', body, options )
    .map((res: Response) => res.json());
  }

  deletePromotion(deletecatego) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(deletecatego);
    return this.http.post(this.comcom.commonroute+'promotionapi.php', body, options )
    .map((res: Response) => res.json());
  }

}
