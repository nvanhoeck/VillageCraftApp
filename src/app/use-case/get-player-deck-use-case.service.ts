import {Injectable} from '@angular/core';
import {GameProjectionService} from "../query/game-projection.service";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GetPlayerDeckUseCaseService {

  constructor(private projectionService: GameProjectionService) {
  }

  getPlayerDeck$(playerId: string) {
    return this.projectionService.getPlayer$(playerId).pipe(map((player) => {
      return player.findDeck()
    }))
  }
}
