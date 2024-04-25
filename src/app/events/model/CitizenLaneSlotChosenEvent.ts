import { GameEvent } from './gameEvent';

type CitizenLaneChosenSlotEventPayload = {
    slot: number;
    playerId: string;
    gameId: string;
};

export class CitizenLaneChosenSlotEvent extends GameEvent {
    public constructor(payload: CitizenLaneChosenSlotEventPayload) {
        super('CitizenLaneSlotChosen', payload);
    }

    public override get payload(): CitizenLaneChosenSlotEventPayload {
        return super.payload;
    }
}
