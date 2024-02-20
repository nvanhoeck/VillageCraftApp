import {Injectable} from '@angular/core';
import {BehaviorSubject, map} from "rxjs";
import {Game} from "../domain/game";
import {GameRepoService} from "./game-repo.service";

@Injectable({
  providedIn: 'root'
})
export class GameProjectionService {
  private game$ = new BehaviorSubject<Game>(new Game())

  constructor(private gameRepo: GameRepoService) {
    this.gameRepo.getGame$().subscribe((game) => this.game$.next(game))
  }

  public getGame$() {
    return this.game$.asObservable()
  }

  public getGame() {
    return this.game$.value
  }

  getPlayer$(playerId: string) {
    return this.game$.asObservable().pipe(map((game) => {
      console.log(game)
      const foundPlayer = game.players.find((player) => player.id === playerId)
      if (!foundPlayer) {
        // TODO throw event error
        throw new Error()
      } else {
        return foundPlayer
      }
    }))
  }
}
