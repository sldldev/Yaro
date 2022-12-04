import {NgModule} from '@angular/core';

import {AlbumComponent} from '../RoutComponents/album/album.component';
import {AddAlbumComponent} from '../RoutComponents/add-album/add-album.component';
import {AlbumListComponent} from '../RoutComponents/album-list/album-list.component';
import {CommonModule, DatePipe} from '@angular/common';
import {MaterialModule} from './material.module';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from '../app-routing.module';

import { AdminBackupComponent } from '../RoutComponents/admin-backup/admin-backup.component';
import { AdminControllsComponent } from '../RoutComponents/admin-controlls/admin-controlls.component';
import { AdminRestoreComponent } from '../RoutComponents/admin-restore/admin-restore.component';
import { AdminUsersComponent } from '../RoutComponents/admin-users/admin-users.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { SaveItemComponent } from '../RoutComponents/save-item/save-item.component';

@NgModule({
  declarations: [
    AdminBackupComponent,
    AdminControllsComponent,
    AdminRestoreComponent,
    AdminUsersComponent,
    // rest just for test
//     AddAlbumComponent,
//     AlbumListComponent,
//     AlbumComponent,
//     SecureImageComponent,
//     AlbumPipe,
//    // SaveItemComponent,
    //ImageCarouselComponent,


  ],
    imports: [
        NgbModule,
        CommonModule,
        MaterialModule,
        FormsModule,
        AppRoutingModule,
      //GroupModule,
    ],
  exports: [AdminControllsComponent, 
    //SecureImageComponent,
     ] ,//SecureImageComponent, ImageCarouselComponent,],
 // bootstrap: [ImageCarouselComponent]
})
export class AdminComponentsModule {
}
