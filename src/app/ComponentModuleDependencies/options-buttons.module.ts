import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionsButtonsComponent } from 'src/app/RoutComponents/tool-barbuttons/options-buttons.component';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  declarations: [
    OptionsButtonsComponent,
  ],
  imports: [CommonModule, MaterialModule, AppRoutingModule],
  exports: [
    OptionsButtonsComponent,
  ]
})
export class OptionsButtonsModule { }
