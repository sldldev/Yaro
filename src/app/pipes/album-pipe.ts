import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'albumPipe'
})

export class AlbumPipe implements PipeTransform {
  transform(albumList, searchStr: string, key: string): any {
    if (albumList.length === 0 || searchStr === '') {
      return albumList;
    }

    switch (key) {
      case 'name':
        return albumList.filter((album) => album.AlbumName.toLowerCase().indexOf(searchStr.toLowerCase()) !== -1);
        break;
      case 'date':
        return albumList.filter((album) => album.Date.toLowerCase().indexOf(searchStr.toLowerCase()) !== -1);
        break;
      case 'info':
        return albumList.filter((album) => album.Info.toLowerCase().indexOf(searchStr.toLowerCase()) !== -1);
        break;

    }
  }
}
