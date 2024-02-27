import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameMessagesToastComponent } from './game-messages-toast.component';

describe('GameMessagesToastComponent', () => {
  let component: GameMessagesToastComponent;
  let fixture: ComponentFixture<GameMessagesToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameMessagesToastComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameMessagesToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
