import { TestBed } from '@angular/core/testing';

import { SetupGameCommandHandlerService } from './setup-game-command-handler.service';

describe('SetupGameCommandHandlerService', () => {
  let service: SetupGameCommandHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetupGameCommandHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
