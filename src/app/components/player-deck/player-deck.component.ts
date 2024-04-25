import { Component } from '@angular/core';
import { GameFacadeService } from '../../facades/game-facade.service';
import { CommonModule } from '@angular/common';
import { GameCardComponent } from '../game-card/game-card.component';
import { DefaultGameCard } from '../../domain/game-card';

@Component({
    selector: 'app-player-deck',
    standalone: true,
    imports: [CommonModule, GameCardComponent],
    templateUrl: './player-deck.component.html',
    styleUrl: './player-deck.component.scss',
})
export class PlayerDeckComponent {
    deck$ = this.gameFacade.getPlayerDeck$();

    defaultCard = DefaultGameCard;

    constructor(private readonly gameFacade: GameFacadeService) {}
}
