import {
  Component,
  trigger,
  state,
  style,
  transition,
  animate,
  AnimationTransitionEvent
} from '@angular/core';
import {PeopleSearchService} from './people-search.service';

import { Observable }       from 'rxjs/Observable';
import { Subject }          from 'rxjs/Subject';
import {Router} from '@angular/router';
import {People} from './people';

@Component({
  moduleId: module.id,
  selector: 'dashboard',
  templateUrl:'../dashboard.component.html',
  styleUrls: ['../dashboard.component.css'],
  providers: [PeopleSearchService],
  animations: [
    trigger('flyInOut', [
      state('in', style({
        transform: 'translateX(0)',
      })),
      transition('void => in', [
        style({
          transform: 'translateX(-100%)',
        }),
        animate('1s ease-in')
      ]),
      transition('* => void', [
        style({
          transform: 'translateX(100%)'
        }),
        animate('1s ease-out')
      ])
    ]),
    trigger('fadeIn', [
      state('loaded', style({
        opacity: 1,
      })),
      transition("void => loaded", [
        style({
          opacity: 0
        }),
        animate('2s ease-out')
      ])
    ])
  ]
})

export class DashboardComponent {
  /* class variables*/
  private peopleSearchTermStream = new Subject<string>();
  private selectedActor: string;
  matched_people: Observable<void> = this.peopleSearchTermStream
      //how long we wait for the user to stop typing
      .debounceTime(300)
      .distinctUntilChanged()
      //returns the most recent search result
      .switchMap((term: string) =>
        //expects this to return "Obervable"
        this.peopleSearchService.searchPeople(term)
      )
  constructor(
    private peopleSearchService: PeopleSearchService,
    private router: Router
  ) {};

  searchActor(term: string) {
    this.peopleSearchTermStream.next(term);
  }
  /*
   * @selected:
   */
  requestActorDetails(selected: People) {
    let link = ['actor-details', selected.id];
    this.router.navigate(link);
  }
  animationStarted(event:AnimationTransitionEvent) {
    console.log("animation enter");
    console.log(event);
  }
  animationDone(event:AnimationTransitionEvent) {
    console.log("animation leave");
    console.log(event);
  }
}
