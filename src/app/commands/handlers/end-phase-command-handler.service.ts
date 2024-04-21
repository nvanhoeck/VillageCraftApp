import {Injectable} from '@angular/core';
import {CommandHandler} from "./command-handler";
import {Command} from "../model/command";
import {CommandBusService} from "../command-bus.service";
import {GameStoreService} from "../../store/game-store.service";
import {EventBusService} from "../../events/event-bus.service";
import {MessagesAdapterService} from "../../adapters/events/messages-adapter.service";
import {isEndPhaseCommand} from "../model/end-phase-command";
import {GamePhaseStartedEvent} from "../../events/model/GamePhaseStarted";
import {PlayerPhaseStartedEvent} from "../../events/model/PlayerPhaseStarted";

@Injectable({
  providedIn: 'root'
})
export class EndPhaseCommandHandlerService implements CommandHandler {

  constructor(
    private commandBus: CommandBusService,
    private gameStore: GameStoreService,
    private eventBus: EventBusService,
    private errorMessageService: MessagesAdapterService
  ) {
    this.commandBus.registerHandler('EndPhase', this)
  }

  execute(cmd: Command): void {
    if (isEndPhaseCommand(cmd)) {
      const game = this.gameStore.get(cmd.payload.gameId);
      const hasGamePhaseEnded = game.endPhase(cmd.payload.playerId)
      const player = game.players.find((p) => p.id === cmd.payload.playerId)!
      this.eventBus.on(new PlayerPhaseStartedEvent({gameId: game.id, playerId: cmd.payload.playerId, nextPhase: player.findInPhase() }))
      if(hasGamePhaseEnded) {
        this.eventBus.on(new GamePhaseStartedEvent({gameId: game.id, nextPhase: game.phase }))
      }
    } else {
      this.errorMessageService.publish({
        level: 'ERROR', message: `Wrong command sent for EndPhaseCommandHandlerService for ${cmd.type}`,
        topic: "APPLICATION-ERROR"
      })
    }
  }
}
