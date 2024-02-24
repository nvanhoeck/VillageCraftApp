import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorMessagesToastComponent } from './error-messages-toast.component';

describe('ErrorMessagesToastComponent', () => {
  let component: ErrorMessagesToastComponent;
  let fixture: ComponentFixture<ErrorMessagesToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorMessagesToastComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ErrorMessagesToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
