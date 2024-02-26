import {GameEvent} from './gameEvent'
import {Player} from "../../domain/player";

type CardPlayerFromHandEventPayload = {
  playerHand: Player['_hand']
  playerId: string
  gameId: string
}

export class CardPlayerFromHandEvent extends GameEvent {

  public constructor(payload: CardPlayerFromHandEventPayload) {
    super('CardPlayerFromHand', payload)
  }

  public override get payload(): CardPlayerFromHandEventPayload {
    return super.payload
  }
}
