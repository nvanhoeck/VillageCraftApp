import {GameEvent} from './gameEvent'

type MulliganPhaseStartedEventPayload = {
  gameId: string
}


export class MulliganPhaseStartedEvent extends GameEvent {
  public constructor(payload: MulliganPhaseStartedEventPayload) {
    super('MulliganPhaseStarted', payload)
  }


  public override get payload(): MulliganPhaseStartedEventPayload {
    return super.payload
  }
}
