import { Injectable } from '@angular/core';
import { GameProjectionService } from '../query/game/game-projection.service';

@Injectable({
    providedIn: 'root',
})
export class GetPlayerUseCaseService {
    constructor(private projectionService: GameProjectionService) {}

    public getPlayerIds$(gameId: string) {
        return this.projectionService.getPlayerIds$(gameId);
    }
}
