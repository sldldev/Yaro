import {NgModule} from '@angular/core';
import {DeleteAlbumDialogComponent} from '../Dialogs/delete-album-dialog/delete-album-dialog.component';
import {ErrorComponent} from '../Dialogs/error/error.component';
import {ImageDisplayComponent} from '../Dialogs/image-display/image-display.component';
import {MaterialModule} from './material.module';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    ErrorComponent,
    ImageDisplayComponent,
    DeleteAlbumDialogComponent
  ],
  imports: [CommonModule, MaterialModule],
  exports: [],
})

export class MessagesModule {
}
