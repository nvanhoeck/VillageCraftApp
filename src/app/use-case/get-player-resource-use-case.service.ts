import { Injectable } from '@angular/core';
import { GameProjectionService } from '../query/game/game-projection.service';

@Injectable({
    providedIn: 'root',
})
export class GetPlayerResourceUseCaseService {
    constructor(private projectionService: GameProjectionService) {}

    public getPlayerResources$(gameId: string, playerId: string) {
        return this.projectionService.getPlayerResources$(gameId, playerId);
    }
}
