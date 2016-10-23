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
var actor_search_service_1 = require('./actor-search.service');
var Subject_1 = require('rxjs/Subject');
var ActorSearchComponent = (function () {
    function ActorSearchComponent(actorSearchService) {
        var _this = this;
        this.actorSearchService = actorSearchService;
        /* class variables*/
        this.searchTermStream = new Subject_1.Subject();
        this.matched_people = this.searchTermStream
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(function (term) {
            //expects this to return "Obervable"
            return _this.actorSearchService.requestActorDetails(term);
        });
    }
    ;
    ActorSearchComponent.prototype.searchActor = function (term) {
        this.searchTermStream.next(term);
    };
    ActorSearchComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'actor-search',
            templateUrl: '../actor-search.component.html',
            providers: [actor_search_service_1.ActorSearchService]
        }), 
        __metadata('design:paramtypes', [actor_search_service_1.ActorSearchService])
    ], ActorSearchComponent);
    return ActorSearchComponent;
}());
exports.ActorSearchComponent = ActorSearchComponent;
//# sourceMappingURL=actor-search.component.js.map