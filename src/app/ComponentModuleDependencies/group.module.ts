import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {MaterialModule} from './material.module';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from '../app-routing.module';
import {ScrollingModule} from '@angular/cdk/scrolling';
//import { FilterByComponent}  from '../RoutComponents/filter-by/filter-by.component';
import { GroupsComponent } from '../RoutComponents/groups/groups.component';
import { GroupPipe } from '../pipes/group-pipe';
import { FilterModuleModule } from './filter-module.module';
import { OptionsButtonsModule } from './options-buttons.module';
import { AGroupComponent } from '../RoutComponents/a-group/a-group.component';
import { AddGroupComponent } from '../RoutComponents/add-group/add-group.component';
import { UsersListComponent } from '../RoutComponents/users-list/users-list.component';
//import { GroupServiceFacade } from '../Services/groupServiceFacade';

@NgModule({
  declarations: [
    GroupsComponent,
    GroupPipe,
    AGroupComponent,
    AddGroupComponent,
    UsersListComponent
  ],
  imports: [
      CommonModule,
      MaterialModule,
      FormsModule,
      AppRoutingModule,
      ScrollingModule,
      FilterModuleModule,
      OptionsButtonsModule,
      ],
  exports: [
    OptionsButtonsModule,
    AddGroupComponent,
    UsersListComponent,
    AGroupComponent,
    //GroupServiceFacade,
  ],

})
export class GroupModule { }
