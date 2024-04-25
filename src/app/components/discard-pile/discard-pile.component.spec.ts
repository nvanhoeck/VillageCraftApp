import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscardPileComponent } from './discard-pile.component';

describe('DiscardPileComponent', () => {
    let component: DiscardPileComponent;
    let fixture: ComponentFixture<DiscardPileComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DiscardPileComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DiscardPileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
