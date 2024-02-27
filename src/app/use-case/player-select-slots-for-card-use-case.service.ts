import {Injectable} from '@angular/core';
import {EventBusService} from "../events/event-bus.service";
import {CitizenLaneChosenSlotEvent} from "../events/model/CitizenLaneSlotChosenEvent";
import {BuildingLaneSlotChosenEvent} from "../events/model/BuildingLaneSlotChosenEvent";

@Injectable({
  providedIn: 'root'
})
export class PlayerSelectSlotsForCardUseCaseService {

  constructor(private eventBus: EventBusService) {
  }

  selectCitizenLaneSlot(index: number, gameId: string, playerId: string) {
    this.eventBus.on(new CitizenLaneChosenSlotEvent({
      slot: index,
      gameId,
      playerId
    }))
  }

  selectBuilingLaneSlot(index: number, gameId: string, playerId: string) {
    this.eventBus.on(new BuildingLaneSlotChosenEvent({
      slot: index,
      gameId,
      playerId
    }))
  }
}
