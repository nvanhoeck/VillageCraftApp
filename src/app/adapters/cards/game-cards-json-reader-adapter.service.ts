import { Injectable } from '@angular/core';
import { CardsFetchPort } from '../../ports/cards-fetch-port';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as baseCards from '../../../assets/data/cards/base-cards.json';
import { GameCard } from '../../domain/game-card';

@Injectable({
    providedIn: 'root',
})
export class GameCardsJsonReaderAdapterService implements CardsFetchPort {
    constructor(private http: HttpClient) {}

    getAllCards(): Observable<GameCard[]> {
        return of(JSON.parse(JSON.stringify(baseCards.data)) as GameCard[]);
    }
}
