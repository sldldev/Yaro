import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { RtcService } from '../../Services/rtc.service';
import { UserInfo } from '../../DataModels/video.model';
import { FollowService } from 'src/app/Services/follow.service';
import { Users } from 'src/app/DataModels/users.model';
import { FormControl } from '@angular/forms';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-video-user-list',
  templateUrl: './video-user-list.component.html',
  styleUrls: ['./video-user-list.component.css'],
})
export class VideoUserListComponent implements OnInit {
  @Output() userSelected: EventEmitter<UserInfo> = new EventEmitter();

  public videoUsers$: Observable<Array<UserInfo>>;
  public trueUsers: Observable<Users[]>;
  optionsUsersList?: Users[];
  myControl = new FormControl();

  constructor(
    private rtcService: RtcService,
    private followService: FollowService
  ) {}

  ngOnInit() {
    // this.followService.getUsers();
    // this.trueUsers = this.followService.getUsersUpdateListener();

    // this.trueUsers.subscribe((usersList: Users[]) => {
    //   this.optionsUsersList = usersList;
    // });

    // this.trueUsers = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map((value) => this._filter(value))
    // );
    // video Users
    this.videoUsers$ = this.rtcService.users$;
  }

  
  private _filter(value: string): Users[] {
    const filterValue = value.toLowerCase();

    return this.optionsUsersList.filter(option => option.firstName.toLowerCase().indexOf(filterValue) === 0);
  }
  public userClicked(user: Users ) {
    const videoUser: UserInfo = {
      userName : `${user.firstName} ${user.lastName}`,
      connectionId :'bob'
    };

    this.userSelected.emit(videoUser);
  }
}
