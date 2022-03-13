import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../Services/auth.service';
import {Observable} from 'rxjs';
import {Users} from '../../DataModules/users.model';
import {FollowService} from '../../Services/follow.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: Observable<Users[]>;
  users2Show: Users[];
  filterStr: string = '';
  filterKey: string = 'first';

//new changes
  constructor(private followService: FollowService) {
  }

  ngOnInit() {
    this.followService.getUsers();
    this.users = this.followService.getUsersUpdateListener();


    this.users
      .subscribe(
        data => {
          this.users2Show = data;
          // this.users2Show = data.sort(( l, r ) => {
          //   const left = l.lastName + l.firstName;
          //   const right = r.lastName + r.firstName;
          //   return left < right ? -1 : 1;
          // });

        });
  }

  followUser(user) {
    console.log(user);
    this.followService.followUser(user._id);
  }

  unfollow(user) {
    console.log(user);
    this.followService.unFollowUser(user._id);
  }

  changeKey(key) {
    this.filterKey = key;
  }

}
