import {Injectable} from '@angular/core';
import {CommandBusService} from "../commands/command-bus.service";
import {SetupGameCommand} from "../commands/model/setup-game-command";
import {SetupPlayerCommand} from "../commands/model/setup-player-command";
import {LoadPlayerBaseDecksCommand} from "../commands/model/load-player-base-decks-command";
import {v4 as uuidv4} from "uuid";
import {MulliganPhaseCommand} from "../commands/model/mulligan-phase-command";

@Injectable({
  providedIn: 'root'
})
export class StartGameUseCaseService {

  constructor(private commandBus: CommandBusService) {
  }

  public startPlayerVsPcGame(gameId: string, playerId: string) {
    const playerIdHuman = playerId
    const playerIdPc = uuidv4()
    //Setup game
    this.commandBus.on(new SetupGameCommand({id: gameId, gameType: 'PVC'}))
    //Setup player
    this.commandBus.on(new SetupPlayerCommand({gameId, playerId: playerIdHuman, playerType: 'HUMAN'}))
    //Setup pc
    this.commandBus.on(new SetupPlayerCommand({gameId, playerId: playerIdPc, playerType: 'PC'}))
    //Load deck for players
    this.commandBus.on(new LoadPlayerBaseDecksCommand({gameId, playerIds: [playerIdPc, playerIdHuman]}))
    //Draw starting cards pc
    // TODO
    //Draw starting cards player
    this.commandBus.on(new MulliganPhaseCommand({gameId}))
    //Done
  }
}
