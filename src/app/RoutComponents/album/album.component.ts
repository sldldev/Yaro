import {Component, OnInit, ChangeDetectionStrategy, ViewChild, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FileService} from '../../Services/files.service';
import {AlbumService} from '../../Services/album.service';
import {Album} from '../../DataModules/album.model';
import {Observable, Subscription} from 'rxjs';
import {MatDialog} from '@angular/material';
import {ImageDisplayComponent} from '../../Dialogs/image-display/image-display.component';
import {FileObject} from '../../DataModules/file.model';
import {DomSanitizer} from '@angular/platform-browser';
import {DeleteAlbumDialogComponent} from '../../Dialogs/delete-album-dialog/delete-album-dialog.component';
import {ErrorComponent} from '../../Dialogs/error/error.component';
import {ShareSelectedDialogComponent} from '../../Dialogs/share-selected-dialog/share-selected-dialog.component';
import {element} from 'protractor';
import {MoveSelectedDialogComponent} from '../../Dialogs/move-selected-dialog/move-selected-dialog.component';
import {NewAlbumDialogComponent} from '../../Dialogs/new-album-dialog/new-album-dialog.component';


@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/*@Injectable()*/
export class AlbumComponent implements OnInit, OnDestroy {
  @ViewChild('tabGroup') tabGroup; // child tabGroup of html init for changing value of the tab
  selectedIndex = 0; // init if the tab index
  albumName: string; // album name will hold string data
  albumInfo: Album; // album information will hold the object Album
  albums: Observable<Album[]>;

  startDateSelected;
  endDateSelected;
  filtered = false;

  files: Observable<FileObject[]>; // Observable for the files array
  deleteData: FileObject[] = [];
  selectAll = false;
  selectStr = 'Select All';
  isLoading = true;
  isLoadingSpinner = false;
  uploading = false;

  filesToUpload: Subscription;
  filesToUploadNumber = 0;
  numberFilesTotal = 1;
  progress;


  public file_name = '';
  public filterStr = '';
  public filterKey = 'name';

  /**
   * we init the class with next modules
   * @param {ActivatedRoute} route
   * @param {FileService} filesService
   * @param {AlbumService} albumService
   * @param {MatDialog} dialog
   */
  constructor(public route: ActivatedRoute,
              private filesService: FileService,
              private albumService: AlbumService,
              private dialog: MatDialog,
              private sanitizer: DomSanitizer
  ) {
  }

  /**
   * method we use once the components init to fetch
   * in order to present files
   */
  ngOnInit() {
    this.albumName = this.route.snapshot.paramMap.get('albumName'); // name we get trough param
    console.log('this albums is' + this.albumName);
    if (this.albumService.getAlbumSize()) {
      localStorage.setItem('album', JSON.stringify(this.albumService.getAlbumInfo(this.albumName)));
    }
    this.albumInfo = JSON.parse(localStorage.getItem('album'));
    console.log('The Album inside storage');
    console.log(this.albumInfo);
    console.log('Album Info returned');
    console.dir(this.albumInfo);
    console.log(this.albumInfo._id); // we get album info from the service
    this.files = this.filesService.getFileUpdateListener();
    this.filesToUpload = this.filesService.getFileUpdateListener().subscribe(e => {
      if (e && this.filesToUploadNumber > 0) {
        this.filesToUploadNumber--;
        this.progress = Math.round(100 - (100.0 * this.filesToUploadNumber) / this.numberFilesTotal);
        if (this.progress === 100) {
          this.uploading = false;
        }
        console.log('FILES INSIDE' + this.filesToUploadNumber);
        console.log('FILES Total' + this.progress);
      }
    }); // we init the files array with listenerdebugger;
    this.filesService.getFiles(this.albumName); // we fetch first information from the album trough file service
    this.isLoading = false;
  }

  /**
   * Image display component by MatDialog will be deleted in the future.
   * @param URL
   */
  displayImage(URL) {
    this.dialog.open(ImageDisplayComponent, {data: {url: URL}});
  }

  /**
   * method that gothers all files selected creates formData and sends it to server
   * file by file
   * @param event
   */
  onImagePicked(event) {
    this.uploading = true;
    this.tabGroup.selectedIndex = 0; // in order to return to the gallery tab
    const files = event.target.files;
    this.filesToUploadNumber = files.length;
    this.numberFilesTotal = files.length;
    if (files) {
      for (const file of files) {
        console.dir(file);
        const fd = new FormData();
        fd.append('File', file);
        this.filesService.uploadFile(this.albumInfo._id, fd); // every file in files array is send one by one
      }
    }
  }

  /**
   * this function useses the file service to del file
   * from the database
   * @param _id
   */
  removeFileFromDb(_id) {
    console.log('This is the recived Id');
    console.log(_id);
    this.filesService.delFileFromDb(_id, this.albumInfo._id);
  }

