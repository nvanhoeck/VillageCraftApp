import {Injectable} from '@angular/core';
import {CommandBusService} from "../commands/command-bus.service";
import {PlayCardFromToCommand} from "../commands/model/play-card-from-to-command";
import {GameSpace} from "../domain/game-space";
import {PlayCardSagaService} from "../sagas/play-card-saga.service";
import {MessagesAdapterService} from "../adapters/events/messages-adapter.service";
import {GamePhase} from "../domain/game-card";
import {CardActionSagaService} from "../sagas/card-action-saga.service";

@Injectable({
  providedIn: 'root'
})
export class TriggerCardEffectUseCaseService {

  constructor(private commandBus: CommandBusService, private playCardSaga: PlayCardSagaService, private cardActionSagaService: CardActionSagaService,private errorMessageService: MessagesAdapterService) {
  }

  exhaustCard(gameSpace: GameSpace, cardId: string, gamePhase: GamePhase, gameId: string, playerId: string) {
    this.cardActionSagaService.exhaustCard(gameSpace, cardId, gamePhase, gameId, playerId)
  }

  gainFood(gameSpace: GameSpace, cardId: string, gamePhase: GamePhase, gameId: string, playerId: string) {
    this.cardActionSagaService.gainFood(gameSpace, cardId, gamePhase, gameId, playerId)
  }
}
