import {Injectable} from '@angular/core';
import {CommandHandler} from "./command-handler";
import {Command} from "../model/command";
import {CommandBusService} from "../command-bus.service";
import {GameStoreService} from "../../store/game-store.service";
import {EventBusService} from "../../events/event-bus.service";
import {MessagesAdapterService} from "../../adapters/events/messages-adapter.service";
import {CardExhaustedEvent} from "../../events/model/CardExhaustedEvent";
import {isGainWoodCardActionCardCommand} from "../model/gain-wood-card-action-command";
import {PlayerGainedWoodEvent} from "../../events/model/PlayerGainedWoodEvent";

@Injectable({
  providedIn: 'root'
})
export class GainWoodCardActionCommandHandlerService implements CommandHandler {

  constructor(
    private commandBus: CommandBusService,
    private gameStore: GameStoreService,
    private eventBus: EventBusService,
    private errorMessageService: MessagesAdapterService
  ) {
    this.commandBus.registerHandler('GainWoodCardActionCard', this)
  }

  execute(cmd: Command): void {
    if (isGainWoodCardActionCardCommand(cmd)) {
      const game = this.gameStore.get(cmd.payload.gameId);
      const player = game.players.find((player) => player.id === cmd.payload.playerId)
      if (!player) {
        this.errorMessageService.publish({
          level: 'ERROR', message: `Player not found in GainWoodCardActionCommandHandlerService for ${cmd.payload.playerId}`,
          topic: "APPLICATION-ERROR"
        })
      } else {
        let amount = player.gainWoodFromCard(cmd.payload.cardId, cmd.payload.gamePhase, cmd.payload.gameSpace);
        this.eventBus.on(new CardExhaustedEvent({
          cardId: cmd.payload.cardId,
          gameId: cmd.payload.gameId,
          playerId: cmd.payload.playerId,
          gamePhase: cmd.payload.gamePhase,
          gameSpace: cmd.payload.gameSpace
        }))

        this.eventBus.on(new PlayerGainedWoodEvent({
          cardId: cmd.payload.cardId,
          gameId: cmd.payload.gameId,
          playerId: cmd.payload.playerId,
          amount
        }))
      }
    } else {
      this.errorMessageService.publish({
        level: 'ERROR', message: `Wrong command sent for ExhaustCardCommandHandlerService for ${cmd.type}`,
        topic: "APPLICATION-ERROR"
      })
    }
  }
}
