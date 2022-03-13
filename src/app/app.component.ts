import {Component, HostListener, Injectable, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from './Services/auth.service';
import {Subscription} from 'rxjs';
import 'hammerjs';
import {SignalrService} from './Services/signalr.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  userIsAuthenticated = JSON.parse(localStorage.getItem('loggedIn') || 'false');
  private authListenerSubs: Subscription;

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });

  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    localStorage.clear();
    this.authListenerSubs.unsubscribe();
  }
}
