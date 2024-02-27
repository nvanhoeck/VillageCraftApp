import {Injectable} from '@angular/core';
import {CommandHandler} from "./command-handler";
import {Command} from "../model/command";
import {CommandBusService} from "../command-bus.service";
import {GameStoreService} from "../../store/game-store.service";
import {EventBusService} from "../../events/event-bus.service";
import {MessagesAdapterService} from "../../adapters/events/messages-adapter.service";
import {isRemoveCardFromCommand} from "../model/remove-card-from-command";

@Injectable({
  providedIn: 'root'
})
export class RemoveCardFromCommandHandlerService implements CommandHandler {

  constructor(
    private commandBus: CommandBusService,
    private gameStore: GameStoreService,
    private eventBus: EventBusService,
    private errorMessageService: MessagesAdapterService,
  ) {
    commandBus.registerHandler('RemoveCardFrom', this)
  }

  execute(cmd: Command): void {
    if (isRemoveCardFromCommand(cmd)) {
      const game = this.gameStore.get(cmd.payload.gameId);
      if (cmd.payload.from === 'HAND') {
        game.players.find((player) => player.removeCardFromHand(cmd.payload.cardId))
        // TODO
        this.eventBus.on()
      } else {
        this.errorMessageService.publish({
          level: 'ERROR',
          message: `No suitable logic found for ${cmd.payload.from} in RemoveCardFromCommandHandlerService for ${cmd.type}`,
          topic: "APPLICATION-ERROR"
        })
      }
    } else {
      this.errorMessageService.publish({
        level: 'ERROR', message: `Wrong command sent for RemoveCardFromCommandHandlerService for ${cmd.type}`,
        topic: "APPLICATION-ERROR"
      })
    }
  }
}
