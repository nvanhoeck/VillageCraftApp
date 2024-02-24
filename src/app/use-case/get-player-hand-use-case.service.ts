import {Injectable} from '@angular/core';
import {GameProjectionService} from "../query/game/game-projection.service";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GetPlayerHandUseCaseService {

  constructor(private projectionService: GameProjectionService) {
  }

  getPlayerHand$(playerId: string) {
    return this.projectionService.getPlayer$(playerId).pipe(map((player) => {
      return player.findHand()
    }))
  }
}
