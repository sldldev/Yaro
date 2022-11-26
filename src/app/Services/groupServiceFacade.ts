import { Injectable } from '@angular/core';
import { GroupModel } from '../DataModels/group-model';
import { GroupService } from './group.service';
import { Subject } from 'rxjs';
import { FollowService } from './follow.service';
import {Users} from '../DataModels/users.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GroupServiceFacade {

    private allGroups = new Subject<GroupModel[]>();
    private selectedGroup = new Subject<GroupModel>();
    private mutations = new Subject();
    private groupUsersReady = new Subject<Users[]>();

    allGroups$ = this.allGroups.asObservable();
    selectedGroup$ = this.selectedGroup.asObservable();
    mutations$ = this.mutations.asObservable();
    groupUsersReady$ = this.groupUsersReady.asObservable();


  constructor(
    private groupService: GroupService,
    public router: Router,
    private usersService: FollowService) {}
  /**
   *
   * @returns
   */
  async loadGroups() {
    console.log('GroupServiceFacade.loadGroups:  invoked');
    return await this.groupService
        .all()
        .subscribe(async (groups: GroupModel[]) => this.allGroups.next(groups));
  }

  getGroup(groupId: string) {
    console.log('GroupServiceFacade.getGroup : invoked');
    this.groupService
    .find(groupId)
    .subscribe((group: GroupModel) => this.selectedGroup.next(group));
  }

  saveGroups(group: GroupModel) {
    console.log('GroupServiceFacade.saveGroups:  invoked');
    if (group.id) {
      return this.updateGroup(group);
    } else {
      return this.createGroup(group);
    }
  }
  createGroup(group: GroupModel) {
    console.log('GroupServiceFacade.createGroup:  invoked');
    this.groupService.create(group)
    .subscribe((retGroup: GroupModel) => {
      this.selectedGroup.next(retGroup);
      this.router.navigate(['/groups']); // and navigate back to album page
    });
  }

  updateGroup(group: GroupModel) {
    console.log('GroupServiceFacade.updateGroup:  invoked');
    return this.groupService.update(group)
    .subscribe((retGroup: GroupModel) => {
      this.selectedGroup.next(retGroup);
      //this.router.navigate(['/groups']); // and navigate back to album page
    });
  }

  deleteGroup(group: GroupModel) {
    console.log('GroupServiceFacade.deleteGroup:  invoked');
    return this.groupService.delete(group);
  }

  selectGroup(group){
    console.log('GroupServiceFacade.selectGroup : invoked');
    this.selectedGroup.next(group);
  }

  setUsersGroupRedy(u: Users[]){
    console.log('GroupServiceFacade.setUsersGroupRedy invoked: ');
    console.dir(u);
    this.groupUsersReady.next(u);
  }

}
