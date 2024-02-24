import {Injectable} from '@angular/core';
import {GameProjectionService} from "../query/game/game-projection.service";

@Injectable({
  providedIn: 'root'
})
export class EventHandlersRegistryService {

  constructor(private gameProjectionService: GameProjectionService) {
  }
}
