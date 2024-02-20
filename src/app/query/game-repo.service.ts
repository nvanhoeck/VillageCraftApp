import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Game} from "../domain/game";

@Injectable({
  providedIn: 'root'
})
export class GameRepoService {
  private readonly game$ = new Subject<Game>()

  constructor() {
  }

  public update(game: Game) {
    this.game$.next(game)
  }

  public getGame$() {
    return this.game$.asObservable()
  }
}
