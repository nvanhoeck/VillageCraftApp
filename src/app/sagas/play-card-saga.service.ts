import {Injectable} from '@angular/core';
import {CommandBusService} from "../commands/command-bus.service";
import {EventBusService} from "../events/event-bus.service";
import {EventHandler} from "../events/event-handler";
import {GameEvent} from "../events/model/gameEvent";
import {DisplayCitizenLanePlaySlotsEvent} from "../events/model/DisplayCitizenLanePlaySlotsEvent";
import {DisplayBuildingLanePlaySlotsEvent} from "../events/model/DisplayBuildingLanePlaySlotsEvent";

@Injectable({
  providedIn: 'root'
})
export class PlayCardSagaService implements EventHandler {

  constructor(private commandBus: CommandBusService, private eventBus: EventBusService) {
    this.eventBus.registerHandler('CitizenLaneSlotChosenForCard', this)
    this.eventBus.registerHandler('BuildingLaneSlotChosenForCard', this)
  }

  playFromHandTo(to: "CITIZEN_LANE" | "BUILDING_LANE", cardId: string, playerId: string, gameId: string) {
    if (to === 'CITIZEN_LANE') {
      this.eventBus.on(new DisplayCitizenLanePlaySlotsEvent({playerId, cardId, gameId}))
    } else {
      this.eventBus.on(new DisplayBuildingLanePlaySlotsEvent({playerId, cardId, gameId}))
    }
  }

  public execute(event: GameEvent) {
  }

}
