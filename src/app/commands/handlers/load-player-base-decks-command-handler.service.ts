import {Injectable} from '@angular/core';
import {CommandHandler} from "./command-handler";
import {Command} from "../model/command";
import {GameEventStoreService} from "../../events/game-event-store.service";
import {GameProjectionService} from "../../query/game-projection.service";
import {EventBusService} from "../../events/event-bus.service";
import {GameRepoService} from "../../query/game-repo.service";
import {isLoadPlayerBaseDecksCommand} from "../model/load-player-base-decks-command";
import {GameDeckAdapterService} from "../../adapters/cards/game-deck-adapter.service";
import {PlayerBaseDecksLoadedEvent} from "../../events/model/PlayerBaseDecksLoadedEvent";
import {first} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadPlayerBaseDecksCommandHandlerService implements CommandHandler {

  constructor(private eventStore: GameEventStoreService, private projectionStore: GameProjectionService,
              private eventBus: EventBusService, private gameRepo: GameRepoService,
              private deckAdapterService: GameDeckAdapterService) {
  }

  execute(cmd: Command): void {
    if (isLoadPlayerBaseDecksCommand(cmd)) {
      const game = this.projectionStore.getGame()

      this.deckAdapterService.loadBaseDeck().pipe(first()).subscribe((baseCards) => {
        game.players.forEach((player) => {
          player.loadBaseDeck(baseCards)
          const playerDeckLoadedEvent = new PlayerBaseDecksLoadedEvent();
          playerDeckLoadedEvent.apply(player)
          this.eventStore.applyChange(playerDeckLoadedEvent)
          this.eventBus.on(playerDeckLoadedEvent)
          this.gameRepo.update(game)
        })
      })
    } else {
      // TODO sent event to error handler
    }
  }
}
