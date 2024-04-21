import {GameEvent} from './gameEvent'
import {Player} from "../../domain/player";
import {GamePhase} from "../../query/model/game-card-vo";
import {GameSpace} from "../../query/model/game-space";

type PlayerGainedWoodEventPayload = {
  cardId: string
  playerId: string
  gameId: string
  amount: number
}

export class PlayerGainedWoodEvent extends GameEvent {

  public constructor(payload: PlayerGainedWoodEventPayload) {
    super('PlayerGainedWood', payload)
  }

  public override get payload(): PlayerGainedWoodEventPayload {
    return super.payload
  }
}
