import { Injectable } from '@angular/core';
import { CommandHandler } from './command-handler';
import { Command } from '../model/command';
import { isSetupPlayerCommand } from '../model/setup-player-command';
import { CommandBusService } from '../command-bus.service';
import { GameStoreService } from '../../store/game-store.service';
import { EventBusService } from '../../events/event-bus.service';
import { MessagesAdapterService } from '../../adapters/events/messages-adapter.service';
import { Player } from '../../domain/player';
import { PlayerCreatedEvent } from '../../events/model/PlayerCreatedEvent';

@Injectable({
    providedIn: 'root',
})
export class SetupPlayerCommandHandlerService implements CommandHandler {
    constructor(
        private commandBus: CommandBusService,
        private gameStore: GameStoreService,
        private eventBus: EventBusService,
        private errorMessageService: MessagesAdapterService
    ) {
        commandBus.registerHandler('SetupPlayer', this);
    }

    execute(cmd: Command): void {
        if (isSetupPlayerCommand(cmd)) {
            const playerId = cmd.payload.playerId;
            const game = this.gameStore.get(cmd.payload.gameId);
            const player = new Player(playerId);
            game.addPlayer(player);
            this.eventBus.on(
                new PlayerCreatedEvent({
                    id: player.id,
                    playerType: player.playerType,
                    gameId: game.id,
                })
            );
        } else {
            this.errorMessageService.publish({
                level: 'ERROR',
                message: `Wrong command sent for SetupPlayerCommandHandlerService for ${cmd.type}`,
                topic: 'APPLICATION-ERROR',
            });
        }
    }
}
