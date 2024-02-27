import {TestBed} from '@angular/core/testing';

import {MessagesAdapterService} from './messages-adapter.service';

describe('ErrorMessagesAdapterService', () => {
  let service: MessagesAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagesAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
