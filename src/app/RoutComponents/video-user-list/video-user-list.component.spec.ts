import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoUserListComponent } from './video-user-list.component';

describe('VideoUserListComponent', () => {
  let component: VideoUserListComponent;
  let fixture: ComponentFixture<VideoUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
