import { TestBed } from '@angular/core/testing';

import { GamePhaseFacadeService } from './game-phase-facade.service';

describe('GamePhaseFacadeService', () => {
    let service: GamePhaseFacadeService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(GamePhaseFacadeService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
