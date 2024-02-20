import {Injectable} from '@angular/core';
import {first, ReplaySubject} from "rxjs";
import {GameEvent} from './model/gameEvent'

@Injectable({
  providedIn: 'root'
})
export class GameEventStoreService {
  private gameStore$ = new ReplaySubject<GameEvent[]>(999)

  constructor() {
    this.gameStore$.next([])
  }

  applyChange(gameEvent: GameEvent) {
    this.gameStore$.pipe(first()).subscribe((gameEvents) => this.gameStore$.next([...gameEvents, gameEvent]))
  }
}
