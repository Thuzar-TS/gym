import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {commonRouteUrl} from 'app/app.service';

@Injectable()
export class DailyactionService {

  constructor(private http:Http, public comcom: commonRouteUrl) { }

  getDailyaction(a,mbrid) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(a);
     return this.http.post(this.comcom.commonroute+'dailyactionapi.php?mbrid='+mbrid, body, options )
   // return this.http.get(this.comcom.commonroute+'ledgersapi.php?mbrid='+mbrid)
    .map((res:Response) => res.json());
  }

  getAlertaction(mbrid) {
    //let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    //let options = new RequestOptions({ headers: headers });
     //return this.http.get(this.comcom.commonroute+'dailyactionapi.php?mbrid='+mbrid, options )
    return this.http.get(this.comcom.commonroute+'dailyalert.php?mbrid='+mbrid)
    .map((res:Response) => res.json());
  }
  
  createDailyalert(catego,mbrid) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(catego);
    return this.http.post(this.comcom.commonroute+'dailyalert.php?mbrid='+mbrid, body, options )
    .map((res: Response) => res.json());
  }

  updateDailyalert(catego,mbrid) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(catego);
    return this.http.put(this.comcom.commonroute+'dailyalert.php?mbrid='+mbrid, body, options )
    .map((res: Response) => res.json());
  }

  deleteDailyalert(deletecatego,mbrid) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(deletecatego);
    return this.http.post(this.comcom.commonroute+'dailyalert.php?mbrid='+mbrid, body, options )
    .map((res: Response) => res.json());
  }

  createDailyaction(catego,mbrid) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(catego);
    return this.http.post(this.comcom.commonroute+'dailyactionapi.php?mbrid='+mbrid, body, options )
    .map((res: Response) => res.json());
  }

  updateDailyaction(catego,mbrid) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(catego);
    return this.http.put(this.comcom.commonroute+'dailyactionapi.php?mbrid='+mbrid, body, options )
    .map((res: Response) => res.json());
  }

  deleteDailyaction(deletecatego,mbrid) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(deletecatego);
    return this.http.post(this.comcom.commonroute+'dailyactionapi.php?mbrid='+mbrid, body, options )
    .map((res: Response) => res.json());
  }

  
  deletePhoto(deletedata,mbrid) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(deletedata);
    return this.http.post(this.comcom.commonroute+'dailyactionapi.php?mbrid='+mbrid, body, options )
    .map((res: Response) => res.json());
  }

}
