import {Injectable} from '@angular/core';
import {CommandHandler} from "./command-handler";
import {isSetupGameCommand} from "../model/setup-game-command";
import {Command} from "../model/command";
import {GameEventStoreService} from "../../events/game-event-store.service";
import {Game} from "../../domain/game";
import {GameCreatedEvent} from "../../events";
import {EventBusService} from "../../events/event-bus.service";
import {GameRepoService} from "../../query/game-repo.service";

@Injectable({
  providedIn: 'root'
})
export class SetupGameCommandHandlerService implements CommandHandler {

  constructor(private eventStore: GameEventStoreService, private eventBus: EventBusService, private gameRepo: GameRepoService) {
  }

  execute(cmd: Command): void {
    if (isSetupGameCommand(cmd)) {
      const game = new Game()
      game.createGame('1', cmd.payload.gameType)
      const gameCreatedEvent = new GameCreatedEvent();
      gameCreatedEvent.apply(game.id, game.gameType)
      this.eventStore.applyChange(gameCreatedEvent)
      this.eventBus.on(gameCreatedEvent)
      this.gameRepo.update(game)
    } else {
      // TODO sent event to error handler
    }
  }
}
