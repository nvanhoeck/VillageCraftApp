import { TestBed } from '@angular/core/testing';

import { GameEventStoreService } from './game-event-store.service';

describe('EventStoreService', () => {
  let service: GameEventStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameEventStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
