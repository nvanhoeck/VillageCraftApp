import { Component } from '@angular/core';
import {StartGameUseCaseService} from "../../use-case/start-game-use-case.service";

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

  constructor(startGameUseCase: StartGameUseCaseService) {
    startGameUseCase.startPlayerVsPcGame()
  }

}
