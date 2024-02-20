import {Component, Input} from '@angular/core';
import {GameCard} from "../../domain/game-card";
import {CommonModule} from "@angular/common";

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

}
