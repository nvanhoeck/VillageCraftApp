import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, take } from 'rxjs';
import { GameCard } from '../domain/game-card';
import { GameCardsJsonReaderAdapterService } from '../adapters/cards/game-cards-json-reader-adapter.service';

@Injectable({ providedIn: 'root' })
export class CardsUseCaseService {
    private gameCards: Subject<GameCard[]> = new BehaviorSubject<GameCard[]>(
        []
    );

    constructor(private cardsFetchPort: GameCardsJsonReaderAdapterService) {
        cardsFetchPort
            .getAllCards()
            .pipe(take(1))
            .subscribe(cards => this.gameCards.next(cards));
    }

    public getAllCards = () => {
        return this.gameCards.asObservable();
    };
}
