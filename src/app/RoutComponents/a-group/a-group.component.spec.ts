import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AGroupComponent } from './a-group.component';

describe('AGroupComponent', () => {
  let component: AGroupComponent;
  let fixture: ComponentFixture<AGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
