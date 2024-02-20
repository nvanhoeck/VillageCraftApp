import { TestBed } from '@angular/core/testing';

import { GameCardsJsonReaderAdapterService } from './game-cards-json-reader-adapter.service';

describe('GameCardsJsonReaderAdapterService', () => {
  let service: GameCardsJsonReaderAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameCardsJsonReaderAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
