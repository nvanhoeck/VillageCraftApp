import { GameEvent } from './gameEvent';

type DisplayBuildingLanePlaySlotsEventPayload = {
    playerId: string;
    gameId: string;
};

export class DisplayBuildingLanePlaySlotsEvent extends GameEvent {
    public constructor(payload: DisplayBuildingLanePlaySlotsEventPayload) {
        super('DisplayBuildingLanePlaySlots', payload);
    }

    public override get payload(): DisplayBuildingLanePlaySlotsEventPayload {
        return super.payload;
    }
}
