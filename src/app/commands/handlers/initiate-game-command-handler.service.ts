import { Injectable } from '@angular/core';
import { CommandHandler } from './command-handler';
import { Command } from '../model/command';
import { CommandBusService } from '../command-bus.service';
import { GameStoreService } from '../../store/game-store.service';
import { EventBusService } from '../../events/event-bus.service';
import { MessagesAdapterService } from '../../adapters/events/messages-adapter.service';
import { isInitiateGameCommand } from '../model/initiate-game-command';
import { GameInitiatedEvent } from '../../events/model/GameInitiatedEvent';

@Injectable({
    providedIn: 'root',
})
export class InitiateGameCommandHandlerService implements CommandHandler {
    constructor(
        private commandBus: CommandBusService,
        private gameStore: GameStoreService,
        private eventBus: EventBusService,
        private errorMessageService: MessagesAdapterService
    ) {
        commandBus.registerHandler('InitiateGame', this);
    }

    execute(cmd: Command): void {
        if (isInitiateGameCommand(cmd)) {
            const game = this.gameStore.get(cmd.payload.gameId);
            game.initiate();
            this.eventBus.on(new GameInitiatedEvent({ gameId: game.id }));
        } else {
            this.errorMessageService.publish({
                level: 'ERROR',
                message: `Wrong command sent for InitiateGameCommandHandlerService for ${cmd.type}`,
                topic: 'APPLICATION-ERROR',
            });
        }
    }
}
