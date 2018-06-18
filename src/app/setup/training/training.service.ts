import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {commonRouteUrl} from 'app/app.service';

@Injectable()
export class TrainingService {

  constructor(private http:Http, public comcom: commonRouteUrl) { }

  getTraining() {
    return this.http.get(this.comcom.commonroute+'trainingapi.php')
    .map((res:Response) => res.json());
  }

  createTraining(catego) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(catego);
    return this.http.post(this.comcom.commonroute+'trainingapi.php', body, options )
    .map((res: Response) => res.json());
  }

  updateTraining(catego) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(catego);
    return this.http.put(this.comcom.commonroute+'trainingapi.php', body, options )
    .map((res: Response) => res.json());
  }

  deleteTraining(deletecatego) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(deletecatego);
    return this.http.post(this.comcom.commonroute+'trainingapi.php', body, options )
    .map((res: Response) => res.json());
  }

}
