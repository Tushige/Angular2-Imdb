"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
var people_1 = require('./people');
//gives toPromise()
require('rxjs/add/operator/toPromise');
var PeopleSearchService = (function () {
    function PeopleSearchService(jsonp) {
        this.jsonp = jsonp;
        this.peopleUrl = 'http://imdb.wemakesites.net/api/search?q=';
        this.resourceUrl = 'http://imdb.wemakesites.net/api/';
        this.constructUrlSearchParams();
    }
    /*
     * returns Observable<People>
     */
    PeopleSearchService.prototype.searchPeople = function (searchTerm) {
        var term = searchTerm.split(' ').join('_');
        var searchUrl = this.peopleUrl + term;
        return this.jsonp
            .get(searchUrl, { search: this.params })
            .map(this.mapPeople)
            .catch(this.errorHandler);
    };
    PeopleSearchService.prototype.searchActor = function (resourceId) {
        var searchUrl = this.resourceUrl + resourceId;
        return this.jsonp
            .get(searchUrl, { search: this.params })
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.promiseErrorHandler);
    };
    PeopleSearchService.prototype.constructUrlSearchParams = function () {
        this.params = new http_1.URLSearchParams();
        this.params.set('crossDomain', 'true');
        this.params.set('dataType', 'jsonp');
        this.params.set('callback', 'JSONP_CALLBACK');
    };
    /* converts query result into array of People*/
    PeopleSearchService.prototype.mapPeople = function (res) {
        if (res.json().data.results.length < 1) {
            console.log("OOPS!");
            return null;
        }
        else {
            console.log("mapping People");
            return res.json().data.results.names.map(function (r) {
                //console.log("trying to create a person for ", r.title);
                var people = new people_1.People(r.title, r.id, r.url, r.thumbnail);
                return people;
            });
        }
    };
    PeopleSearchService.prototype.errorHandler = function (err) {
        var errMsg = (err.message) ? err.message :
            err.status ? err.status + " - " + err.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    PeopleSearchService.prototype.promiseErrorHandler = function (err) {
        console.error(err);
        return Promise.reject(err.message || err);
    };
    PeopleSearchService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Jsonp])
    ], PeopleSearchService);
    return PeopleSearchService;
}());
exports.PeopleSearchService = PeopleSearchService;
//# sourceMappingURL=people-search.service.js.map