import {GameEvent} from './gameEvent'
import {GameCard} from "../../domain/game-card";

type CardPlayedToArchivePayload = {
  archive: GameCard
  playerId: string
  gameId: string
}

export class CardPlayedToArchiveEvent extends GameEvent {

  public constructor(payload: CardPlayedToArchivePayload) {
    super('CardPlayedToArchiveEvent', payload)
  }

  public override get payload(): CardPlayedToArchivePayload {
    return super.payload
  }
}
