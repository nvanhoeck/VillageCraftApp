import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingLaneComponent } from './building-lane.component';

describe('BuildingLaneComponent', () => {
    let component: BuildingLaneComponent;
    let fixture: ComponentFixture<BuildingLaneComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BuildingLaneComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(BuildingLaneComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
