import { Injectable } from '@angular/core';
import { CommandHandler } from './command-handler';
import { Command } from '../model/command';
import { CommandBusService } from '../command-bus.service';
import { GameStoreService } from '../../store/game-store.service';
import { EventBusService } from '../../events/event-bus.service';
import { MessagesAdapterService } from '../../adapters/events/messages-adapter.service';
import { isMulliganCommand } from '../model/mulligan-command';
import { PlayerMulliganedEvent } from '../../events/model/PlayerMulliganed';

@Injectable({
    providedIn: 'root',
})
export class MulliganCommandHandlerService implements CommandHandler {
    constructor(
        private commandBus: CommandBusService,
        private gameStore: GameStoreService,
        private eventBus: EventBusService,
        private errorMessageService: MessagesAdapterService
    ) {
        commandBus.registerHandler('Mulligan', this);
    }

    execute(cmd: Command): void {
        if (isMulliganCommand(cmd)) {
            if (cmd.payload.cardIds.length > 0) {
                const game = this.gameStore.get(cmd.payload.gameId);
                const player = game.players.find(
                    player => player.id === cmd.payload.playerId
                );
                if (!player) {
                    this.errorMessageService.publish({
                        level: 'ERROR',
                        message: `Player not foun in MulliganCommandHandlerService for ${cmd.payload.playerId}`,
                        topic: 'APPLICATION-ERROR',
                    });
                } else {
                    player.mulligan(cmd.payload.cardIds);
                    this.eventBus.on(new PlayerMulliganedEvent({ player }));
                }
            }
        } else {
            this.errorMessageService.publish({
                level: 'ERROR',
                message: `Wrong command sent for MulliganCommandHandlerService for ${cmd.type}`,
                topic: 'APPLICATION-ERROR',
            });
        }
    }
}
