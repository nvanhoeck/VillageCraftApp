import {Component} from '@angular/core';
import {GameFacadeService} from "../../facades/game-facade.service";
import {CommonModule} from "@angular/common";
import {GameCardComponent} from "../game-card/game-card.component";
import {CardActionsComponent, CardBtnAction} from "../card-actions/card-actions.component";
import {CardActionsWrapperComponent} from "../card-actions-wrapper/card-actions-wrapper.component";
import {map, of} from "rxjs";
import {CardSlotComponent} from "../card-slot/card-slot.component";

@Component({
  selector: 'app-citizen-lane',
  standalone: true,
  imports: [CommonModule, GameCardComponent, CardActionsComponent, CardActionsWrapperComponent, CardSlotComponent],
  templateUrl: './citizen-lane.component.html',
  styleUrl: './citizen-lane.component.scss'
})
export class CitizenLaneComponent {
  citizenLane$ = this.gameFacade.getPlayerCitizenLane$().pipe(map((lane) => lane.findCardsInLane()))
  hoveredCard: string | undefined = undefined
  defaultActions: CardBtnAction[] = [{
    gameSpace: 'CITIZEN_LANE',
    actionType: 'INFO',
    icon: 'info',
    hide$: of(false)
  }]
  showSlots$ = this.gameFacade.showSlots$('citizen');

  constructor(private readonly gameFacade: GameFacadeService) {


  }

  handleHoverCard(id: string) {
    this.hoveredCard = id
  }

  handleMouseLeaveCard() {
    this.hoveredCard = undefined
  }

  isHovered(id: string) {
    return this.hoveredCard === id
  }

  handleClickOnSlot(index: number) {
    this.gameFacade.citizenSlotSelected(index)
  }
}
