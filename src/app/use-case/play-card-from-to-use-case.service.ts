import {Injectable} from '@angular/core';
import {CommandBusService} from "../commands/command-bus.service";
import {PlayCardFromToCommand} from "../commands/model/play-card-from-to-command";

@Injectable({
  providedIn: 'root'
})
export class PlayCardFromToUseCaseService {

  constructor(private commandBus: CommandBusService) {
  }

  playCardFromTo(from: "HAND", to: "ARCHIVE", cardId: string, playerId: string, gameId: string | undefined) {
    this.commandBus.on(new PlayCardFromToCommand({from, to, cardId, playerId, gameId: gameId!}))
  }
}
