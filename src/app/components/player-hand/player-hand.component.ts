import {Component} from '@angular/core';
import {GameFacadeService} from "../../facades/game-facade.service";
import {GameCardComponent} from "../game-card/game-card.component";
import {CommonModule} from "@angular/common";
import {GameCard} from "../../domain/game-card";

@Component({
  selector: 'app-player-hand',
  standalone: true,
  imports: [CommonModule, GameCardComponent],
  templateUrl: './player-hand.component.html',
  styleUrl: './player-hand.component.scss'
})
export class PlayerHandComponent {
  hand$ = this.gameFacade.getPlayerHand$()

  constructor(private readonly gameFacade: GameFacadeService) {


  }

  handleCardHover(card: GameCard) {
    document.getElementById(card.id)!.style.transform = "translateY(-160px)";
  }

  handleCardHoverLeave(card: GameCard) {
    document.getElementById(card.id)!.style.transform = "";
  }
}
