import {GameEvent} from "./gameEvent";
import {GamePhase} from "../../domain/GamePhase";

type PlayerPhaseStartedEventPayload = {
  gameId: string
  playerId: string
  nextPhase: GamePhase
}


export class PlayerPhaseStartedEvent extends GameEvent {
  public constructor(payload: PlayerPhaseStartedEventPayload) {
    super('PlayerPhaseStarted', payload)
  }


  public override get payload(): PlayerPhaseStartedEventPayload {
    return super.payload
  }
}
