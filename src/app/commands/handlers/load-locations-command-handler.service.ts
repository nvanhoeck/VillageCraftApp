import {Injectable} from '@angular/core';
import {CommandHandler} from "./command-handler";
import {Command} from "../model/command";
import {CommandBusService} from "../command-bus.service";
import {GameStoreService} from "../../store/game-store.service";
import {EventBusService} from "../../events/event-bus.service";
import {MessagesAdapterService} from "../../adapters/events/messages-adapter.service";
import {GameDeckAdapterService} from "../../adapters/cards/game-deck-adapter.service";
import {first} from "rxjs";
import {PlayerBaseDecksLoadedEvent} from "../../events/model/PlayerBaseDecksLoadedEvent";
import {isLoadLocationsCommand} from "../model/load-locations-command";
import {LocationCardsAdapterService} from "../../adapters/cards/location-cards-adapter.service";
import {LocationsLoadedEvent} from "../../events/model/LocationsLoadedEvent";

@Injectable({
  providedIn: 'root'
})
export class LoadLocationsCommandHandlerService implements CommandHandler {

  constructor(
    private commandBus: CommandBusService,
    private gameStore: GameStoreService,
    private eventBus: EventBusService,
    private errorMessageService: MessagesAdapterService,
    private locationAdapterService: LocationCardsAdapterService
  ) {
    commandBus.registerHandler('LoadLocations', this)
  }

  execute(cmd: Command): void {
    if (isLoadLocationsCommand(cmd)) {
      const game = this.gameStore.get(cmd.payload.gameId);
      this.locationAdapterService.getAllLocationCards().pipe(first()).subscribe((locationCards) => {
        game.setupLocations(locationCards)
        this.eventBus.on(new LocationsLoadedEvent({game}))
      })
    } else {
      this.errorMessageService.publish({
        level: 'ERROR', message: `Wrong command sent for LoadLocationsCommandHandlerService for ${cmd.type}`,
        topic: "APPLICATION-ERROR"
      })
    }
  }
}
