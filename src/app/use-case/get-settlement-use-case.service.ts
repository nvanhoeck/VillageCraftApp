import {Injectable} from '@angular/core';
import {GameProjectionService} from "../query/game/game-projection.service";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GetSettlementUseCaseService {

  constructor(private projectionService: GameProjectionService) {
  }

  public getSettlement$(playerId: string) {
    return this.projectionService.getPlayer$(playerId).pipe(map((player) => {
      const settlement = player.findSettlement();
      console.log('hello', settlement)
      return settlement
    }))
  }
}
