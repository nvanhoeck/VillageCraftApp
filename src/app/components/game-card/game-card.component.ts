import {Component, Input} from '@angular/core';
import {GameCard} from "../../domain/game-card";
import {CommonModule} from "@angular/common";

type CardStyle = 'NORMAL' | 'SMALL'

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
  style: CardStyle = 'NORMAL'

  constructor() {
    console.log(this.style)
  }


}
