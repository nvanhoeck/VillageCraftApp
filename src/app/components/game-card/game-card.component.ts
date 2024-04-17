import {Component, EventEmitter, Input, Output} from '@angular/core';
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
  @Output()
  handleHoverHandle = new EventEmitter<GameCardVO>()
  @Output()
  handleHoverLeaveHandler= new EventEmitter<GameCardVO>()


  handleHover: ($event: MouseEvent) => void = (event) => {
    if (this.card) {
      this.handleHoverHandle.emit(this.card)
    }
  }

  handleHoverLeave: ($event: MouseEvent) => void = (event) => {
    if (this.card) {
      this.handleHoverLeaveHandler.emit(this.card)
    }
  }
}
