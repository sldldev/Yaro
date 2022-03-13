import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {FileObject} from '../DataModules/file.model';
import {Album} from '../DataModules/album.model';
import {host} from '../globals';
import {forEachComment} from 'tslint';

// we declare that this service should be created
// by the root application injector.
@Injectable({providedIn: 'root'})

export class FileService {
  private files: FileObject[] = []; // files array of type FileObject (interface)
  private sortedFiles: FileObject[] = [];
  private filesTodelete: string[] = [];
  private filesUpdated = new BehaviorSubject<FileObject[]>(this.files); // filesUpdated is the subject with BehaviorSubject returns files
  public currentlocalhost = 'https://localhost:5001';

  /**
   * constructor that inits Http client protocol
   * @param {HttpClient} http
   */
  constructor(private http: HttpClient) {
  }

  /**
   * we return filesUpdated asObservable trough
   * getter for security measures we want it to be encapsulated
   * @returns {Observable<FileObject[]>} as data that couldn't not be changed
   */
  getFileUpdateListener(): Observable<FileObject[]> {
    return this.filesUpdated.asObservable();
  }

  clearFiles() {
    this.filesUpdated.next(null);
  }

  /**
   * method responsible to upload files to the server
   * @param {string} albumName - the album to link the files to
   * @param {FormData} formData - form data information
   */
  uploadFile(albumId: string, formData: FormData) {
    formData.append('AlbumId', albumId); // we append the album name to the file
    console.log(formData); // log for debug will be removed in the future
    const request$ = this.http.post(host + '/api/data/file', formData, {reportProgress: true})
      // the server returns the file object that was entered the db
      .pipe(tap(console.log), map((serverResponse => serverResponse.file)))
      .subscribe((file) => {
        console.log('Received Data:');
        const index = this.files.findIndex((e) => e.url === file.url);
        if (index === -1) {
          this.files.push(file);
        } else {
          this.files[index] = file;
        }
        //this.files.push(file); // we push the received file to the fleUpdated list
        this.filesUpdated.next([...this.files]); // snd notification to the Subject to return the new files list.
      });
  }

  uploadAvatar(formData: FormData) {
    console.log(formData); // log for debug will be removed in the future
    return this.http.post<{ url: string }>(host + '/api/data/avatar', formData, {reportProgress: true});
    // the server returns the file object that was entered the db
    /*      .subscribe((file) => {
            console.dir(file);
          });*/
  }

  insertFile(tmp: FileObject) {
    this.files.push(tmp);
    this.filesUpdated.next([...this.files]);
  }

  /**
   * method responsible to retrieve files list from the server
   * by album id
   * @param {string} albumId
   * @returns {Subscription}
   */
  getFiles(albumId: string) {
    return this.http.get<{ message: string, files: any }>(host + '/api/data/file/' + albumId)
      .pipe(tap(console.log), map(serverResponse => serverResponse.files)) // we re-edit the information to remove the  messages
      .subscribe(files => {
          this.files = files;
          console.log(JSON.stringify(this.files));
          this.filesUpdated.next(this.files); // we return the information trough observable
        }
      );
  }

  updateLocalFiles(fileObject: FileObject) {
    this.files = this.files.filter(obj => obj !== fileObject);
    this.filesUpdated.next(this.files);
  }

  getCurrentFiles() {
    if (this.sortedFiles.length > 0) {
      return this.sortedFiles;
    }
    return this.files;
  }

  /**
   * mrthod responsibel to delete file from the server
   * @param {string} file_id
   */
  delFileFromDb(file_id: string, album_id: string) {
    const fileToDelete = {FileId: file_id, Album: album_id};
    this.http.post(host + '/api/data/delete_file/', fileToDelete)
      .subscribe(() => {
        console.log('deleted!');
        const idx = this.files.findIndex(val => val._id === file_id); // we search for te file index inside the file array
        this.files.splice(idx, 1); // remove it from the list
        this.filesUpdated.next([...this.files]); // return new list as observable
      });
  }

  delFromAllUserDb(file_id: string) {
    const fileToDelete = {FileId: file_id, Album: null};
    this.http.post(host + '/api/data/delete_file_from_all/', fileToDelete)
      .subscribe(() => {
        console.log('deleted!');
        const idx = this.files.findIndex(val => val._id === file_id); // we search for te file index inside the file array
        this.files.splice(idx, 1); // remove it from the list
        this.filesUpdated.next([...this.files]); // return new list as observable
      });
  }

  shareFileWithUser(user_id: string, files: string[]) {
    const fileToShare = {UserId: user_id, Files: files};
    this.http.post(host + '/api/data/share_selected/', fileToShare)
      .subscribe(() => {
        console.log('files Shared!');
      });
  }

  /**
   * method responsible to delete file by id
   * @param id
   */
  addRemoveDelete(id: string) {
    this.filesTodelete.push(id);
    console.log(this.filesTodelete);
  }

  filterFilesByDate(startDate, endDate) {

    const dataNew = this.files.filter(product => product.exifData.some(item => item.name === 'Date/Time Original' &&
      (new Date(item.value.split(' ')[0].replace(':', '-'))) >= (new Date(startDate)) &&
      (new Date(item.value.split(' ')[0].replace(':', '-'))) <= (new Date(endDate))));
    this.filesUpdated.next([...dataNew]);
    this.sortedFiles = dataNew;
  }

  resetFilter() {
    this.filesUpdated.next([...this.files]);
  }
}
