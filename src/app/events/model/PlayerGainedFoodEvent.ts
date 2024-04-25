import { GameEvent } from './gameEvent';

type PlayerGainedFoodEventPayload = {
    cardId: string;
    playerId: string;
    gameId: string;
    amount: number;
};

export class PlayerGainedFoodEvent extends GameEvent {
    public constructor(payload: PlayerGainedFoodEventPayload) {
        super('PlayerGainedFood', payload);
    }

    public override get payload(): PlayerGainedFoodEventPayload {
        return super.payload;
    }
}
