import {GameEvent} from './gameEvent'
import {Player} from "../../domain/player";
import {GamePhase} from "../../query/model/game-card-vo";
import {GameSpace} from "../../query/model/game-space";

type PlayerGainedFoodEventPayload = {
  cardId: string
  playerId: string
  gameId: string
  amount: number
}

export class PlayerGainedFoodEvent extends GameEvent {

  public constructor(payload: PlayerGainedFoodEventPayload) {
    super('PlayerGainedFood', payload)
  }

  public override get payload(): PlayerGainedFoodEventPayload {
    return super.payload
  }
}
