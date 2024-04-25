import { GameEvent } from './gameEvent';

type BuildingLaneSlotChosenEventPayload = {
    slot: number;
    playerId: string;
    gameId: string;
};

export class BuildingLaneSlotChosenEvent extends GameEvent {
    public constructor(payload: BuildingLaneSlotChosenEventPayload) {
        super('BuildingLaneSlotChosen', payload);
    }

    public override get payload(): BuildingLaneSlotChosenEventPayload {
        return super.payload;
    }
}
