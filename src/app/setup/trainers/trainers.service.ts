import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {commonRouteUrl} from 'app/app.service';

@Injectable()
export class TrainersService {

  constructor(private http:Http, public comcom: commonRouteUrl) { }

  getTrainer() {
    return this.http.get(this.comcom.commonroute+'trainerapi.php')
    .map((res:Response) => res.json());
  }

  createTrainer(catego) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(catego);
    return this.http.post(this.comcom.commonroute+'trainerapi.php', body, options )
    .map((res: Response) => res.json());
  }

  updateTrainer(catego) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(catego);
    return this.http.put(this.comcom.commonroute+'trainerapi.php', body, options )
    .map((res: Response) => res.json());
  }

  deleteTrainer(deletecatego) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(deletecatego);
    return this.http.post(this.comcom.commonroute+'trainerapi.php', body, options )
    .map((res: Response) => res.json());
  }

}
