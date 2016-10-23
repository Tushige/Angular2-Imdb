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
var Subject_1 = require('rxjs/Subject');
var router_1 = require('@angular/router');
var DashboardComponent = (function () {
    function DashboardComponent(peopleSearchService, router) {
        var _this = this;
        this.peopleSearchService = peopleSearchService;
        this.router = router;
        /* class variables*/
        this.peopleSearchTermStream = new Subject_1.Subject();
        this.matched_people = this.peopleSearchTermStream
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(function (term) {
            //expects this to return "Obervable"
            return _this.peopleSearchService.searchPeople(term);
        });
    }
    ;
    DashboardComponent.prototype.searchActor = function (term) {
        this.peopleSearchTermStream.next(term);
    };
    /*
     * @selected:
     */
    DashboardComponent.prototype.requestActorDetails = function (selected) {
        var link = ['actor-details', selected.id];
        this.router.navigate(link);
    };
    DashboardComponent.prototype.animationStarted = function (event) {
        console.log("animation enter");
        console.log(event);
    };
    DashboardComponent.prototype.animationDone = function (event) {
        console.log("animation leave");
        console.log(event);
    };
    DashboardComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'dashboard',
            templateUrl: '../dashboard.component.html',
            styleUrls: ['../dashboard.component.css'],
            providers: [people_search_service_1.PeopleSearchService],
            animations: [
                core_1.trigger('flyInOut', [
                    core_1.state('in', core_1.style({
                        transform: 'translateX(0)',
                    })),
                    core_1.transition('void => in', [
                        core_1.style({
                            transform: 'translateX(-100%)',
                        }),
                        core_1.animate('1s ease-in')
                    ]),
                    core_1.transition('* => void', [
                        core_1.style({
                            transform: 'translateX(100%)'
                        }),
                        core_1.animate('1s ease-out')
                    ])
                ]),
                core_1.trigger('fadeIn', [
                    core_1.state('loaded', core_1.style({
                        opacity: 1,
                    })),
                    core_1.transition("void => loaded", [
                        core_1.style({
                            opacity: 0
                        }),
                        core_1.animate('2s ease-out')
                    ])
                ])
            ]
        }), 
        __metadata('design:paramtypes', [people_search_service_1.PeopleSearchService, router_1.Router])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map