import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterByComponent} from '../RoutComponents/filter-by/filter-by.component';
import {MaterialModule} from './material.module';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from '../app-routing.module';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { GroupsComponent } from '../RoutComponents/groups/groups.component';
//import { GroupPipe } from '../pipes/group-pipe';
import {PeoplePipe} from '../pipes/people-pipe';

@NgModule({
  declarations: [
    FilterByComponent,
    //GroupPipe,
  ],
  imports: [
    CommonModule,
     MaterialModule,
     FormsModule
  ],
  exports: [FilterByComponent]
})
export class FilterModuleModule { }
