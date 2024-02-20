import {Injectable} from '@angular/core';
import {BehaviorSubject, take} from "rxjs";
import {GameEvent} from "./model/gameEvent";
import {EventHandler} from "./event-handler";

@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  private handlers$: BehaviorSubject<{ [key: string]: EventHandler[] }> = new BehaviorSubject({})

  constructor() {
    this.handlers$.next({
      'GameCreated': [],
      'PlayerCreated': [],
      'PlayerBaseDecksLoaded': [],

    })
  }

  on(event: GameEvent) {
    this.handlers$.pipe(take(1)).subscribe((handlers) => {
      handlers[event.type].forEach((handler) => handler.execute(event))
    });
  }
}
