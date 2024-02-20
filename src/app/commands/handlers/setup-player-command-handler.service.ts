import {Injectable} from '@angular/core';
import {CommandHandler} from "./command-handler";
import {Command} from "../model/command";
import {GameEventStoreService} from "../../events/game-event-store.service";
import {isSetupPlayerCommand} from "../model/setup-player-command";
import {GameProjectionService} from "../../query/game-projection.service";
import {Player} from "../../domain/player";
import {EventBusService} from "../../events/event-bus.service";
import {PlayerCreatedEvent} from "../../events/model/PlayerCreatedEvent";
import {GameRepoService} from "../../query/game-repo.service";

@Injectable({
  providedIn: 'root'
})
export class SetupPlayerCommandHandlerService implements CommandHandler {

  constructor(private eventStore: GameEventStoreService, private projectionStore: GameProjectionService, private eventBus: EventBusService, private gameRepo: GameRepoService) {
  }

  execute(cmd: Command): void {
    if (isSetupPlayerCommand(cmd)) {
      const game = this.projectionStore.getGame()
      const player = new Player()
      // TODO v4 id
      player.createPlayer(cmd.payload.playerType === 'HUMAN' ? 'niko' : 'pc', cmd.payload.playerType)
      game.addPlayer(player)
      const playerCreatedEvent = new PlayerCreatedEvent();
      playerCreatedEvent.apply(game.id, player.playerType)
      this.eventStore.applyChange(playerCreatedEvent)
      this.eventBus.on(playerCreatedEvent)
      this.gameRepo.update(game)
    } else {
      // TODO sent event to error handler
    }
  }
}
