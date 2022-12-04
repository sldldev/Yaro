/**
 * Imports of used components and modules
 */
import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '../../../../node_modules/@angular/forms/forms';
import {AuthenticationService} from '../../Services/auth.service';
import {UIService} from '../../Services/ui.service';
import {Subscription} from 'rxjs';
import {SignalrService} from '../../Services/signalr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy, Object {
  isLoading = false;
  private loadingSubs: Subscription;
  color: 'warn';

  /**
   * constructor implements Authentication Service
   * @param {AuthenticationService} authService
   */
  constructor(public authService: AuthenticationService, private uiService: UIService, private singalR: SignalrService) {
  }

  /**
   * we start listening to the shared uiService loading subject
   * to get indication for the loading bar
   */

  ngOnInit() {
    this.singalR.stopConnection();
    this.authService.logout();
    this.loadingSubs = this.uiService.getLoadingStatus().subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }

  /**
   * onLogin method sends the user information to the server
   * using login method of service
   * @param {NgForm} form
   */
  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.login(form.value.Email, form.value.password);
  }

  /**
   * when component destored we stop listening subscription
   */
  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

}
