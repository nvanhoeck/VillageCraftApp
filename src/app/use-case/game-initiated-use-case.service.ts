import {Injectable} from '@angular/core';
import {CommandBusService} from "../commands/command-bus.service";
import {InitiateGameCommand} from "../commands/model/initiate-game-command";

@Injectable({
  providedIn: 'root'
})
export class GameInitiatedUseCaseService {

  constructor(private commandBus: CommandBusService) {
  }

  initiateGame(gameId: string) {
    debugger
    this.commandBus.on(new InitiateGameCommand({gameId}))
  }
}
