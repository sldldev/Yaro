import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageRecipientComponent } from './message-recipient.component';

describe('MessageRecipientComponent', () => {
  let component: MessageRecipientComponent;
  let fixture: ComponentFixture<MessageRecipientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageRecipientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageRecipientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
