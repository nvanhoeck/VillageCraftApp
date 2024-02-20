import {Injectable} from '@angular/core';
import {CardsFetchPort} from "../../ports/cards-fetch-port";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import * as jsonData from '../../../assets/data/cards/cards.json';
import {GameCard} from "../../domain/game-card";

@Injectable({
  providedIn: 'root',
})
export class GameCardsJsonReaderAdapterService implements CardsFetchPort {


  constructor(private http: HttpClient) {
  }

  getAllCards(): Observable<GameCard[]> {
    return of(JSON.parse(JSON.stringify(jsonData.data)) as GameCard[])
  }
}
