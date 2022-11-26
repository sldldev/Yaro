import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRestoreComponent } from './admin-restore.component';

describe('AdminRestoreComponent', () => {
  let component: AdminRestoreComponent;
  let fixture: ComponentFixture<AdminRestoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRestoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRestoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
