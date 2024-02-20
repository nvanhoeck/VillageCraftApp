import {Component} from '@angular/core';
import {GameFacadeService} from "../../facades/game-facade.service";
import {CommonModule} from "@angular/common";
import {GameCardComponent} from "../game-card/game-card.component";

@Component({
  selector: 'app-settlement',
  standalone: true,
  imports: [CommonModule, GameCardComponent],
  templateUrl: './settlement.component.html',
  styleUrl: './settlement.component.scss'
})
export class SettlementComponent {
  settlement$ = this.gameFacade.getSettlement$()

  constructor(private readonly gameFacade: GameFacadeService) {


  }

}
