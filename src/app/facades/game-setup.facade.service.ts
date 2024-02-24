import {Injectable} from '@angular/core';
import {StartGameUseCaseService} from "../use-case/start-game-use-case.service";
import {GetGameUseCaseService} from "../use-case/get-game-use-case.service";
import {v4 as uuidv4} from "uuid";
import {ErrorMessagesAdapterService} from "../adapters/events/error-messages-adapter.service";
import {EMPTY, isEmpty, map} from "rxjs";
import {GetPlayerUseCaseService} from "../use-case/get-player-use-case.service";

@Injectable({
  providedIn: 'root'
})
export class GameSetupFacadeService {
  private gameId: string | undefined
  private playerId = 'niko'

  constructor(private startGameUseCase: StartGameUseCaseService, private getGameUseCase: GetGameUseCaseService,
              private errorMessageService: ErrorMessagesAdapterService, private getPlayerUseCase: GetPlayerUseCaseService) {
  }

  public setupPlayerVsPcGame() {
    this.gameId = uuidv4()
    this.startGameUseCase.startPlayerVsPcGame(this.gameId, this.playerId)
  }

  public getGame$() {
    if (this.gameId) {
      return this.getGameUseCase.getGame$(this.gameId)
    } else {
      this.errorMessageService.publish({
        level: 'ERROR', message: `Could not find a gameId at GameSetupFacadeService`,
        topic: "APPLICATION-ERROR"
      })
      return EMPTY
    }
  }

  gameExists$() {
    return this.getGameUseCase.getGame$(this.gameId!).pipe(isEmpty(), map((empty) => !empty))
  }

  getPlayerIds$() {
    return this.getPlayerUseCase.getPlayerIds$(this.gameId!)
  }
}
