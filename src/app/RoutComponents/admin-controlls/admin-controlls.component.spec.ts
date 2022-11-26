import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminControllsComponent } from './admin-controlls.component';

describe('AdminControllsComponent', () => {
  let component: AdminControllsComponent;
  let fixture: ComponentFixture<AdminControllsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminControllsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminControllsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
