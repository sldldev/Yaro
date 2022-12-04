import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Post } from "../DataModels/post.model";
import { map, tap } from "rxjs/operators";
import { Subject } from "rxjs";
import { Users } from "../DataModels/users.model";
import { host } from "../globals";

@Injectable({
  providedIn: "root",
})
export class FollowService {
  //public currentlocalhost = 'https://localhost:5001';
  private users: Users[] = []; // albums array

  private usersUpdated = new Subject<Users[]>();
  usersUpdated$ = this.usersUpdated.asObservable();

  private usersFollowingUpdated = new Subject<Users[]>();
  usersFollowingUpdated$ = this.usersFollowingUpdated.asObservable();

  private usersFollowing: Users[] = [];

  groupUsers$ = this.usersUpdated.asObservable();

  constructor(private http: HttpClient) {}

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
    debugger;  // eslint-disable-line no-debugger
    return this.http
      .get(host + "/api/follow/users/")
      .pipe(
        // tap(console.log),
        map((serverResponse) => serverResponse)
      ) // we re-edit the information to remove the  messages
      .subscribe((files: Users[]) => {
        this.users = files;
        //console.log(JSON.stringify(this.users));
        this.usersUpdated.next(this.users); // we return the information trough observable
      });
  }
  /**
   * method responsible to get followers users
   */
  getFollowingUsers() {
    return this.http
      .get(host + "/api/follow/followers/")
      .pipe(
        tap(console.log),
        map((serverResponse) => serverResponse)
      ) // we re-edit the information to remove the  messages
      .subscribe((files: Users[]) => {
        this.usersFollowing = files;
        //console.log(JSON.stringify(this.usersFollowing));
        this.usersFollowingUpdated.next(this.usersFollowing); // we return the information trough observable
      });
  }

  /**
   * method reponsible to add user to follow group
   * @param userID
   */
  followUser(userIdToFolow) {
    console.log(`followUser(${userIdToFolow}) `)
    const request = this.http
      .post<{ post: Post }>(host + "/api/follow/follow/", { objId: userIdToFolow })
      .pipe(
        // tap(console.log),
        map((serverResponse) => serverResponse)
      )
      .subscribe((data: any) => {
        //console.log('Received Data:' + data);
        //console.dir(data);
        //this.users.unshift(data);
        const index = this.users.findIndex((e) => e.id === data.objId);
        this.users[index] = data;
        this.usersUpdated.next([...this.users]);
        //console.dir(this.users);
      });
  }

  /**
   * method responsible to unflollow spesific user.
   * @param userID
   */
  unFollowUser(userID) {
    const request = this.http
      .post<{ post: Post }>(host + "/api/follow/unfollow/", { objId: userID })
      .pipe(
        // tap(console.log),
        map((serverResponse) => serverResponse)
      )
      .subscribe((data: any) => {
        // console.log('Received Data:' + data);
        // console.dir(data);
        const index = this.users.findIndex((e) => e.id === data.objId);
        this.users[index] = data;
        this.usersUpdated.next([...this.users]);
        // console.dir(this.users);
      });
  }
}
