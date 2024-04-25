import { Injectable } from '@angular/core';
import { CommandHandler } from './command-handler';
import { Command } from '../model/command';
import { isLoadPlayerBaseDecksCommand } from '../model/load-player-base-decks-command';
import { CommandBusService } from '../command-bus.service';
import { GameStoreService } from '../../store/game-store.service';
import { EventBusService } from '../../events/event-bus.service';
import { MessagesAdapterService } from '../../adapters/events/messages-adapter.service';
import { GameDeckAdapterService } from '../../adapters/cards/game-deck-adapter.service';
import { first } from 'rxjs';
import { PlayerBaseDecksLoadedEvent } from '../../events/model/PlayerBaseDecksLoadedEvent';

@Injectable({
    providedIn: 'root',
})
export class LoadPlayerBaseDecksCommandHandlerService
    implements CommandHandler
{
    constructor(
        private commandBus: CommandBusService,
        private gameStore: GameStoreService,
        private eventBus: EventBusService,
        private errorMessageService: MessagesAdapterService,
        private deckAdapterService: GameDeckAdapterService
    ) {
        commandBus.registerHandler('LoadPlayerBaseDecks', this);
    }

    execute(cmd: Command): void {
        if (isLoadPlayerBaseDecksCommand(cmd)) {
            const game = this.gameStore.get(cmd.payload.gameId);
            this.deckAdapterService
                .loadBaseDeck()
                .pipe(first())
                .subscribe(baseCards => {
                    game.players.forEach(player => {
                        player.loadBaseDeck(baseCards);
                        this.eventBus.on(
                            new PlayerBaseDecksLoadedEvent({ player: player })
                        );
                    });
                });
        } else {
            this.errorMessageService.publish({
                level: 'ERROR',
                message: `Wrong command sent for LoadPlayerBaseDecksCommandHandlerService for ${cmd.type}`,
                topic: 'APPLICATION-ERROR',
            });
        }
    }
}
