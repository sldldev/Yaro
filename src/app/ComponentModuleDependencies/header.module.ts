import {NgModule} from '@angular/core';
import {HeaderComponent} from '../Components/header/header.component';
import {SidenavComponent} from '../Components/sidenav/sidenav.component';
import {MaterialModule} from './material.module';
import {AppRoutingModule} from '../app-routing.module';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [HeaderComponent, SidenavComponent],
  imports: [CommonModule, MaterialModule, AppRoutingModule],
  exports: [HeaderComponent, SidenavComponent]
})
export class HeaderModule {
}

