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
import {isExhaustCardCommand} from "../model/exhaust-card-command";
import {PlayerMulliganedEvent} from "../../events/model/PlayerMulliganed";
import {CardExhaustedEvent} from "../../events/model/CardExhaustedEvent";

@Injectable({
  providedIn: 'root'
})
export class ExhaustCardCommandHandlerService implements CommandHandler {

  constructor(
    private commandBus: CommandBusService,
    private gameStore: GameStoreService,
    private eventBus: EventBusService,
    private errorMessageService: MessagesAdapterService
  ) {
    this.commandBus.registerHandler('ExhaustCard', this)
  }

  execute(cmd: Command): void {
    if (isExhaustCardCommand(cmd)) {
      const game = this.gameStore.get(cmd.payload.gameId);
      const player = game.players.find((player) => player.id === cmd.payload.playerId)
      if (!player) {
        this.errorMessageService.publish({
          level: 'ERROR', message: `Player not found in ExhaustCardCommandHandlerService for ${cmd.payload.playerId}`,
          topic: "APPLICATION-ERROR"
        })
      } else {
        player.exhaustCard(cmd.payload.cardId, cmd.payload.gamePhase, cmd.payload.gameSpace);
        debugger
        this.eventBus.on(new CardExhaustedEvent({
          cardId: cmd.payload.cardId,
          gameId: cmd.payload.gameId,
          playerId: cmd.payload.playerId,
          gamePhase: cmd.payload.gamePhase,
          gameSpace: cmd.payload.gameSpace
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
