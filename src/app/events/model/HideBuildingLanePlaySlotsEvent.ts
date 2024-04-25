import { GameEvent } from './gameEvent';

type HideBuildingLanePlaySlotsEventPayload = {
    playerId: string;
    gameId: string;
};

export class HideBuildingLanePlaySlotsEvent extends GameEvent {
    public constructor(payload: HideBuildingLanePlaySlotsEventPayload) {
        super('HideBuildingLanePlaySlots', payload);
    }

    public override get payload(): HideBuildingLanePlaySlotsEventPayload {
        return super.payload;
    }
}
