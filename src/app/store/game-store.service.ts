import { Injectable } from '@angular/core';
import { Game } from '../domain/game';

@Injectable({
    providedIn: 'root',
})
export class GameStoreService {
    private gameStore: { [key: string]: Game };

    constructor() {
        this.gameStore = {};
    }

    create(game: Game) {
        this.gameStore[game.id] = game;
    }

    update(game: Game) {
        this.gameStore[game.id] = game;
    }

    get(id: string) {
        return this.gameStore[id];
    }
}
