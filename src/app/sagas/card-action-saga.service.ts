import { Injectable } from '@angular/core';
import {CommandBusService} from "../commands/command-bus.service";
import {EventBusService} from "../events/event-bus.service";
import {MessagesAdapterService} from "../adapters/events/messages-adapter.service";
import {GameSpace} from "../query/model/game-space";
import {GamePhase} from "../query/model/game-card-vo";
import {ExhaustCardCommand} from "../commands/model/exhaust-card-command";

@Injectable({
  providedIn: 'root'
})
export class CardActionSagaService {

  constructor(private commandBus: CommandBusService, private eventBus: EventBusService, private errorMessageService: MessagesAdapterService) { }

  exhaustCard(gameSpace: GameSpace, cardId: string, gamePhase: GamePhase, gameId: string, playerId: string) {
    this.commandBus.on(new ExhaustCardCommand({
      gameSpace, cardId, gamePhase, gameId, playerId
    }))
  }
}
