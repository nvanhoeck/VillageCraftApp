import { Injectable } from '@angular/core';
import {CommandBusService} from "../commands/command-bus.service";
import {SetupGameCommand} from "../commands/model/setup-game-command";

@Injectable({
  providedIn: 'root'
})
export class StartGameUseCaseService {

  constructor(private commandBus: CommandBusService) { }

  public startPlayerVsPcGame() {
    //Setup game
    this.commandBus.on(new SetupGameCommand({gameType: 'PVC'}))
    //Setup player
    //Load deck for player
    //Setup pc
    //Load deck for pc
    //Shuffle base player deck
    //Shuffle base pc deck
    //Draw starting cards pc
    //Draw starting cards player
    //Done
  }
}
