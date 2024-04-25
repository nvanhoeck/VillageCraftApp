import { Component } from '@angular/core';
import { DefaultGameCard } from '../../domain/game-card';
import { GameFacadeService } from '../../facades/game-facade.service';
import { CommonModule } from '@angular/common';
import { GameCardComponent } from '../game-card/game-card.component';

@Component({
    selector: 'app-discard-pile',
    standalone: true,
    imports: [CommonModule, GameCardComponent],
    templateUrl: './discard-pile.component.html',
    styleUrl: './discard-pile.component.scss',
})
export class DiscardPileComponent {
    discardPile$ = this.gameFacade.getPlayerDiscardPile$();

    defaultCard = DefaultGameCard;

    constructor(private readonly gameFacade: GameFacadeService) {}
}
