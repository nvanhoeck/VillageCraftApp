import { TestBed } from '@angular/core/testing';

import { GameFacadeService } from './game-facade.service';

describe('GameFacadeService', () => {
  let service: GameFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
