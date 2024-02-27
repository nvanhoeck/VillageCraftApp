import {GameEvent} from './gameEvent'
import {Lane} from "../../domain/lane";

type CardPlayedToBuildingLaneEventPayload = {
  buildingLane: Lane
  playerId: string
  gameId: string
}

export class CardPlayedToBuildingLaneEvent extends GameEvent {

  public constructor(payload: CardPlayedToBuildingLaneEventPayload) {
    super('CardPlayedToBuildingLane', payload)
  }

  public override get payload(): CardPlayedToBuildingLaneEventPayload {
    return super.payload
  }
}
