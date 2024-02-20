import {Injectable} from '@angular/core';
import {CommandBusService} from "../commands/command-bus.service";
import {SetupGameCommand} from "../commands/model/setup-game-command";
import {SetupPlayerCommand} from "../commands/model/setup-player-command";
import {LoadPlayerBaseDecksCommand} from "../commands/model/load-player-base-decks-command";

@Injectable({
  providedIn: 'root'
})
export class StartGameUseCaseService {

  constructor(private commandBus: CommandBusService) {
  }

  public startPlayerVsPcGame() {
    //Setup game
    this.commandBus.on(new SetupGameCommand({gameType: 'PVC'}))
    //Setup player
    this.commandBus.on(new SetupPlayerCommand({playerType: 'HUMAN'}))
    //Setup pc
    this.commandBus.on(new SetupPlayerCommand({playerType: 'PC'}))
    //Load deck for players
    this.commandBus.on(new LoadPlayerBaseDecksCommand({}))
    //Draw starting cards pc
    //Draw starting cards player
    //Done
  }
}
