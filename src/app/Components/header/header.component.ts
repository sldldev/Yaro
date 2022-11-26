import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { AuthenticationService } from '../../Services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { SignalrService } from '../../Services/signalr.service';
import { ThemeService } from '../..//Services/theme.service';
import { NotificationService } from '../../Services/notification.service';
import { NotificationModel } from '../../DataModels/notification.model';
import { ChatService } from '../../Services/chat.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

/**
 * component of the header
 */
export class HeaderComponent implements OnInit, OnDestroy {

  userIsAuthenticated: any = JSON.parse(localStorage.getItem('loggedIn') || 'false'); // init user authentication to false
  private authListenerSubs: Subscription; // init the subscription
  notifications: Observable<NotificationModel[]>;
  unreadNotifications: Observable<number>;
  unreadMessages: Observable<number>;
  private currentLocation = 'My Albums';
  @Output() sidenavToggle = new EventEmitter<void>(); // side nav toggle listener
  @Output() sidenavClose = new EventEmitter<void>(); // side nav close listner
/* 
  albumButtons = [
    {
      buttonName: 'My Albums',
      buttonLink : '//albums',
    },
    {
      buttonName: 'Add Album',
      buttonLink: '//create',
    },
  ]; */

  /**
   * component using the service of tAuthentication Service
   * @param {AuthenticationService} authService
   */
  constructor(
    private authService: AuthenticationService,
    private themeService: ThemeService,
    private notificationService: NotificationService,
    private messageService: ChatService) {
  }

  ngOnInit() {
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      // on init we get the authentication status from the observable
      //console.log('User status ' + this.userIsAuthenticated);
      if (this.userIsAuthenticated === true) {
        //console.log('User Logged in!');
        this.notificationService.getUserNotification();
        this.messageService.getUnreadMessageSize();
        this.notifications = this.notificationService.getPostUpdateListener();
        this.unreadNotifications = this.notificationService.getUnreadNotificatinListener();
        this.unreadMessages = this.messageService.getUnreadMessageListner();
      }
    });
    /*    this.notificationService.getUserNotification();
        this.notifications = this.notificationService.getPostUpdateListener();*/
    if (this.authService.getAuthStatus() === true) {
      //console.log('Auth status true!');
      this.authService.updateAuthStatusListener();
    }
  }

  markAllAsRead() {
    this.notificationService.markAllAsRead();
  }

  /**
   * function emits the sidenav event if user opened side nav
   */
  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onCloseSideNav() {
    this.sidenavClose.emit();
  }

  /**
   * function sends logout request trough service
   */
  onLogout() {
    this.authService.logout();
    this.onCloseSideNav();
  }

  /**
   * when component no longer in use stop listening
   */
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
    
  }


  changeTheme() {
    this.themeService.toggleTheme();
  }
}
