import {Injectable} from '@angular/core';
import {MessagesAdapterService} from "../adapters/events/messages-adapter.service";
import {EventBusService} from "../events/event-bus.service";
import {EventHandler} from "../events/event-handler";
import {GameEvent} from "../events/model/gameEvent";
import {GameProjectionService} from "../query/game/game-projection.service";
import {CommandBusService} from "../commands/command-bus.service";
import {EndPhaseCommand} from "../commands/model/end-phase-command";

@Injectable({
  providedIn: 'root'
})
export class GamePhaseFacadeService implements EventHandler {

  constructor(private messageAdapterService: MessagesAdapterService,
              private eventBus: EventBusService,
              private commandBus: CommandBusService,
              private gameProjectionService: GameProjectionService) {
    this.eventBus.registerHandler('MulliganPhaseStarted', this)
    this.eventBus.registerHandler('GameInitiated', this)
    this.eventBus.registerHandler('GamePhaseStarted', this)
  }

  execute(event: GameEvent): void {
   switch (event.type) {
     case 'MulliganPhaseStarted':
      this.messageAdapterService.publish({
        level: "INFO",
        topic: 'GAME-OVERLAY',
        message: 'Mulligan Phase Started',
        subMessage: 'Pick the cards you want to replace'
      })
       break;
     case 'GameInitiated':
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
      }, 3001);
      break;
     case 'GamePhaseStarted':
       this.messageAdapterService.publish({
         level: "INFO",
         topic: 'GAME-OVERLAY',
         message: 'Action Phase',
         subMessage: 'Play cards from hand, exhaust to build, claim location, attack and do special actions.'
       })
    }
  }

  getGamePhase$(gameId: string) {
    return this.gameProjectionService.getGamePhase$(gameId);
  }

  getGamePhase(gameId: string) {
    return this.gameProjectionService.getGamePhase(gameId);
  }

  endPhase(gameId: string, playerId:string) {
    this.commandBus.on(new EndPhaseCommand({gameId, playerId}))
  }
}
