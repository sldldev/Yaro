import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthenticationService} from '../../Services/auth.service';
import {observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {
  userIsAuthenticated = JSON.parse(localStorage.getItem('loggedIn') || 'false');
  userName: string;
  avatar = '/assets/images/man.svg';
  private authListenerSubs: Subscription;
  @Output() closeSidenav = new EventEmitter<void>();

  constructor(private authService: AuthenticationService) {
  }

  /**
   * we init the authentication listener as component generated
   * and listening for changes in the authentication status
   */
  ngOnInit() {
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      if(this.userIsAuthenticated===true){
        this.userName = this.authService.getUserName();
        this.avatar = this.authService.getAvatar();
      }

    });
    if(this.authService.getAuthStatus() === true){
      this.authService.updateAuthStatusListener();
    }
  }

  /**
   * on component destroy we stop listening
   */
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();

  }

  /**
   * function responsible to emit event of the closing of side bar
   */
  onClose() {
    this.closeSidenav.emit();
  }

}
