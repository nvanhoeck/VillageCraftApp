import { TestBed } from '@angular/core/testing';

import { GameRepoService } from './game-repo.service';

describe('GameRepoService', () => {
  let service: GameRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
