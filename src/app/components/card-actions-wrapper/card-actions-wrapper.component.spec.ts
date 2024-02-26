import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardActionsWrapperComponent } from './card-actions-wrapper.component';

describe('CardActionsWrapperComponent', () => {
  let component: CardActionsWrapperComponent;
  let fixture: ComponentFixture<CardActionsWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardActionsWrapperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardActionsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
