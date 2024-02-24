import {Injectable} from '@angular/core';
import {SetupGameCommandHandlerService} from "./handlers/setup-game-command-handler.service";
import {SetupPlayerCommandHandlerService} from "./handlers/setup-player-command-handler.service";
import {LoadPlayerBaseDecksCommandHandlerService} from "./handlers/load-player-base-decks-command-handler.service";

@Injectable({
  providedIn: 'root'
})
export class CommandHandlersRegistryService {

  constructor(
    private readonly setupGameCommandHandlerService: SetupGameCommandHandlerService,
    private readonly setupPlayerCommandHandlerService: SetupPlayerCommandHandlerService,
    private readonly loadPlayerBaseDecksCommandHandlerService: LoadPlayerBaseDecksCommandHandlerService,
  ) {
  }
}