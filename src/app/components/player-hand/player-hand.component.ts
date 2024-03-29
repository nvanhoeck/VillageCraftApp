import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GameFacadeService} from "../../facades/game-facade.service";
import {GameCardComponent} from "../game-card/game-card.component";
import {CommonModule} from "@angular/common";
import {CardActionsWrapperComponent} from "../card-actions-wrapper/card-actions-wrapper.component";
import {CardActionsComponent, CardBtnAction} from "../card-actions/card-actions.component";
import {map, of} from "rxjs";

@Component({
  selector: 'app-player-hand',
  standalone: true,
  imports: [CommonModule, GameCardComponent, CardActionsWrapperComponent, CardActionsComponent],
  templateUrl: './player-hand.component.html',
  styleUrl: './player-hand.component.scss'
})
export class PlayerHandComponent {
  @Input()
  hideActions = false
  @Input()
  cardSelection: string[] = []

  @Output()
  cardClickedEvent = new EventEmitter<string>()

  hoveredCard = ''

  hand$ = this.gameFacade.getPlayerHand$()

  actions = [{
    origin: 'HAND',
    actionType: 'PLAY',
    icon: 'arrow_right',
    hide$: of(false),
  },
    {
      origin: 'HAND',
      actionType: 'ARCHIVE',
      icon: 'archive',
      hide$: this.gameFacade.getPlayerArchive$().pipe(map((gc) => !!gc))
    },
    {
      origin: 'HAND',
      actionType: 'INFO',
      icon: 'info',
      hide$: of(false)
    }] as CardBtnAction[]

  constructor(private readonly gameFacade: GameFacadeService) {
  }

  handleCardClicked(cardId: string) {
    if (this.cardClickedEvent) {
      this.cardClickedEvent.emit(cardId)
    }
  }

  handleCardHover(cardId: string) {
    this.hoveredCard = cardId
  }

  handleCardHoverLeave() {
    this.hoveredCard = ''
  }

  isHovered(id: string) {
    return this.hoveredCard === id
  }

  cardSelected(id: string) {
    return !!this.cardSelection.find((cardId) => cardId === id);
  }
}
