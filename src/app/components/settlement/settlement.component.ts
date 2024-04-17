import {Component} from '@angular/core';
import {GameFacadeService} from "../../facades/game-facade.service";
import {CommonModule} from "@angular/common";
import {GameCardComponent} from "../game-card/game-card.component";
import {DefaultGameCard} from "../../domain/game-card";
import {CardActionsComponent, CardBtnAction} from "../card-actions/card-actions.component";
import {CardActionsWrapperComponent} from "../card-actions-wrapper/card-actions-wrapper.component";
import {of} from "rxjs";
import {CardSlotComponent} from "../card-slot/card-slot.component";

@Component({
  selector: 'app-settlement',
  standalone: true,
  imports: [CommonModule, GameCardComponent, CardActionsWrapperComponent, CardActionsComponent, CardSlotComponent],
  templateUrl: './settlement.component.html',
  styleUrl: './settlement.component.scss'
})
export class SettlementComponent {
  settlement$ = this.gameFacade.getSettlement$()
  isHovered = false

  defaultCard = DefaultGameCard
  actions = [{
    gameSpace: 'SETTLEMENT',
    actionType: 'INFO',
    icon: 'info',
    hide$: of(false)
  }] as CardBtnAction[]

  showSlots$ = this.gameFacade.showSlots$('building');

  constructor(private gameFacade: GameFacadeService) {


  }

  handleSettlementSlotClicked(index: number) {
    this.gameFacade.buildingSlotSelected(index)
  }
}
