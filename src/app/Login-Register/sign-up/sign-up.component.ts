/**
 * Imports of used components and modules
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '../../../../node_modules/@angular/forms/forms';
import { AuthenticationService } from '../../Services/auth.service';
import { Subscription } from '../../../../node_modules/rxjs/index';
import { UIService } from '../../Services/ui.service';
import { AlbumService } from 'src/app/Services/album.service';
import { AlbumModel } from 'src/app/DataModels/album.model';

@Component ({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit, OnDestroy {
  isLoading = false;
  private loadingSub: Subscription;
  private authStatusSub: Subscription; // authStatusSub init with Subscription property

  /**
   * constructor that implements AuthenticationService
   * @param {AuthenticationService} authService
   */
  constructor(
    // was public
    private authService: AuthenticationService,
    private uiService: UIService) {
  }

  /**
   * onInit method prepared for future use of authStatus listening
   */
  ngOnInit() {
    localStorage.clear ();
    this.loadingSub = this.uiService.getLoadingStatus ().subscribe (isLoading => {
      this.isLoading = isLoading;
    });
    this.authStatusSub = this.authService.getAuthStatusListener ().subscribe (
      authStatus => {
      }
    );

  }

  /**
   * method that triggers the create user service
   * @param {NgForm} form
   */
  onSign(form: NgForm) {
    if (form.invalid) { // if form is invalid will not continue
      return;
    } else { // in case form filled correctly this method will call the authService create user method
      this.authService.createUser (form.value.Email, form.value.Password, form.value.FirstName, form.value.LastName);
    }
    form.resetForm (); // clear the form from input data
  }

  /**
   * on component exit stop listening to the StatusListener
   */
  ngOnDestroy() {
    this.loadingSub.unsubscribe ();
    this.authStatusSub.unsubscribe ();

  }
}
