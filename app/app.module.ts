/*
 * app.module.ts
 * Application entry point
 */
 /*Angular modules*/
import './rxjs-extensions';
import { enableProdMode} from '@angular/core';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpModule, JsonpModule } from '@angular/http';
/* Custom modules*/
import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard.component';
import {PeopleSearchService} from './people-search.service';
import {ActorDetailsComponent} from './actor-details.component';
import {LoadingService} from './loading.component';
//enable production
enableProdMode();
/*
 * App metadata
 */
@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path:'dashboard',
        component: DashboardComponent
      },
      {
        path: 'actor-details/:resource_id',
        component: ActorDetailsComponent
      }
    ])
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    ActorDetailsComponent,
    LoadingService
  ],
  providers: [PeopleSearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
