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
// import { ImageCarouselComponent } from '../RoutComponents/image-carousel/image-carousel.component';

import {AlbumPipe} from '../pipes/album-pipe';
import {MatProgressBarModule } from '@angular/material/progress-bar';
import {FilterModuleModule} from '../ComponentModuleDependencies/filter-module.module';
import {OptionsButtonsModule } from './options-buttons.module';
//import { SaveItemComponent } from '../RoutComponents/save-item/save-item.component';

@NgModule({
  declarations: [
    AddAlbumComponent,
    AlbumListComponent,
    AlbumComponent,
    SecureImageComponent,
    AlbumPipe,
   // SaveItemComponent,
    //ImageCarouselComponent,


  ],
    imports: [
      CommonModule,
      MaterialModule,
      FormsModule,
      AppRoutingModule,
      ScrollingModule,
      MatProgressBarModule,
      FilterModuleModule,
      OptionsButtonsModule,
      //GroupModule,
    ],
  exports: [SecureImageComponent, OptionsButtonsModule,  ] ,//SecureImageComponent, ImageCarouselComponent,],
 // bootstrap: [ImageCarouselComponent]
})
export class AlbumComponentsModule {
}
