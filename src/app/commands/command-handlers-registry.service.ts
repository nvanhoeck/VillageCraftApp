import {Injectable} from '@angular/core';
import {SetupGameCommandHandlerService} from "./handlers/setup-game-command-handler.service";
import {SetupPlayerCommandHandlerService} from "./handlers/setup-player-command-handler.service";
import {LoadPlayerBaseDecksCommandHandlerService} from "./handlers/load-player-base-decks-command-handler.service";
import {PlayCardFromToCommandHandlerService} from "./handlers/play-card-from-to-command-handler.service";
import {MulliganPhaseCommandHandlerService} from "./handlers/mulligan-phase-command-handler.service";
import {MulliganCommandHandlerService} from "./handlers/mulligan-command-handler.service";
import {InitiateGameCommandHandlerService} from "./handlers/initiate-game-command-handler.service";
import {ExhaustCardCommandHandlerService} from "./handlers/exhaust-card-command-handler.service";
import {GainFoodCardActionCommandHandlerService} from "./handlers/gain-food-card-action-command-handler.service";
import {GainWoodCardActionCommandHandlerService} from "./handlers/gain-wood-card-action-command-handler.service";
import {EndPhaseCommandHandlerService} from "./handlers/end-phase-command-handler.service";
import {LoadLocationsCommandHandlerService} from "./handlers/load-locations-command-handler.service";

@Injectable({
  providedIn: 'root'
})
export class CommandHandlersRegistryService {

  constructor(
    private readonly setupGameCommandHandlerService: SetupGameCommandHandlerService,
    private readonly setupPlayerCommandHandlerService: SetupPlayerCommandHandlerService,
    private readonly loadPlayerBaseDecksCommandHandlerService: LoadPlayerBaseDecksCommandHandlerService,
    private readonly playCardFromToCommandHandlerService: PlayCardFromToCommandHandlerService,
    private readonly mulliganPhaseCommandHandlerService: MulliganPhaseCommandHandlerService,
    private readonly mulliganCommandHandlerService: MulliganCommandHandlerService,
    private readonly initiateGameCommandHandlerService: InitiateGameCommandHandlerService,
    private readonly exhaustCardCommandHandlerService: ExhaustCardCommandHandlerService,
    private readonly gainFoodCardActionCommandHandlerService: GainFoodCardActionCommandHandlerService,
    private readonly gainWoodCardActionCommandHandlerService: GainWoodCardActionCommandHandlerService,
    private readonly endPhaseCommandHandlerService: EndPhaseCommandHandlerService,
    private readonly loadLocationsCommandHandlerService: LoadLocationsCommandHandlerService,
  ) {
  }
}