  deleteSelected() {

    const dialogRef = this.dialog.open(DeleteAlbumDialogComponent, { // we init dialog to ask user if he sure he want to delete
      // and pass the album name to the dialog
      data: {
        message: this.deleteData.length + ' files selected '
      }
    });
    // we subscribe to the result of Dialog close
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        console.log(result);
        return;
      } else {
        this.deleteData.forEach(e => {
          console.dir(e);
          console.log(e._id);
          this.filesService.delFileFromDb(e._id, this.albumInfo._id);
          this.deleteData = [];
        });
      }
    });
  }

  wipePhotoFromAll() {
    const dialogRef = this.dialog.open(DeleteAlbumDialogComponent, { // we init dialog to ask user if he sure he want to delete
      // and pass the album name to the dialog
      data: {
        message: this.deleteData.length + ' files selected '
      }
    });
    // we subscribe to the result of Dialog close
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        console.log(result);
        return;
      } else {
        this.deleteData.forEach(e => {
          console.dir(e);
          console.log(e._id);
          this.filesService.delFromAllUserDb(e._id);
        });
        this.deleteData = [];
      }
    });
  }

  shareSelected(): void {
    const sharedFiles: Array<string> = [];
    console.log('Data is present');
    console.log(this.deleteData);
    this.deleteData.forEach(e => {
      sharedFiles.push(e._id);
    });
    const dialogRef = this.dialog.open(ShareSelectedDialogComponent, {
      width: '250px',
      data: this.deleteData
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog was closed');
      console.log(result);
      if (result != null) {
        console.dir(this.deleteData);
        console.dir(sharedFiles);
        this.selectAll = false;
        this.deleteData = [];
        this.filesService.shareFileWithUser(result, sharedFiles);
      }
    });
  }

  moveSelectedToExistingAlbum(): void {
    const dialogRef = this.dialog.open(MoveSelectedDialogComponent, {
      width: '250px',
      data: this.deleteData
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog was closed');
      console.log(result);
      if (result != null) {
        const sharedFiles: Array<string> = [];
        this.deleteData.forEach(e => {
          sharedFiles.push(e._id);
          this.filesService.updateLocalFiles(e);
        });
        this.albumService.moveFilesToExistingAlbum(this.albumInfo._id, result, sharedFiles);
        this.deleteData = [];
      }
    });
  }

  moveSelectedToNewAlbum(): void {
    const dialogRef = this.dialog.open(NewAlbumDialogComponent, {
      width: '360px',
      height: '260px',
      data: this.deleteData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        const album: Album = {
          _id: null, // we don't know the id that will be generated by the server
          AlbumName: result.albumName, // album name
          Info: result.albumInfo,
          Date: ''// album description
        };
        const sharedFiles: Array<string> = [];
        this.deleteData.forEach(e => {
          sharedFiles.push(e._id);
          this.filesService.updateLocalFiles(e);
        });
        this.deleteData = [];
        console.dir('this selected' + this.deleteData);
        this.albumService.movePhotosToNewAlbum(album).subscribe(response => {
          console.log('response from server:');
          console.dir(response);
          console.log(response.id);
          this.albumService.moveFilesToExistingAlbum(this.albumInfo._id, response.id, sharedFiles);
          this.selectAll = false;
        });

      }
    });
  }

  addRemoveFiles(file: FileObject) {
    const index = this.deleteData.findIndex((e) => e._id === file._id);
    if (index === -1) {
      this.deleteData.push(file);
    } else {
      this.deleteData.splice(index, 1);
    }
  }

  openImageDialog(fileURL: string) {
    const dialogRef = this.dialog.open(ImageDisplayComponent, { // we init dialog to ask user if he sure he want to delete
      // and pass the album name to the dialog
      data: {
        imageData: this.filesService.getCurrentFiles(),
        currentImage: fileURL
      }
    });
  }


  chooseAll() {
    if (!this.selectAll) {
      this.files.forEach(file => {
        console.log('Adding all');
        console.dir(file);
        if (file != null) {
          file.forEach(data => {
            this.deleteData.push(data);
          });
        }
      });
    } else {
      this.deleteData = [];
    }
    this.selectAll = !this.selectAll;
    this.selectStr = this.selectAll ? 'Unselect All' : 'Select All';
    // add al files to the deleteData!!!!!!
  }

  ngOnDestroy() {
    this.filesService.clearFiles();
  }

  printDates() {
    this.filtered = true;
    console.log(this.startDateSelected + ':' + this.endDateSelected);
    if (this.startDateSelected && this.endDateSelected && this.startDateSelected < this.endDateSelected) {
      this.filesService.filterFilesByDate(this.startDateSelected, this.endDateSelected);
    } else {
      if (this.startDateSelected == null && this.endDateSelected == null) {
        this.filesService.resetFilter();
      } else {
        const dialogRef = this.dialog.open(ErrorComponent, { // we init dialog to ask user if he sure he want to delete
          // and pass the album name to the dialog
          data: {
            message: 'Wrong date selected'
          }
        });
      }
    }
  }

  resetDateFilter() {
    this.filesService.resetFilter();
    this.startDateSelected = '';
    this.endDateSelected = '';
    this.filtered = false;
  }
}

