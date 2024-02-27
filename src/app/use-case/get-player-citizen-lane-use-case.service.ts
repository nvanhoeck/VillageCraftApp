import {Injectable} from '@angular/core';
import {GameProjectionService} from "../query/game/game-projection.service";
import {map, Observable} from "rxjs";
import {Lane} from "../domain/lane";

@Injectable({
  providedIn: 'root'
})
export class GetPlayerCitizenLaneUseCaseService {

  constructor(private projectionService: GameProjectionService) {
  }

  getPlayerCitizenLane$(playerId: string): Observable<Lane> {
    return this.projectionService.getPlayer$(playerId).pipe(map((player) => {
      return player.findCitizenLane()
    }))
  }
}
