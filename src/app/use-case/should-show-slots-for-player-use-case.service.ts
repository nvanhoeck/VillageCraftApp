import { Injectable } from '@angular/core';
import { GameProjectionService } from '../query/game/game-projection.service';

@Injectable({
    providedIn: 'root',
})
export class ShouldShowSlotsForPlayerUseCaseService {
    constructor(private projectionService: GameProjectionService) {}

    shouldShowCitizenSlotsForPlayer$(playerId: string, gameId: string) {
        return this.projectionService.shouldShowCitizenSlotFor$(
            playerId,
            gameId
        );
    }

    shouldShowBuildingSlotsForPlayer$(playerId: string, gameId: string) {
        return this.projectionService.shouldShowBuildingSlotFor$(
            playerId,
            gameId
        );
    }
}
