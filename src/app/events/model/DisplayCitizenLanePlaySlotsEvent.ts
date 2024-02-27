import {GameEvent} from './gameEvent'

type DisplayCitizenLanePlaySlotsEventPayload = {
  playerId: string
  gameId: string
}

export class DisplayCitizenLanePlaySlotsEvent extends GameEvent {

  public constructor(payload: DisplayCitizenLanePlaySlotsEventPayload) {
    super('DisplayCitizenLanePlaySlots', payload)
  }

  public override get payload(): DisplayCitizenLanePlaySlotsEventPayload {
    return super.payload
  }
}
