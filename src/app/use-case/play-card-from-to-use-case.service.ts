import { Injectable } from '@angular/core';
import { CommandBusService } from '../commands/command-bus.service';
import { PlayCardFromToCommand } from '../commands/model/play-card-from-to-command';
import { GameSpace } from '../domain/game-space';
import { PlayCardSagaService } from '../sagas/play-card-saga.service';
import { MessagesAdapterService } from '../adapters/events/messages-adapter.service';
import { CardActionSagaService } from '../sagas/card-action-saga.service';

@Injectable({
    providedIn: 'root',
})
export class PlayCardFromToUseCaseService {
    constructor(
        private commandBus: CommandBusService,
        private playCardSaga: PlayCardSagaService,
        private cardActionSagaService: CardActionSagaService,
        private errorMessageService: MessagesAdapterService
    ) {}

    playCardFromTo(
        from: GameSpace,
        to: GameSpace,
        cardId: string,
        playerId: string,
        gameId: string
    ) {
        if (from === 'HAND') {
            this.playFromHand(from, to, cardId, playerId, gameId);
        }
    }

    private playFromHand(
        from: 'HAND',
        to: GameSpace,
        cardId: string,
        playerId: string,
        gameId: string
    ) {
        switch (to) {
            case 'ARCHIVE':
                this.commandBus.on(
                    new PlayCardFromToCommand({
                        from,
                        to,
                        cardId,
                        playerId,
                        gameId: gameId,
                    })
                );
                break;
            case 'BUILDING_LANE':
            case 'CITIZEN_LANE':
                this.playCardSaga.playFromHandTo(to, cardId, playerId, gameId);
                break;
            default:
                this.errorMessageService.publish({
                    level: 'ERROR',
                    message: `No command defined for play card from hand to ${to} in LoadPlayerBaseDecksCommandHandlerService`,
                    topic: 'APPLICATION-ERROR',
                });
        }
    }
}
