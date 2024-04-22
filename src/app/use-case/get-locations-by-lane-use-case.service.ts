import {Injectable} from '@angular/core';
import {GameProjectionService} from "../query/game/game-projection.service";

@Injectable({
  providedIn: 'root'
})
export class GetLocationsByLaneUseCaseService {

  constructor(private projectionService: GameProjectionService) {
  }

  public getLocationsByLane$(gameId: string, row: number) {
    return this.projectionService.getLocationByLane$(gameId, row)
  }
}
