import { Injectable } from '@angular/core';
import { GameProjectionService } from '../query/game/game-projection.service';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GetPlayerBuildingLaneUseCaseService {
    constructor(private projectionService: GameProjectionService) {}

    getPlayerBuildingLane$(playerId: string) {
        return this.projectionService.getPlayer$(playerId).pipe(
            map(player => {
                return player.findBuildingLane();
            })
        );
    }
}
