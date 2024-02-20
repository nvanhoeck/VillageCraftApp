import { TestBed } from '@angular/core/testing';

import { GameDeckAdapterService } from './game-deck-adapter.service';

describe('GameDeckAdapterService', () => {
  let service: GameDeckAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameDeckAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
