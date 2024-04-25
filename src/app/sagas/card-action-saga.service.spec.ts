import { TestBed } from '@angular/core/testing';

import { CardActionSagaService } from './card-action-saga.service';

describe('CardActionSagaService', () => {
    let service: CardActionSagaService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CardActionSagaService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
