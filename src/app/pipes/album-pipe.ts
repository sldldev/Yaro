import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { AlbumModel } from '../DataModels/album.model';

@Pipe({
  name: 'albumPipe'
})

export class AlbumPipe implements PipeTransform {
  transform(albumList: AlbumModel[], searchBy: string | any, key: string): any {
    if (albumList.length === 0 || searchBy.length === 0) {
      console.warn('pipe empty', );
      return albumList;
    }
    // console.warn('pipe Exepted STR', searchStr);
    // console.warn('pipe Exepted Key', key);
    // console.warn(albumList);
    switch (key) {
      case 'name':
        console.warn(albumList.filter((album) => album.name.toLowerCase().indexOf(searchBy.toLowerCase()) !== -1));
        return albumList.filter((album: { name: string; }) => album.name.toLowerCase().indexOf(searchBy.toLowerCase()) !== -1);
        break;
      case 'date':
        return albumList.filter((album: { dateCreated: string; }) => {
          const albumCreatedDate = formatDate(album.dateCreated, 'yyyy-MM-dd', 'en_US');
          return albumCreatedDate >= formatDate(searchBy.start, 'yyyy-MM-dd', 'en_US') &&
            albumCreatedDate <= formatDate(searchBy.end, 'yyyy-MM-dd', 'en_US');
        });
        break;
      case 'info':
        return albumList.filter((album: { info: string| null; }) => album.info === null ? false : album.info.toLowerCase().indexOf(searchBy.toLowerCase()) !== -1);
        break;
      default:
        break;
    }
  }
}
