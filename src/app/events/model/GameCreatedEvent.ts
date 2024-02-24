import {GameEvent} from './gameEvent'
import {GameType} from "../../domain/game-type";

type GameCreatedEventPayload = {
  id: string,
  type: GameType
}


export class GameCreatedEvent extends GameEvent {
  public constructor(payload: GameCreatedEventPayload) {
    super('GameCreated', payload)
  }


  public override get payload(): GameCreatedEventPayload {
    return super.payload
  }
}
