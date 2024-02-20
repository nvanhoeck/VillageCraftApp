import {Component} from '@angular/core';
import {GameCardComponent} from "../game-card/game-card.component";
import {GameCard} from "../../domain/game-card";
import {CommonModule} from "@angular/common";
import {CardsUseCaseService} from "../../use-case/cards-use-case.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-cards-overview',
  standalone: true,
  imports: [CommonModule, GameCardComponent],
  templateUrl: './cards-overview.component.html',
  styleUrl: './cards-overview.component.scss'
})
export class CardsOverviewComponent {
  public readonly cards: Observable<GameCard[]> = this.cardsUseCase.getAllCards();

  constructor(private cardsUseCase: CardsUseCaseService) {
  }

}
