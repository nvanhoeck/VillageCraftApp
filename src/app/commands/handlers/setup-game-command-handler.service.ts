import {Injectable} from '@angular/core';
import {CommandHandler} from "./command-handler";
import {isSetupGameCommand} from "../model/setup-game-command";
import {Command} from "../model/command";
import {Game} from "../../domain/game";
import {CommandBusService} from "../command-bus.service";
import {GameStoreService} from "../../store/game-store.service";
import {EventBusService} from "../../events/event-bus.service";
import {GameCreatedEvent} from "../../events";
import {MessagesAdapterService} from "../../adapters/events/messages-adapter.service";

@Injectable({
  providedIn: 'root'
})
export class SetupGameCommandHandlerService implements CommandHandler {

  constructor(
    private commandBus: CommandBusService,
    private gameStore: GameStoreService,
    private eventBus: EventBusService,
    private errorMessageService: MessagesAdapterService
  ) {
    commandBus.registerHandler('SetupGame', this)
  }

  execute(cmd: Command): void {
    if (isSetupGameCommand(cmd)) {
      const game = new Game(cmd.payload.id, cmd.payload.gameType)
      this.gameStore.create(game)
      this.eventBus.on(new GameCreatedEvent({id: game.id, type: game.gameType}))
    } else {
      this.errorMessageService.publish({
        level: 'ERROR', message: `Wrong command sent for SetupGameCommandHandlerService for ${cmd.type}`,
        topic: "APPLICATION-ERROR"
      })
    }
  }
}
