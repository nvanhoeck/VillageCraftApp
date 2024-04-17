import {GameEvent} from './gameEvent'
import {Player} from "../../domain/player";
import {GamePhase} from "../../query/model/game-card-vo";
import {GameSpace} from "../../query/model/game-space";

type CardExhaustedEventPayload = {
  cardId: string
  playerId: string
  gameId: string
  gamePhase: GamePhase
  gameSpace: GameSpace
}

export class CardExhaustedEvent extends GameEvent {

  public constructor(payload: CardExhaustedEventPayload) {
    super('CardExhausted', payload)
  }

  public override get payload(): CardExhaustedEventPayload {
    return super.payload
  }
}
