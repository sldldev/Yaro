import {Component, OnInit, ChangeDetectionStrategy, ViewChild} from '@angular/core';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {Album} from '../../DataModules/album.model';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material';
import {DeleteAlbumDialogComponent} from '../../Dialogs/delete-album-dialog/delete-album-dialog.component';
import {FileService} from '../../Services/files.service';
import {AlbumService} from '../../Services/album.service';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
/**
 * AlbumList Component
 */
export class AlbumListComponent implements OnInit {
  albums: Observable<Album[]>; // initing the album array as Observable
  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;
  public album_name: string = '';
  public filterStr: string = '';
  public filterKey: string = 'name';

  /**
   * init the constructor with the moduls we use
   * @param {AlbumService} albumsService
   * @param {ActivatedRoute} route
   */
  constructor(private albumsService: AlbumService, public route: ActivatedRoute, private dialog: MatDialog, private fileService: FileService) {
    /*    this.albumsService = albumsService;*/
  }

  /**
   * when we init the component we get the album information from the
   * mongo server by Services
   */
  ngOnInit() {
    this.albumsService.getAlbums();
    console.log(this.albumsService);
    this.albums = this.albumsService.getAlbumUpdateListener(); // we init to listen the the album changes in array

  }

  onInput() {
    this.albumsService.filterAlbums(this.album_name);
  }

  /**
   * the method get the album id we want to remove from mongoDB
   * @param {string} albumId
   */
  onDelete(albumId: string, albumName: string) {
    console.log('the album Id passed' + albumId);
    this.albumsService.getFilesCount(albumId).subscribe((data) => {
      console.log('files counted' + data);
      if (data > 0) {
        const dialogRef = this.dialog.open(DeleteAlbumDialogComponent, { // we init dialog to ask user if he sure he want to delete
          // and pass the album name to the dialog
          data: {
            message: albumName + ' album contains ' + data + ' files.'
          }
        });
        // we subscribe to the result of Dialog close
        dialogRef.afterClosed().subscribe(result => {
            console.log('the result is:' + result);
            if (!result) {
              return;
            } else {
              this.albumsService.deleteAlbum(albumId);
              return;
            }
          }
        );
      } else {
        this.albumsService.deleteAlbum(albumId);
      }

    });
  }

  changeKey(key: string) {
    this.filterKey = key;
    console.log(key);
    console.dir(key);
  }

}
