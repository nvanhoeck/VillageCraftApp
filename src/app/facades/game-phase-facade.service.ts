import {Injectable} from '@angular/core';
import {MessagesAdapterService} from "../adapters/events/messages-adapter.service";
import {EventBusService} from "../events/event-bus.service";
import {EventHandler} from "../events/event-handler";
import {GameEvent} from "../events/model/gameEvent";
import {GameProjectionService} from "../query/game/game-projection.service";

@Injectable({
  providedIn: 'root'
})
export class GamePhaseFacadeService implements EventHandler {

  constructor(private messageAdapterService: MessagesAdapterService,
              private eventBus: EventBusService,
              private gameProjectionService: GameProjectionService) {
    this.eventBus.registerHandler('MulliganPhaseStarted', this)
    this.eventBus.registerHandler('GameInitiated', this)
  }

  execute(event: GameEvent): void {
    if (event.type === 'MulliganPhaseStarted') {
      this.messageAdapterService.publish({
        level: "INFO",
        topic: 'GAME-OVERLAY',
        message: 'Mulligan Phase Started',
        subMessage: 'Pick the cards you want to replace'
      })
    } else if (event.type === 'GameInitiated') {
      this.messageAdapterService.publish({
        level: "INFO",
        topic: 'GAME-OVERLAY',
        message: 'The Game has been started'
      })
      setTimeout(() => {
        this.messageAdapterService.publish({
          level: "INFO",
          topic: 'GAME-OVERLAY',
          message: 'Production Phase',
          subMessage: 'Exhaust the buildings to produce resources'
        })
      }, 3001)
    }
  }

  getGamePhase$(gameId: string) {
    return this.gameProjectionService.getGamePhase$(gameId);
  }
}
