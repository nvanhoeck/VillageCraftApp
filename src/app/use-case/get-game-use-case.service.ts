import {Injectable} from '@angular/core';
import {GameProjectionService} from "../query/game-projection.service";

@Injectable({
  providedIn: 'root'
})
export class GetGameUseCaseService {

  constructor(private projectionService: GameProjectionService) {
  }

  public getGame$() {
    return this.projectionService.getGame$()
  }
}
