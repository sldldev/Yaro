import {NgModule} from '@angular/core';
import {LoginComponent} from '../Login-Register/login/login.component';
import {SignUpComponent} from '../Login-Register/sign-up/sign-up.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from './material.module';
import {AppRoutingModule} from '../app-routing.module';

@NgModule({
  declarations: [LoginComponent, SignUpComponent],
  imports: [CommonModule, FormsModule, MaterialModule, AppRoutingModule],
  exports: []
})

export class AuthModule {
}


