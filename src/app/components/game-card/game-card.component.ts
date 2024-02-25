import {Component, Input} from '@angular/core';
import {GameCard} from "../../domain/game-card";
import {CommonModule} from "@angular/common";

type CardStyle = 'NORMAL' | 'SMALL'
type CardSide = 'FRONT' | 'BACK'

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.scss'
})
export class GameCardComponent {
  @Input()
  card?: GameCard = undefined;
  @Input()
  cardStyle: CardStyle = 'NORMAL'
  @Input()
  cardSide: CardSide = 'FRONT'
  @Input()
  handleHoverHandler?: (cardDetails: GameCard) => void
  @Input()
  handleHoverLeaveHandler?: (cardDetails: GameCard) => void

  constructor() {
  }

  handleHover: ($event: MouseEvent) => void = (event) => {
    if (this.handleHoverHandler && this.card) {
      this.handleHoverHandler(this.card)
    }
  }

  handleHoverLeave: ($event: MouseEvent) => void = (event) => {
    if (this.handleHoverLeaveHandler && this.card) {
      this.handleHoverLeaveHandler(this.card)
    }
  }
}
