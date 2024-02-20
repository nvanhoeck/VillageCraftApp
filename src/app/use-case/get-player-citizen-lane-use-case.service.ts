import {Injectable} from '@angular/core';
import {GameProjectionService} from "../query/game-projection.service";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GetPlayerCitizenLaneUseCaseService {

  constructor(private projectionService: GameProjectionService) {
  }

  getPlayerCitizenLane$(playerId: string) {
    return this.projectionService.getPlayer$(playerId).pipe(map((player) => {
      return player.findCitizenLane()
    }))
  }
}
