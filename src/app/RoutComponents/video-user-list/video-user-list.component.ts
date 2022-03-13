import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { RtcService } from '../../Services/rtc.service';
import {UserInfo} from '../../DataModules/video.model';


@Component({
  selector: 'app-video-user-list',
  templateUrl: './video-user-list.component.html',
  styleUrls: ['./video-user-list.component.css']
})
export class VideoUserListComponent implements OnInit {

  @Output() userSelected: EventEmitter<UserInfo> = new EventEmitter();

  public users$: Observable<Array<UserInfo>>;


  constructor(private rtcService: RtcService) { }

  ngOnInit() {
    this.users$ = this.rtcService.users$;
  }

  public userClicked(user: UserInfo) {
    this.userSelected.emit(user);
  }

}

