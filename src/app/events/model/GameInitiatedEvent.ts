import { GameEvent } from './gameEvent';

type GameInitiatedEventPayload = {
    gameId: string;
};

export class GameInitiatedEvent extends GameEvent {
    public constructor(payload: GameInitiatedEventPayload) {
        super('GameInitiated', payload);
    }

    public override get payload(): GameInitiatedEventPayload {
        return super.payload;
    }
}
