import {GameEvent} from './gameEvent'
import {GameCard} from "../../domain/game-card";
import {Lane} from "../../domain/lane";

type CardPlayedToCitizenLaneEventPayload = {
  citizenLane: Lane
  playerId: string
  gameId: string
}

export class CardPlayedToCitizenLaneEvent extends GameEvent {

  public constructor(payload: CardPlayedToCitizenLaneEventPayload) {
    super('CardPlayedToCitizenLane', payload)
  }

  public override get payload(): CardPlayedToCitizenLaneEventPayload {
    return super.payload
  }
}
