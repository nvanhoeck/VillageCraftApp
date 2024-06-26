import { Injectable } from '@angular/core';
import { GameProjectionService } from '../query/game/game-projection.service';

@Injectable({
    providedIn: 'root',
})
export class GetGameUseCaseService {
    constructor(private projectionService: GameProjectionService) {}

    public getGame$(gameId: string) {
        return this.projectionService.getGame$(gameId);
    }
}
