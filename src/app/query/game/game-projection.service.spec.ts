import { TestBed } from '@angular/core/testing';

import { GameProjectionService } from './game-projection.service';

describe('GameProjectionService', () => {
  let service: GameProjectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameProjectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
