import {Injectable} from '@angular/core';
import {GameCardsJsonReaderAdapterService} from "./game-cards-json-reader-adapter.service";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameDeckAdapterService {

  constructor(private readonly gameCardJsonReaderAdapterService: GameCardsJsonReaderAdapterService) {
  }

  public loadBaseDeck() {
    return this.gameCardJsonReaderAdapterService.getAllCards().pipe(map((cards) => {
      return cards.filter((card) => card.cardAffiliation === 'base')
    }))
  }
}
