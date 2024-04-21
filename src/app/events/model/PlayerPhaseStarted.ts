import {GamePhase} from "../../domain/game-card";
import {GameEvent} from "./gameEvent";

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
