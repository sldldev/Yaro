import {Album} from '../DataModules/album.model';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {host} from '../globals';

@Injectable({providedIn: 'root'}) // we inject services to the service
/**
 * Album service module
 */
export class AlbumService {
  private albums: Album[] = []; // albums array
  private album: Album;
  private albumsUpdated = new Subject<Album[]>(); // albumsUpdated is subject we want to observe
  private albumsCopy: Album[];
  public currentlocalhost = 'https://localhost:5001';

  /**
   *
   * we inject HttpClient service and Router service
   * @param {HttpClient} http
   * @param {Router} router
   */
  constructor(private http: HttpClient, public router: Router) {
  }

  filterAlbums(filter_string) {

    this.albumsCopy = this.albums.filter(
      item => item.AlbumName.toLowerCase().indexOf(filter_string.toLowerCase()) > -1
    );
    this.albumsUpdated.next(this.albumsCopy);
    /*    //this.getAlbums();
        this.albums=this.albums.filter(customer => customer.AlbumName.toLowerCase().indexOf(args[0].toLowerCase()) !== -1);
        this.albums = this.albums.filter(
          album => album.AlbumName.toLo === filter_string);
        this.albumsUpdated.next([...this.albums]);*/
  }

  /**
   * getAlbum method gets album id,
   * search trough the album array to find id
   * if id in albums == album id given
   * we return the album Object
   * @param albumId
   * @returns {Album}
   */
  getAlbumInfo(albumId) {
    console.log('size of alubums' + this.albums.length);
    console.dir(this.albums);
    const albumObject = this.albums.find(o => o._id === albumId);
    console.log(albumObject);
    return albumObject;
  }


  /**
   * getAlbums service sends get request to the server,
   * and retrieve all the albums of the user
   */
  getAlbums() {
    this.http.get<{ message: string, albums: any }>(host + '/api/album/albums')
      .pipe(map(albumData => { // the server response holds not the exact object we want so we map the object
        console.log(albumData);

        return albumData.albums.map(album => { // for each album inside the array we get we remap the object
          return { // and then return it
            AlbumName: album.albumName,
            Info: album.info,
            _id: album.id,
            creator: album.creator,
            Date: album.dateCreated
          };
        });

      }))
      .subscribe((transformedAlbums) => { // after we got all the transformed albums
        console.log(transformedAlbums);
        this.albums = transformedAlbums; // we assign in to our album array
        console.log('Sucsesfully fethesd' + this.albums.length);
        console.log(this.albums);
        this.albumsUpdated.next([...this.albums]); // and we inform the subject and return new copy of albums array
      });
  }


  getAlbum(id: string) {
    // id passed as param
    // tslint:disable-next-line:max-line-length
    return this.http.get<{ id: string, albumName: string, info: string, creator: string, dateCreated: string }>(host + '/api/album/album/' + id)
      .pipe(map(albumData => {
        console.log(albumData);
        return {
          AlbumName: albumData.albumName,
          Info: albumData.info,
          _id: albumData.id,
          creator: albumData.creator,
          Date: albumData.dateCreated.toString()
        };
      }));
  }


  getAlbumUpdateListener() {
    return this.albumsUpdated.asObservable();
  }

  /**
   * addAlbum service responsibel to add album to the server data base
   * it recieves the album object
   * @param {Album} albumObj
   */
  addAlbum(albumObj: Album) {
    const album: Album = albumObj;
    this.http.post<{ message: string, albumId: string }>(host + '/api/album/creat_album', album)
      .subscribe((responseData) => {
        // we receive back from the server the album id that was just added
        album._id = responseData.albumId; // init the album id with the id we received from server
        console.log(responseData.message);
        this.albums.push(album); // push the album to the array of albums
        this.albumsUpdated.next([...this.albums]); // and we inform the subject and return new copy of albums array
        this.router.navigate(['/albums']); // and navigate back to album page

      });
  }

  movePhotosToNewAlbum(albumObj: Album) {
    const album: Album = albumObj;
    return this.http.post<{ id: string }>(host + '/api/album/creat_album', album);
    // push the album to the array of albums// and navigate back to album page
  }

  /**
   * deleteAlbum service responsible to delete,
   * the album from the data base of the server
   * @param {string} albumId
   */
  deleteAlbum(albumId: string) { // we send the album id of the album we want to delete
    this.http.delete(host + '/api/album/delete_album/' + albumId) // pass album id as parameter
      .subscribe(() => {
        console.log('deleted!');
        // we remove the album from our list
        this.albums = this.albums.filter(album => album._id !== albumId); // init the album list with the filtered list
        this.albumsUpdated.next([...this.albums]); // and we inform the subject and return new copy of albums array
      });
  }

  getLocalAlbumSize() {
    return this.albums.length;
  }

  /**
   * method responsible to get number of files inside spesific album
   * @param albumId
   */
  getFilesCount(albumId: string) {

    return this.http.get<number>(host + '/api/album/count/' + albumId);
  }

  /**
   * updateAlbum Service is responsible to send,
   * album information we want to update on our database
   * @param {string} _id
   * @param {string} album
   * @param {string} info
   * @param date
   */
  updateAlbum(_id: string, album: string, info: string, date: string) {
    const albumUpdated = {_id: _id, AlbumName: album, Info: info, Date: date}; // init the album with the new album changes
    this.http.put(host + '/api/album/update_album/', albumUpdated) // pass put request to the server by id
      .subscribe(res => {
        const updatedAlbums = [...this.albums]; // we init updated albums with fresh copy of albums
        const oldAlbumIndex = updatedAlbums.findIndex(p => p._id === albumUpdated._id); // we find the index of the album updated
        updatedAlbums[oldAlbumIndex] = albumUpdated; // and replace with the new album object
        this.albums = updatedAlbums; // we init the new album list with the updated array of albums
        this.albumsUpdated.next([...this.albums]); // and we inform the subject and return new copy of albums array
        this.router.navigate(['/albums']); // navigate to album page
      });
  }

  moveFilesToExistingAlbum(currentAlbum: string, newAlbum: string, files: string[]) {
    const albumMoved = {AlbumToMoveTo: newAlbum, CurrentAlbum: currentAlbum, Files: files};
    this.http.post(host + '/api/album/move_album/', albumMoved)
      .subscribe(() => {
        console.log('files Shared!');
      });

  }

  getAlbumSize() {
    return this.albums.length;
  }
}
