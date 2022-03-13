import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'datePipe'
})

export class AlbumPipe implements PipeTransform {
  transform(albumList, startDate: string, endDate: string): any {
    if (albumList.length === 0 || startDate === '') {
      return albumList;
    }
  }
}
