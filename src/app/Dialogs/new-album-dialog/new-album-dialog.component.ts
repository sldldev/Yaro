import {Component, Inject, OnInit} from '@angular/core';
import {AlbumService} from '../../Services/album.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FileObject} from '../../DataModules/file.model';

@Component({
  selector: 'app-new-album-dialog',
  templateUrl: './new-album-dialog.component.html',
  styleUrls: ['./new-album-dialog.component.css']
})
export class NewAlbumDialogComponent implements OnInit {
  public albumName = '';
  public albumInfo = '';

  constructor(private albumService: AlbumService,
              public dialogRef: MatDialogRef<NewAlbumDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: FileObject[]) {
  }

  ngOnInit() {
  }

  submitAlbum() {
    const album = {albumName: this.albumName, albumInfo: this.albumInfo};
    return album;
  }

}
