import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { gameSetupGuardGuard } from './game-setup-guard.guard';

describe('gameSetupGuardGuard', () => {
    const executeGuard: CanActivateFn = (...guardParameters) =>
        TestBed.runInInjectionContext(() =>
            gameSetupGuardGuard(...guardParameters)
        );

    beforeEach(() => {
        TestBed.configureTestingModule({});
    });

    it('should be created', () => {
        expect(executeGuard).toBeTruthy();
    });
});
