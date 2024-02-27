import {Component} from '@angular/core';
import {GameFacadeService} from "../../facades/game-facade.service";
import {CommonModule} from "@angular/common";
import {GameCardComponent} from "../game-card/game-card.component";
import {DefaultGameCard} from "../../domain/game-card";
import {CardActionsComponent, CardBtnAction} from "../card-actions/card-actions.component";
import {CardActionsWrapperComponent} from "../card-actions-wrapper/card-actions-wrapper.component";
import {of} from "rxjs";

@Component({
  selector: 'app-settlement',
  standalone: true,
  imports: [CommonModule, GameCardComponent, CardActionsWrapperComponent, CardActionsComponent],
  templateUrl: './settlement.component.html',
  styleUrl: './settlement.component.scss'
})
export class SettlementComponent {
  settlement$ = this.gameFacade.getSettlement$()
  isHovered = false

  defaultCard = DefaultGameCard
  actions = [{
    actionType: 'INFO',
    icon: 'info',
    hide$: of(false)
  }] as CardBtnAction[]

  constructor(private readonly gameFacade: GameFacadeService) {


  }

}
