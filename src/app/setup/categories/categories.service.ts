import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {commonRouteUrl} from 'app/app.service';

@Injectable()
export class CategoriesService {

  constructor(private http:Http, public comcom: commonRouteUrl) { }

  getCategory() {
    return this.http.get(this.comcom.commonroute+'categoriesapi.php')
    .map((res:Response) => res.json().category);
  }

  createCategory(catego) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(catego);
    return this.http.post(this.comcom.commonroute+'categoriesapi.php', body, options )
    .map((res: Response) => res.json().category);
  }

  updateCategory(catego) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(catego);
    return this.http.put(this.comcom.commonroute+'categoriesapi.php', body, options )
    .map((res: Response) => res.json().category);
  }

  deleteCategory(deletecatego) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(deletecatego);
    return this.http.post(this.comcom.commonroute+'categoriesapi.php', body, options )
    .map((res: Response) => res.json().category);
  }

}
