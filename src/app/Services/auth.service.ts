/**
 * Imports of used components and modules
 */
import {HttpClient} from '@angular/common/http';
import {AuthData} from '../DataModules/auth-data.model';

import {UIService} from './ui.service';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Subject} from 'rxjs/internal/Subject';
import {Album} from '../DataModules/album.model';
import {Users} from '../DataModules/users.model';
import {map, tap} from 'rxjs/operators';
import {SignalrService} from './signalr.service';
import {host} from '../globals';

// Service is always decorated with @Injectable with providedIn root

@Injectable({providedIn: 'root'})


export class AuthenticationService {
  private isAuthenticated = JSON.parse(localStorage.getItem('loggedIn') || 'false'); // init is Authenticated with false
  private token = (localStorage.getItem('token') || 'null'); // token is of type string
  private userName = (localStorage.getItem('userName') || 'null');
  private userID = (localStorage.getItem('userID') || 'null');
  private avatar = (localStorage.getItem('avatar') || '/assets/images/man.svg');
  // public currentlocalhost = 'https://localhost:5001';
  private users: Users[] = []; // albums array
  private album: Users;
  private usersUpdated = new Subject<Users[]>(); // alb
  // authStatusListener is a new Subject() This connecting of observers to an observable with data type "True/False"
  private authStatusListener = new Subject<boolean>();

  /**
   * this Class constructor uses HttpClient and Router
   * @param {HttpClient} http
   * @param {Router} router
   * @param uiService
   */
  constructor(private http: HttpClient, private router: Router, private uiService: UIService) {
  }

  /**
   * method responsible to return the token of the connection
   * @returns {string}
   */
  getToken() {
    const tmp = localStorage.getItem('token');
    console.log('Get toke ' + tmp);
    return tmp;
  }

  /**
   * method returns the authentication status
   * @returns {boolean}
   */
  getAuthStatus() {
    return JSON.parse(localStorage.getItem('loggedIn') || 'false');
  }

  /**
   * method responsible to retrieve users avatar
   */
  getAvatar() {
    return localStorage.getItem('avatar') || '/assets/images/man.svg';
  }

  /**
   * method responsible to retrive username
   */
  getUserName() {
    return localStorage.getItem('userName');
  }

/**
 * method responsible to retrive user id
 */
  getUserID() {
    return localStorage.getItem('userID');
  }

  /**
   * get observable listener
   */
  getUsersUpdateListener() {
    return this.usersUpdated.asObservable();
  }

  /**
   * return the authStatusListener as Observable (True/False)
   * @returns {Observable<boolean>}
   */
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  /**
   * method responsible to update listener status
   */
  updateAuthStatusListener() {
    this.authStatusListener.next(true);
  }

  /**
   * method responsible to send post with new user information
   * @param {string} email
   * @param {string} password
   * @param firstName
   * @param lastName
   */
  createUser(email: string, password: string, firstName: string, lastName: string) {
    this.uiService.loadingChanged.next(true);
    const authData: AuthData = {username: email, password: password, firstName: firstName, lastName: lastName};

    this.http.post(host + '/api/auth/register', authData)
      .subscribe(serverResponse => {
        console.log(serverResponse); // log in favor of debug
        this.uiService.loadingChanged.next(false);
        this.router.navigate(['/']); // navigate to root
      }, err => {
        console.log(err); // debug log
        this.authStatusListener.next(false); // trigger the change of listener to false
      });

  }

  /**
   * method responsible to retrieve all registered users
   */
  getRegisteredUser() {
    return this.http.get(host + '/api/auth/users/')
      .pipe(tap(console.log), map(serverResponse => serverResponse)) // we re-edit the information to remove the  messages
      .subscribe(files => {
          this.users = files;
          console.log(JSON.stringify(this.users));
          this.usersUpdated.next(this.users); // we return the information trough observable
        }
      );
  }

  /**
   * method responsible to get user by id
   * @param id
   */
  getUserById(id) {
    return this.http.get<{ id: string, firstName: string, lastName }>(host + '/api/auth/user/' + id)
      .pipe(tap(console.log), map(serverResponse => serverResponse));
  }

  /**
   * method responsible to send post to the server with
   * login information
   * @param {string} email
   * @param {string} password
   */
  login(email: string, password: string) {
    this.uiService.loadingChanged.next(true);
    const authData: AuthData = {username: email, password: password, firstName: 'null', lastName: 'null'};

    this.http.post<{ token: string, userName: string, userID: string, avatar: string }>(host + '/api/auth/login', authData)
      .subscribe(serverResponse => {
        console.log(serverResponse);  // log for debug purpose
        this.uiService.loadingChanged.next(false);
        console.log('LogResponse' + serverResponse.token);
        const token = serverResponse.token; // token is the serverResponse information
        const userName = serverResponse.userName;
        const userID = serverResponse.userID;
        const avatar = (serverResponse.avatar != null) ? serverResponse.avatar : '/assets/images/man.svg';
        this.token = token; // init token with the token received from server
        this.userName = userName;
        this.userID = userID;
        this.isAuthenticated = true; // status of authentication changed to true
        this.avatar = avatar;
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('token', this.token);
        localStorage.setItem('userName', this.userName);
        localStorage.setItem('userID', this.userID);
        localStorage.setItem('avatar', this.avatar);
        this.authStatusListener.next(true); // triggers that authStatusListnere with True value
        this.router.navigate(['/albums']); // navigates to the /albums component
      });
  }

  /**
   * method responsible to end the connection
   */
  logout() {
    localStorage.clear();
    this.token = null;
    this.authStatusListener.next(false); // triggers the listener with false status
    this.router.navigate(['/']); // navigates back to root
    localStorage.clear();
  }
}
