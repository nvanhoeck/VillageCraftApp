import { Injectable } from '@angular/core';
import {ReplaySubject} from "rxjs";
import {GameCreatedEvent} from "./model/GameCreatedEvent";
import {Event} from './model/event'

@Injectable({
  providedIn: 'root'
})
export class GameEventStoreService {
  private gameStore$ = new ReplaySubject<Event[]>()
  constructor() {
    this.gameStore$.next([])
  }

  applyChange(gameCreatedEvent: GameCreatedEvent) {
    this.gameStore$.subscribe((gameEvents) => this.gameStore$.next([...gameEvents, gameCreatedEvent]))
  }
}
