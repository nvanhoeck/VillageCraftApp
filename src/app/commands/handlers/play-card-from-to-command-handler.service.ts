import {Injectable} from '@angular/core';
import {CommandHandler} from "./command-handler";
import {Command} from "../model/command";
import {CommandBusService} from "../command-bus.service";
import {GameStoreService} from "../../store/game-store.service";
import {EventBusService} from "../../events/event-bus.service";
import {ErrorMessagesAdapterService} from "../../adapters/events/error-messages-adapter.service";
import {isPlayCardFromToCommand} from "../model/play-card-from-to-command";
import {CardPlayedToArchiveEvent} from "../../events/model/CardPlayedToArchiveEvent";
import {CardPlayerFromHandEvent} from "../../events/model/CardPlayedFromHandEvent";

@Injectable({
  providedIn: 'root'
})
export class PlayCardFromToCommandHandlerService implements CommandHandler {

  constructor(
    private commandBus: CommandBusService,
    private gameStore: GameStoreService,
    private eventBus: EventBusService,
    private errorMessageService: ErrorMessagesAdapterService,
  ) {
    commandBus.registerHandler('PlayCardFromTo', this)
  }

  execute(cmd: Command): void {
    if (isPlayCardFromToCommand(cmd)) {
      const game = this.gameStore.get(cmd.payload.gameId);
      if (cmd.payload.from === 'HAND' && cmd.payload.to === 'ARCHIVE') {
        game.playCardFromHandToArchive(cmd.payload.playerId, cmd.payload.cardId)
        const hand = game.players.find((player) => player.id === cmd.payload.playerId)?.findHand()
        const archive = game.players.find((player) => player.id === cmd.payload.playerId)?.findArchive()
        this.eventBus.on(new CardPlayerFromHandEvent({
          playerHand: hand!,
          playerId: cmd.payload.playerId,
          gameId: cmd.payload.gameId
        }))
        this.eventBus.on(new CardPlayedToArchiveEvent({
          archive: archive!,
          playerId: cmd.payload.playerId,
          gameId: cmd.payload.gameId
        }))
      } else {
        this.errorMessageService.publish({
          level: 'ERROR',
          message: `No suitable logic found for ${cmd.payload.from} and ${cmd.payload.to} in PlayCardFromToCommandHandlerService for ${cmd.type}`,
          topic: "APPLICATION-ERROR"
        })
      }
    } else {
      this.errorMessageService.publish({
        level: 'ERROR', message: `Wrong command sent for PlayCardFromToCommandHandlerService for ${cmd.type}`,
        topic: "APPLICATION-ERROR"
      })
    }
  }
}
