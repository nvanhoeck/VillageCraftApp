import { TestBed } from '@angular/core/testing';

import { GameSetupFacadeService } from './game-setup.facade.service';

describe('GameSetupFacadeService', () => {
  let service: GameSetupFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameSetupFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
