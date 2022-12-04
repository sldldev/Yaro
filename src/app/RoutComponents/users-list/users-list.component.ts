import { Component, OnInit , Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Users } from 'src/app/DataModels/users.model';
// import { GroupServiceFacade } from 'src/app/Services/groupServiceFacade';
// import { AGroupComponent } from '../a-group/a-group.component';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {

  @Input() listOfUsers: Users[];
  listOfUsersSuns: Subscription;


  @Output() selectedUsersEvent = new EventEmitter<Users>();

  previewUsers: Users[] = [];
  selectedUsers: Users[];

  // groupMembers$ = this.aGroupComponent.groupMembers$;

  constructor() { }


  ngOnDestroy(): void {
    // this.listOfUsersSuns.unsubscribe();
  }


  ngOnInit() {
    this.selectedUsers = [];
    // this.listOfUsersSuns = this.listOfUsers.subscribe();
    // console.dir(this.listOfUsers.subscribe());
    // this.groupMembers$.subscribe(users => this.previewUsers = users);

  }


  onUserSelect(user) {
    console.warn('UsersListComponent.onUserSelect:');
    this.selectedUsersEvent.emit(user);
  }

}

/*.


  getgroupMembers(){
    console.warn("AGroupComponent.getgroupMembers invoking");
    this.usersService.getUsers();
    this.allUsers = this.usersService.getUsersUpdateListener();
    this.allUsers.subscribe(allUsers => {

        console.warn("%%%%%%%%%% allUsersbefore Users %%%%%%%%%%");
        console.dir(allUsers);
        console.dir(this.groupObj.members);

        this.groupMembers = allUsers.filter(user => this.selectedGroup$.members.includes(user.objId) );

        this.notInGroupUsers = allUsers;

        console.dir(this.notInGroupUsers);
        //this.groupMembers;
      });
  }

*/
