import { Injectable } from '@angular/core';
import {StartGameUseCaseService} from "../use-case/start-game-use-case.service";

@Injectable({
  providedIn: 'root'
})
export class GameSetupFacadeService {

  constructor(private startGameUseCase: StartGameUseCaseService) { }

  public setupPlayerVsPcGame() {
    this.startGameUseCase.startPlayerVsPcGame()
  }
}
