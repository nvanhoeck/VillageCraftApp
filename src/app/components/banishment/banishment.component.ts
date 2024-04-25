import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameCardComponent } from '../game-card/game-card.component';
import { DefaultGameCard } from '../../domain/game-card';
import { GameFacadeService } from '../../facades/game-facade.service';

@Component({
    selector: 'app-banishment',
    standalone: true,
    imports: [CommonModule, GameCardComponent],
    templateUrl: './banishment.component.html',
    styleUrl: './banishment.component.scss',
})
export class BanishmentComponent {
    banishment$ = this.gameFacade.getPlayerBanishment$();

    defaultCard = DefaultGameCard;

    constructor(private readonly gameFacade: GameFacadeService) {}
}
