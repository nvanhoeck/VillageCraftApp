import { Injectable } from '@angular/core';
import {CommandHandler} from "./command-handler";
import {isSetupGameCommand} from "../model/setup-game-command";
import {Command} from "../model/command";
import {CommandBusService} from "../command-bus.service";
import {GameEventStoreService} from "../../events/game-event-store.service";
import {Game} from "../../domain/game";
import {GameCreatedEvent} from "../../events";

@Injectable({
  providedIn: 'root'
})
export class SetupGameCommandHandlerService implements CommandHandler{

  constructor(private commandBus: CommandBusService, private eventStore: GameEventStoreService) {
    this.commandBus.registerHandler('SetupGame', this)
  }

  execute(cmd: Command): void {
    if(isSetupGameCommand(cmd)) {
      const game = new Game()
      game.createGame('1', cmd.payload.gameType)
      const gameCreatedEvent = new GameCreatedEvent();
      gameCreatedEvent.apply(game.id, game.gameType)
      this.eventStore.applyChange(gameCreatedEvent)
    } else {
      // TODO sent event to error handler
    }
  }
}
