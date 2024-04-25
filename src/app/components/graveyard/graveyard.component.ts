import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameCardComponent } from '../game-card/game-card.component';
import { DefaultGameCard } from '../../domain/game-card';
import { GameFacadeService } from '../../facades/game-facade.service';

@Component({
    selector: 'app-graveyard',
    standalone: true,
    imports: [CommonModule, GameCardComponent],
    templateUrl: './graveyard.component.html',
    styleUrl: './graveyard.component.scss',
})
export class GraveyardComponent {
    graveyard$ = this.gameFacade.getPlayerGraveyard$();

    defaultCard = DefaultGameCard;

    constructor(private readonly gameFacade: GameFacadeService) {}
}
