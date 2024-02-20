import {Injectable} from '@angular/core';
import {StartGameUseCaseService} from "../use-case/start-game-use-case.service";
import {GetGameUseCaseService} from "../use-case/get-game-use-case.service";

@Injectable({
  providedIn: 'root'
})
export class GameSetupFacadeService {

  constructor(private startGameUseCase: StartGameUseCaseService, private getGameUseCase: GetGameUseCaseService) {
  }

  public setupPlayerVsPcGame() {
    this.startGameUseCase.startPlayerVsPcGame()
  }

  public getGame$() {
    return this.getGameUseCase.getGame$()
  }
}
