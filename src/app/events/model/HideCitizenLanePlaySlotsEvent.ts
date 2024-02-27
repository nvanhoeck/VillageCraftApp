import {GameEvent} from './gameEvent'

type HideCitizenLanePlaySlotsEventPayload = {
  playerId: string
  gameId: string
}

export class HideCitizenLanePlaySlotsEvent extends GameEvent {

  public constructor(payload: HideCitizenLanePlaySlotsEventPayload) {
    super('HideCitizenLanePlaySlots', payload)
  }

  public override get payload(): HideCitizenLanePlaySlotsEventPayload {
    return super.payload
  }
}
