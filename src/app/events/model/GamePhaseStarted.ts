import {GameEvent} from "./gameEvent";

import {GamePhase} from "../../domain/GamePhase";

type GamePhaseStartedEventPayload = {
  gameId: string
  nextPhase: GamePhase
}


export class GamePhaseStartedEvent extends GameEvent {
  public constructor(payload: GamePhaseStartedEventPayload) {
    super('GamePhaseStarted', payload)
  }


  public override get payload(): GamePhaseStartedEventPayload {
    return super.payload
  }
}
