import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanishmentComponent } from './banishment.component';

describe('BanishmentComponent', () => {
    let component: BanishmentComponent;
    let fixture: ComponentFixture<BanishmentComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BanishmentComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(BanishmentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
