import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'peoplePipe'
})

export class PeoplePipe implements PipeTransform {
  transform(peopleList, searchStr: string, key: string): any {
    if (peopleList.length === 0 || searchStr === '') {
      return peopleList;
    }

    switch (key) {
      case 'first':
        return peopleList.filter((people) => people.firstName.toLowerCase().indexOf(searchStr.toLowerCase()) !== -1);
        break;
      case 'last':
        return peopleList.filter((people) => people.lastName.toLowerCase().indexOf(searchStr.toLowerCase()) !== -1);
        break;
    }
  }

}
