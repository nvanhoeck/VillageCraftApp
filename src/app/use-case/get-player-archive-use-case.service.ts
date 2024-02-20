import {Injectable} from '@angular/core';
import {GameProjectionService} from "../query/game-projection.service";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GetPlayerArchiveUseCaseService {

  constructor(private projectionService: GameProjectionService) {
  }

  getPlayerArchive$(playerId: string) {
    return this.projectionService.getPlayer$(playerId).pipe(map((player) => {
      return player.findArchive()
    }))
  }
}
