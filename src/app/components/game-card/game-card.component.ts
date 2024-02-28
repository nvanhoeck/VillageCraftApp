import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {GameCardVO} from "../../query/model/game-card-vo";

type CardStyle = 'NORMAL' | 'SMALL' | 'PLACEHOLDER'
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
  card?: GameCardVO = undefined;
  @Input()
  cardStyle: CardStyle = 'NORMAL'
  @Input()
  cardSide: CardSide = 'FRONT'
  @Input()
  placeholderLabel: string = ''
  @Input()
  backText: string = ''
  @Input()
  handleHoverHandler?: (cardDetails: GameCardVO) => void
  @Input()
  handleHoverLeaveHandler?: (cardDetails: GameCardVO) => void


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
