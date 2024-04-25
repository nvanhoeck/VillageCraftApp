import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { GameSetupFacadeService } from '../facades/game-setup.facade.service';

export const gameSetupGuardGuard: CanActivateFn = () => {
    const gameSetupFacadeService = inject(GameSetupFacadeService);
    gameSetupFacadeService.setupPlayerVsPcGame();
    return gameSetupFacadeService.gameExists$();
};
