import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {GameSetupFacadeService} from "../../facades/game-setup.facade.service";

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

  game$ = this.gameSetupFacade.getGame$()

  constructor(private readonly gameSetupFacade: GameSetupFacadeService) {
    this.gameSetupFacade.setupPlayerVsPcGame()
  }

}
