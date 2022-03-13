import {NgModule} from '@angular/core';
import {AlbumComponent} from '../RoutComponents/album/album.component';
import {AddAlbumComponent} from '../RoutComponents/add-album/add-album.component';
import {AlbumListComponent} from '../RoutComponents/album-list/album-list.component';
import {CommonModule, DatePipe} from '@angular/common';
import {MaterialModule} from './material.module';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from '../app-routing.module';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {SecureImageComponent} from '../Common/secure-image/secure-image.component';
import {AlbumPipe} from '../pipes/album-pipe';
import {MatProgressBarModule} from '@angular/material';


@NgModule({
  declarations: [
    AddAlbumComponent,
    AlbumListComponent,
    AlbumComponent,
    AlbumComponent,
    SecureImageComponent,
    AlbumPipe,
  ],
    imports: [CommonModule, MaterialModule, FormsModule, AppRoutingModule, ScrollingModule, MatProgressBarModule],
  exports: [SecureImageComponent,]
})
export class AlbumComponentsModule {
}
