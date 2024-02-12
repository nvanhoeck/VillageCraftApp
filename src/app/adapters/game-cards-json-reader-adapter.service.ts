import { Injectable } from '@angular/core';
import {CardsFetchPort} from "../ports/cards-fetch-port";
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import {GameCard} from "../domain/game-card";
import {HttpClient} from "@angular/common/http";
import * as jsonData from '../../assets/data/cards/cards.json';
import {J} from "@angular/cdk/keycodes";

@Injectable({
  providedIn: 'root',
})
export class GameCardsJsonReaderAdapterService implements CardsFetchPort{


  constructor(private http:HttpClient) { }

  getAllCards(): Observable<GameCard[]> {
    return of(JSON.parse(JSON.stringify(jsonData.data)) as GameCard[])
    //return of(JSON.parse(jsonData) as GameCard[])
  }
}
