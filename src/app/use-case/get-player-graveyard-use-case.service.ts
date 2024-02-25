import {Injectable} from '@angular/core';
import {GameProjectionService} from "../query/game/game-projection.service";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GetPlayerGraveyardUseCaseService {

  constructor(private projectionService: GameProjectionService) {
  }

  getPlayerGraveyard$(playerId: string) {
    return this.projectionService.getPlayer$(playerId).pipe(map((player) => {
      return player.findGraveyard()
    }))
  }
}
