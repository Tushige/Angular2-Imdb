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
var people_search_service_1 = require('./people-search.service');
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var router_2 = require('@angular/router');
var ActorDetailsComponent = (function () {
    function ActorDetailsComponent(route, router, location, peopleSearchService) {
        this.route = route;
        this.router = router;
        this.location = location;
        this.peopleSearchService = peopleSearchService;
        this.isLoading = true;
    }
    ;
    ActorDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var resource_id = params['resource_id'];
            _this.resourcePromise = _this.peopleSearchService.searchActor(resource_id)
                .then(function (actor) {
                _this.actor = actor;
                _this.isLoading = undefined;
                _this.actor.description = _this.actor.description.split('...')[0] + "...";
                _this.bioLink = "http://www.imdb.com/name/" + resource_id;
                _this.actor.filmography.forEach(function (film) {
                    film['year'] = film['year'] === "" ? "3000" : film['year'].replace(/&nbsp;/g, "");
                });
            });
        });
    };
    ActorDetailsComponent.prototype.goToIMDB = function (filmInfo) {
        console.log("filmInfo: ", filmInfo);
        var link = [filmInfo];
        this.router.navigate(link);
    };
    ActorDetailsComponent.prototype.goBack = function () {
        this.location.back();
    };
    ActorDetailsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'actor-details',
            templateUrl: '../actor-details.component.html',
            styleUrls: ['../actor-details.component.css'],
            providers: [people_search_service_1.PeopleSearchService],
            animations: [
                core_1.trigger("flyInLeft", [
                    core_1.state('loaded', core_1.style({ transform: 'translateX(0)' })),
                    core_1.transition('void => loaded', [
                        core_1.style({
                            transform: 'translateX(-100%)'
                        }),
                        core_1.animate('1s ease-in')
                    ]),
                    core_1.transition('loaded=>*', [
                        core_1.style({
                            transform: 'translateX(100%)'
                        }),
                        core_1.animate('1s ease-out')
                    ])
                ]),
                core_1.trigger("flyInRight", [
                    core_1.state('loadedR', core_1.style({ transform: 'translateX(0)' })),
                    core_1.transition('void=>*', [
                        /*style({
                          transform: 'translateX(100%)'
                        }),*/
                        core_1.animate('2s ease-in', core_1.keyframes([
                            core_1.style({ opacity: 1, transform: 'translateX(100%)', offset: 0 }),
                            core_1.style({ opacity: 1, transform: 'translateX(0)', offset: 0.7 }),
                            core_1.style({ opacity: 1, transform: 'translateX(-15px)', offset: 0.9 }),
                            core_1.style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
                        ]))
                    ])
                ])
            ]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_2.Router, common_1.Location, people_search_service_1.PeopleSearchService])
    ], ActorDetailsComponent);
    return ActorDetailsComponent;
}());
exports.ActorDetailsComponent = ActorDetailsComponent;
//# sourceMappingURL=actor-details.component.js.map