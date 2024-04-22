import {Component, Input, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {CardActionsComponent, CardBtnAction} from "../card-actions/card-actions.component";
import {CardActionsWrapperComponent} from "../card-actions-wrapper/card-actions-wrapper.component";
import {CardSlotComponent} from "../card-slot/card-slot.component";
import {EMPTY, Observable} from "rxjs";
import {GameFacadeService} from "../../facades/game-facade.service";
import {LocationCardVO} from "../../query/model/location-card-vo";
import {LocationCardComponent} from "../location-card/location-card.component";

@Component({
  selector: 'app-location-lane',
  standalone: true,
  imports: [
    AsyncPipe,
    CardActionsComponent,
    CardActionsWrapperComponent,
    CardSlotComponent,
    NgForOf,
    NgIf,
    LocationCardComponent
  ],
  templateUrl: './location-lane.component.html',
  styleUrl: './location-lane.component.scss'
})
export class LocationLaneComponent implements OnInit{
  @Input()
  locationRow: number | undefined = undefined
  hoveredCard: string | undefined = undefined
  defaultActions: CardBtnAction[] = []
  locationLane$: Observable<LocationCardVO[]> = EMPTY
  constructor(private gameFacade: GameFacadeService) {
    this.locationLane$.subscribe((lane) => console.log(JSON.stringify(lane)))
  }

  ngOnInit() {
    this.locationLane$ = this.gameFacade.getLocationsByLane$(this.locationRow!)
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
}
