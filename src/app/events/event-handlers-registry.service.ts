import {Injectable} from '@angular/core';
import {GameProjectionService} from "../query/game/game-projection.service";
import {GamePhaseFacadeService} from "../facades/game-phase-facade.service";

@Injectable({
  providedIn: 'root'
})
export class EventHandlersRegistryService {

  constructor(private gameProjectionService: GameProjectionService,
              private gamePhaseFacadeService: GamePhaseFacadeService) {
  }
}
