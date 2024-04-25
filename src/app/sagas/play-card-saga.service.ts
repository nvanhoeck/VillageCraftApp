import { Injectable } from '@angular/core';
import { CommandBusService } from '../commands/command-bus.service';
import { EventBusService } from '../events/event-bus.service';
import { EventHandler } from '../events/event-handler';
import { GameEvent } from '../events/model/gameEvent';
import { DisplayCitizenLanePlaySlotsEvent } from '../events/model/DisplayCitizenLanePlaySlotsEvent';
import { DisplayBuildingLanePlaySlotsEvent } from '../events/model/DisplayBuildingLanePlaySlotsEvent';
import { MessagesAdapterService } from '../adapters/events/messages-adapter.service';
import { PlayCardFromToCommand } from '../commands/model/play-card-from-to-command';
import { HideBuildingLanePlaySlotsEvent } from '../events/model/HideBuildingLanePlaySlotsEvent';
import { HideCitizenLanePlaySlotsEvent } from '../events/model/HideCitizenLanePlaySlotsEvent';

@Injectable({
    providedIn: 'root',
})
export class PlayCardSagaService implements EventHandler {
    private playerId: string | undefined = undefined;
    private gameId: string | undefined = undefined;
    private cardId: string | undefined = undefined;

    constructor(
        private commandBus: CommandBusService,
        private eventBus: EventBusService,
        private errorMessageService: MessagesAdapterService
    ) {
        this.eventBus.registerHandler('CitizenLaneSlotChosen', this);
        this.eventBus.registerHandler('DisplayCitizenLanePlaySlots', this);
        this.eventBus.registerHandler('BuildingLaneSlotChosen', this);
        this.eventBus.registerHandler('DisplayBuildingLanePlaySlots', this);
    }

    playFromHandTo(
        to: 'CITIZEN_LANE' | 'BUILDING_LANE',
        cardId: string,
        playerId: string,
        gameId: string
    ) {
        this.playerId = playerId;
        this.gameId = gameId;
        this.cardId = cardId;
        if (to === 'CITIZEN_LANE') {
            this.eventBus.on(
                new DisplayCitizenLanePlaySlotsEvent({ playerId, gameId })
            );
        } else {
            this.eventBus.on(
                new DisplayBuildingLanePlaySlotsEvent({ playerId, gameId })
            );
        }
    }

    public execute(event: GameEvent) {
        switch (event.type) {
            case 'DisplayCitizenLanePlaySlots':
                this.errorMessageService.publish({
                    level: 'INFO',
                    message: `Pick a spot to play your citizen card`,
                    topic: 'GAME-INFO',
                });
                break;
            case 'DisplayBuildingLanePlaySlots':
                this.errorMessageService.publish({
                    level: 'INFO',
                    message: `Pick a spot to play your building card`,
                    topic: 'GAME-INFO',
                });
                break;
            case 'CitizenLaneSlotChosen':
                this.commandBus.on(
                    new PlayCardFromToCommand({
                        from: 'HAND',
                        to: 'CITIZEN_LANE',
                        playerId: this.playerId!,
                        gameId: this.gameId!,
                        cardId: this.cardId!,
                        index: event.payload.slot,
                    })
                );
                this.eventBus.on(
                    new HideCitizenLanePlaySlotsEvent({
                        playerId: this.playerId!,
                        gameId: this.gameId!,
                    })
                );
                this.cardId = undefined;
                break;
            case 'BuildingLaneSlotChosen':
                this.commandBus.on(
                    new PlayCardFromToCommand({
                        from: 'HAND',
                        to: 'BUILDING_LANE',
                        playerId: this.playerId!,
                        gameId: this.gameId!,
                        cardId: this.cardId!,
                        index: event.payload.slot,
                    })
                );
                this.eventBus.on(
                    new HideBuildingLanePlaySlotsEvent({
                        playerId: this.playerId!,
                        gameId: this.gameId!,
                    })
                );
                this.cardId = undefined;
                break;
            default:
                this.errorMessageService.publish({
                    level: 'ERROR',
                    message: `Could not handle event ${event.type} in PlayCardSaga`,
                    topic: 'APPLICATION-ERROR',
                });
        }
    }
}
