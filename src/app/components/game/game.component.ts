import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {GameSetupFacadeService} from "../../facades/game-setup.facade.service";
import {SettlementComponent} from "../settlement/settlement.component";

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, SettlementComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

  game$ = this.gameSetupFacade.getGame$()

  constructor(private readonly gameSetupFacade: GameSetupFacadeService) {
    this.gameSetupFacade.setupPlayerVsPcGame()
  }

}
