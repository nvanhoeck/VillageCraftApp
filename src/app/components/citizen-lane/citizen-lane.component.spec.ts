import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenLaneComponent } from './citizen-lane.component';

describe('CitizenLaneComponent', () => {
    let component: CitizenLaneComponent;
    let fixture: ComponentFixture<CitizenLaneComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CitizenLaneComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CitizenLaneComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
