import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationLaneComponent } from './location-lane.component';

describe('LocationLaneComponent', () => {
    let component: LocationLaneComponent;
    let fixture: ComponentFixture<LocationLaneComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LocationLaneComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(LocationLaneComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
