import { GameEvent } from './gameEvent';

type PlayerGainedWoodEventPayload = {
    cardId: string;
    playerId: string;
    gameId: string;
    amount: number;
};

export class PlayerGainedWoodEvent extends GameEvent {
    public constructor(payload: PlayerGainedWoodEventPayload) {
        super('PlayerGainedWood', payload);
    }

    public override get payload(): PlayerGainedWoodEventPayload {
        return super.payload;
    }
}
