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
/*
 * app.module.ts
 * Application entry point
 */
/*Angular modules*/
require('./rxjs-extensions');
var core_1 = require('@angular/core');
var core_2 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
/* Custom modules*/
var app_component_1 = require('./app.component');
var dashboard_component_1 = require('./dashboard.component');
var people_search_service_1 = require('./people-search.service');
var actor_details_component_1 = require('./actor-details.component');
var loading_component_1 = require('./loading.component');
//enable production
core_1.enableProdMode();
/*
 * App metadata
 */
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_2.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                http_1.JsonpModule,
                router_1.RouterModule.forRoot([
                    {
                        path: '',
                        redirectTo: '/dashboard',
                        pathMatch: 'full'
                    },
                    {
                        path: 'dashboard',
                        component: dashboard_component_1.DashboardComponent
                    },
                    {
                        path: 'actor-details/:resource_id',
                        component: actor_details_component_1.ActorDetailsComponent
                    }
                ])
            ],
            declarations: [
                app_component_1.AppComponent,
                dashboard_component_1.DashboardComponent,
                actor_details_component_1.ActorDetailsComponent,
                loading_component_1.LoadingService
            ],
            providers: [people_search_service_1.PeopleSearchService],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map