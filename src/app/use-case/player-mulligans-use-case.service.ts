import {Injectable} from '@angular/core';
import {CommandBusService} from "../commands/command-bus.service";
import {MulliganCommand} from "../commands/model/mulligan-command";

@Injectable({
  providedIn: 'root'
})
export class PlayerMulligansUseCase {

  constructor(private commandBus: CommandBusService) {
  }

  playerMulligans(playerId: string, gameId: string, cardIds: string[]) {
    this.commandBus.on(new MulliganCommand({gameId, playerId, cardIds}))
  }
}
