import {Component} from '@angular/core';
import {GameFacadeService} from "../../facades/game-facade.service";
import {CommonModule} from "@angular/common";
import {GameCardComponent} from "../game-card/game-card.component";
import {CardActionsComponent, CardBtnAction} from "../card-actions/card-actions.component";
import {CardActionsWrapperComponent} from "../card-actions-wrapper/card-actions-wrapper.component";
import {map, of} from "rxjs";
import {CardSlotComponent} from "../card-slot/card-slot.component";

@Component({
  selector: 'app-building-lane',
  standalone: true,
  imports: [CommonModule, GameCardComponent, CardActionsComponent, CardActionsWrapperComponent, CardSlotComponent],
  templateUrl: './building-lane.component.html',
  styleUrl: './building-lane.component.scss'
})
export class BuildingLaneComponent {
  buildingLane$ = this.gameFacade.getPlayerBuildingLane$().pipe(map((lane) => lane.findCardsInLane()))
  hoveredCard: string | undefined = undefined
  defaultActions: CardBtnAction[] = [{
    gameSpace: 'BUILDING_LANE',
    actionType: 'info',
    icon: 'info',
    hide$: of(false)
  }]
  showSlots$ = this.gameFacade.showSlots$('building');

  constructor(private readonly gameFacade: GameFacadeService) {
    this.showSlots$.subscribe((res: boolean) => console.log(res))
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
    this.gameFacade.buildingSlotSelected(index)
  }
}
