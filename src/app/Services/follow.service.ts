import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Post} from '../DataModules/post.model';
import {map, tap} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Users} from '../DataModules/users.model';
import {host} from '../globals';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  public currentlocalhost = 'https://localhost:5001';
  private users: Users[] = []; // albums array
  private usersUpdated = new Subject<Users[]>();
  private usersFollowingUpdated = new Subject<Users[]>();
  private usersFollowing: Users[] = [];

  constructor(private http: HttpClient) {
  }

  /**
   * method responsible to get user update listener
   */
  getUsersUpdateListener() {
    return this.usersUpdated.asObservable();
  }

  /**
   * method responsible to get following update listener
   */
  getUsersFollowingUpdateListener() {
    return this.usersFollowingUpdated.asObservable();
  }

  /**
   * method responsible to get follow users
   */
  getUsers() {
    return this.http.get(host + '/api/follow/users/')
      .pipe(tap(console.log), map(serverResponse => serverResponse)) // we re-edit the information to remove the  messages
      .subscribe(files => {
          this.users = files;
          console.log(JSON.stringify(this.users));
          this.usersUpdated.next(this.users); // we return the information trough observable
        }
      );
  }
/**
 * method responsible to get followers users
 */
  getFollowingUsers() {
    return this.http.get(host + '/api/follow/followers/')
      .pipe(tap(console.log), map(serverResponse => serverResponse)) // we re-edit the information to remove the  messages
      .subscribe(files => {
          this.usersFollowing = files;
          console.log(JSON.stringify(this.usersFollowing));
          this.usersFollowingUpdated.next(this.usersFollowing); // we return the information trough observable
        }
      );
  }

  /**
   * method reponsible to add user to follow group
   * @param userID
   */
  followUser(userID) {
    const request = this.http.post<{ post: Post }>(host + '/api/follow/follow/', {_id: userID})
      .pipe(tap(console.log), map((serverResponse => serverResponse)))
      .subscribe((data) => {
        console.log('Received Data:' + data);
        console.dir(data);
        //this.users.unshift(data);
        const index = this.users.findIndex((e) => e._id === data._id);
        this.users[index] = data;
        this.usersUpdated.next([...this.users]);
        console.dir(this.users);
      });
  }

  /**
   * method responsible to unflollow spesific user.
   * @param userID
   */
  unFollowUser(userID) {
    const request = this.http.post<{ post: Post }>(host + '/api/follow/unfollow/', {_id: userID})
      .pipe(tap(console.log), map((serverResponse => serverResponse)))
      .subscribe((data) => {
        console.log('Received Data:' + data);
        console.dir(data);
        const index = this.users.findIndex((e) => e._id === data._id);
        this.users[index] = data;
        this.usersUpdated.next([...this.users]);
        console.dir(this.users);
      });
  }
}
