import {Injectable} from '@angular/core';
import {CommandHandler} from "./command-handler";
import {Command} from "../model/command";
import {CommandBusService} from "../command-bus.service";
import {GameStoreService} from "../../store/game-store.service";
import {EventBusService} from "../../events/event-bus.service";
import {MessagesAdapterService} from "../../adapters/events/messages-adapter.service";
import {isMulliganPhaseCommand} from "../model/mulligan-phase-command";
import {MulliganPhaseStartedEvent} from "../../events/model/MulliganPhaseStartedEvent";

@Injectable({
  providedIn: 'root'
})
export class MulliganPhaseCommandHandlerService implements CommandHandler {

  constructor(
    private commandBus: CommandBusService,
    private gameStore: GameStoreService,
    private eventBus: EventBusService,
    private errorMessageService: MessagesAdapterService
  ) {
    commandBus.registerHandler('MulliganPhase', this)
  }

  execute(cmd: Command): void {
    if (isMulliganPhaseCommand(cmd)) {
      const game = this.gameStore.get(cmd.payload.gameId);
      game.startMulliganPhase()
      this.eventBus.on(new MulliganPhaseStartedEvent({gameId: game.id}))
    } else {
      this.errorMessageService.publish({
        level: 'ERROR', message: `Wrong command sent for MulliganPhaseCommandHandlerService for ${cmd.type}`,
        topic: "APPLICATION-ERROR"
      })
    }
  }
}
