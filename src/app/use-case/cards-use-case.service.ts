import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, Subject, take} from "rxjs";
import {GameCard} from "../domain/game-card";
import {CardsFetchPort} from "../ports/cards-fetch-port";
import {GameCardsJsonReaderAdapterService} from "../adapters/game-cards-json-reader-adapter.service";

@Injectable({providedIn: 'root'})
export class CardsUseCaseService {

  private gameCards: Subject<GameCard[]> = new BehaviorSubject<GameCard[]>([])

  constructor(private cardsFetchPort: GameCardsJsonReaderAdapterService) {
    cardsFetchPort.getAllCards().pipe(take(1)).subscribe((cards) => this.gameCards.next(cards))
  }

  public getAllCards = () => {
    this.gameCards.subscribe((cards) => console.log('cards', cards))
    return this.gameCards.asObservable()
  }
}
