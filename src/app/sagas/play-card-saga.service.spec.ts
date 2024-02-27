import { TestBed } from '@angular/core/testing';

import { PlayCardSagaService } from './play-card-saga.service';

describe('PlayCardSagaService', () => {
  let service: PlayCardSagaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayCardSagaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
