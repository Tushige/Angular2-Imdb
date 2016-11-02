import { Injectable } from '@angular/core';
import {Jsonp, BaseRequestOptions, RequestOptions, URLSearchParams, Response}  from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {People} from './people';
import {Actor} from './actor';
//gives toPromise()
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PeopleSearchService {
  params: URLSearchParams;
  private peopleUrl: string = 'http://imdb.wemakesites.net/api/search?q=';
  private resourceUrl: string = 'http://imdb.wemakesites.net/api/';

  constructor(private jsonp: Jsonp) {
    this.constructUrlSearchParams();
  }

  /*
   * returns Observable<People>
   */
  searchPeople(searchTerm: string) {
    let term = searchTerm.split(' ').join('_');
    let searchUrl = this.peopleUrl+term;

    return this.jsonp
               .get(searchUrl, {search: this.params})
               .map(this.mapPeople)
               .catch(this.errorHandler);
  }
  searchActor(resourceId: string) {
    let searchUrl = this.resourceUrl + resourceId;
    return this.jsonp
               .get(searchUrl, {search: this.params})
               .toPromise()
               .then(response => response.json().data as Actor)
               .catch(this.promiseErrorHandler)
  }
  constructUrlSearchParams() {
    this.params = new URLSearchParams();
    this.params.set('crossDomain', 'true');
    this.params.set('dataType', 'jsonp');
    this.params.set('callback', 'JSONP_CALLBACK');
  }
  /* converts query result into array of People*/
  private mapPeople(res: Response):People[] {
    if(res.json().data.results.length < 1) {
      console.log("OOPS!")
      return null;
    } else {
      console.log("mapping People");
      return res.json().data.results.names.map(function(r) {
        //console.log("trying to create a person for ", r.title);
        let people = new People(r.title, r.id, r.url, r.thumbnail);
        return people;
      });
    }
  }
  private errorHandler(err: any) {
    let errMsg = (err.message) ? err.message :
    err.status ? `${err.status} - ${err.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
  private promiseErrorHandler(err: any) {
    console.error(err);
    return Promise.reject(err.message || err);
  }
}
