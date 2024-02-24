import { TestBed } from '@angular/core/testing';

import { ErrorMessagesAdapterService } from './error-messages-adapter.service';

describe('ErrorMessagesAdapterService', () => {
  let service: ErrorMessagesAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorMessagesAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
