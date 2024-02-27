import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSlotComponent } from './card-slot.component';

describe('CardSlotComponent', () => {
  let component: CardSlotComponent;
  let fixture: ComponentFixture<CardSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardSlotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
