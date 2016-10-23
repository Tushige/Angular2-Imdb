import {
  Component,
  OnInit,
  trigger,
  state,
  style,
  transition,
  animate,
  group,
  keyframes,
  AnimationTransitionEvent} from '@angular/core';
import {PeopleSearchService} from './people-search.service';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { Observable }       from 'rxjs/Observable';
import { Subject }          from 'rxjs/Subject';
import {Router} from '@angular/router';
import {People} from './people';
import {Actor} from './actor';

@Component({
  moduleId: module.id,
  selector: 'actor-details',
  templateUrl:'../actor-details.component.html',
  styleUrls: ['../actor-details.component.css'],
  providers: [PeopleSearchService],
  animations: [
    trigger("flyInLeft", [
      state('loaded', style({transform: 'translateX(0)'})),
      transition('void => loaded', [
        style({
          transform: 'translateX(-100%)'
        }),
        animate('1s ease-in')
      ]),
      transition('loaded=>*', [
        style({
          transform: 'translateX(100%)'
        }),
        animate('1s ease-out')
      ])
    ]),
    trigger("flyInRight", [
      state('loadedR', style({transform: 'translateX(0)'})),
      transition('void=>*', [
        /*style({
          transform: 'translateX(100%)'
        }),*/
        animate('2s ease-in', keyframes([
          style({opacity: 1, transform: 'translateX(100%)',     offset: 0}),
          style({opacity: 1, transform: 'translateX(0)', offset: 0.7}),
          style({opacity: 1, transform: 'translateX(-15px)', offset: 0.9}),
          style({opacity: 1, transform: 'translateX(0)',  offset: 1.0})
        ]))
      ])
    ])
  ]
})

export class ActorDetailsComponent implements OnInit{

  private actor: Actor;
  private resourcePromise: Promise<void>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private peopleSearchService: PeopleSearchService
  ) {};
  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      // '+' converst 'String' to 'Number'
      let resource_id = params['resource_id'];
      this.resourcePromise = this.peopleSearchService.searchActor(resource_id)
          .then(actor => {
            this.actor = actor;
            this.actor.filmography.forEach(function(film) {
              film['year'] = film['year'] ==="" ? "3000" : film['year'].replace(/&nbsp;/g, "");
            })
          });
    })
  }
  goToIMDB(filmInfo: string):void {
    console.log("filmInfo: ", filmInfo);
    let link = [filmInfo];
    this.router.navigate(link);
  }
  goBack():void {
    this.location.back();
  }
  filmographyLoading(event: AnimationTransitionEvent): void {
    console.log("list loading");
    console.log(event);
  }
  filmographyLoaded(event: AnimationTransitionEvent):void {
    console.log("list loaded");
    console.log(event);
  }
}
