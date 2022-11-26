import { Pipe, PipeTransform } from '@angular/core';
import {GroupModel} from '../DataModels/group-model';


@Pipe({
    name: 'groupPipe'
  })

  export class GroupPipe implements PipeTransform {
    transform(groupList: GroupModel[], searchStr: string, key: string): any {
      if (groupList.length === 0 || searchStr.length === 0) {
        console.warn('pipe empty', );
        return groupList;
      }
      console.warn('pipe Exepted STR', searchStr);
      console.warn('pipe Exepted Key', key);
      console.warn(groupList);
      switch (key) {
        case 'name':
          console.warn(groupList.filter((group) => group.name.toLowerCase().indexOf(searchStr.toLowerCase()) !== -1));
          return groupList.filter((group: { name: string; }) => group.name.toLowerCase().indexOf(searchStr.toLowerCase()) !== -1);
          break;
        case 'date':
          return groupList.filter((group: { dateCreated: string; }) => group.dateCreated.toLowerCase().indexOf(searchStr.toLowerCase()) !== -1);
          break;
        case 'info':

          return groupList.filter((group: { info: string|null; }) => group.info == null? false : group.info.toLowerCase().indexOf(searchStr.toLowerCase()) !== -1);
          break;
          case 'info':
            return groupList.filter((group: { members: string[]; }) =>
                group.members.filter((Member) => Member.toLowerCase().indexOf(searchStr.toLowerCase()) !== -1));
            break;
      }
    }
  }
