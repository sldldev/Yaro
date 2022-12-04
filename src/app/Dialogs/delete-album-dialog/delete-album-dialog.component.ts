import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-delete-album-dialog',
  templateUrl: './delete-album-dialog.component.html',
  styleUrls: ['./delete-album-dialog.component.css']
})
export class DeleteAlbumDialogComponent {

  /**
   * delete album conformation dialog
   * @param passedData the album name that is going to be deleted
   */
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {
  }
}
