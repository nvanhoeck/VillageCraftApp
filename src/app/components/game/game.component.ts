import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {GameSetupFacadeService} from "../../facades/game-setup.facade.service";
import {SettlementComponent} from "../settlement/settlement.component";
import {PlayerHandComponent} from "../player-hand/player-hand.component";
import {PlayerDeckComponent} from "../player-deck/player-deck.component";
import {ArchiveComponent} from "../archive/archive.component";
import {CitizenLaneComponent} from "../citizen-lane/citizen-lane.component";
import {BuildingLaneComponent} from "../building-lane/building-lane.component";

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, SettlementComponent, PlayerHandComponent, PlayerDeckComponent, ArchiveComponent,
    CitizenLaneComponent, BuildingLaneComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

  game$ = this.gameSetupFacade.getGame$()
  playersIds$ = this.gameSetupFacade.getPlayerIds$()

  constructor(private readonly gameSetupFacade: GameSetupFacadeService) {
  }

}
