import { Component, OnInit, OnChanges, OnDestroy } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Observable, Subject, Subscription } from "rxjs";
import { GroupModel } from "src/app/DataModels/group-model";
import { OptionButtonsModel } from "src/app/DataModels/tool-bar-buttons.model";
import { Users } from "src/app/DataModels/users.model";
import { FollowService } from "src/app/Services/follow.service";
import { GroupService } from "src/app/Services/group.service";
import { GroupServiceFacade } from "src/app/Services/groupServiceFacade";
import { OptionButtonsService } from "src/app/Services/tool-bar-buttons.service";

const emptyGroup: GroupModel = {
  creator: "",
  dateCreated: "",
  info: "",
  members: [],
  name: "",
  id: null,
};

@Component({
  selector: "app-a-group",
  templateUrl: "./a-group.component.html",
  styleUrls: ["./a-group.component.scss"],
})
export class AGroupComponent implements OnInit, OnDestroy {
  groupButtons: OptionButtonsModel[] = [
    { buttonName: "My Groups", buttonLink: "/groups" },
    { buttonName: "Add Group", buttonLink: "/group/create" },
  ];

  edit = false;
  selectedGroup$: Observable<GroupModel> =
    this.groupServiceFacade.selectedGroup$;

  selectedGroupSubscription: Subscription;
  allUsersSubscription: Subscription;
  groupId: string;
  // groupMemberUsers?: Users[] = [];
  allUsers: Observable<Users[]>;

  usersFilterOptions = {};

  // groupObs: Observable<GroupModel> =  this.groupService.getGroupByIdListener();

  groupObj: GroupModel | null;

  private groupMembers = new Subject<Users[]>();
  groupMembers$ = this.groupMembers.asObservable();
  memU: Users[] | null = null;

  private notInGroupUsers = new Subject<Users[]>();
  notInGroupUsers$ = this.notInGroupUsers.asObservable();
  nMemU: Users[] | null = null;

  members: Users[] = [];

  constructor(
    private groupServiceFacade: GroupServiceFacade,
    public route: ActivatedRoute,
    public router: Router,
    private groupService: GroupService,
    private usersService: FollowService,
    private optionButtonsService: OptionButtonsService
  ) {}
  ngOnDestroy(): void {
    console.warn("ngOnDestroy");

    this.selectedGroupSubscription.unsubscribe();
    this.allUsersSubscription.unsubscribe();
  }

  ngOnInit() {
    console.warn("selectedGroup");
    this.groupId = this.route.snapshot.paramMap.get("id");

    this.optionButtonsService.setButtons(this.groupButtons);

    this.getGroup(this.groupId);
    this.allUsers = this.usersService.getUsersUpdateListener();

    this.getgroupMembers();
  }

  // resetForm() {
  //   this.selectGroup(emptyGroup);
  // }

  // selectGroup(group: GroupModel) {
  //   this.groupServiceFacade.selectGroup(group);
  // }

  getGroup(groupId: string) {
    this.groupServiceFacade.getGroup(groupId);
  }

  getgroupMembers() {
    console.warn("AGroupComponent.getgroupMembers invoking");
    this.usersService.getUsers();

    this.selectedGroupSubscription = this.selectedGroup$.subscribe((group) => {
      // console.warn('this.selectedGroup$.subscribe invoked');
      this.allUsersSubscription = this.allUsers.subscribe((allUsers) => {
        this.memU = allUsers.filter((user: Users) => {
          return group.members.includes(user.id);
        });
        // console.warn('mem');
        // console.dir(mem);
        // this.groupMembers.next(mem);

        this.nMemU = allUsers.filter((user: Users) => {
          return !group.members.includes(user.id);
        });

        // console.warn('rest');
        // console.dir(rest);
        // this.notInGroupUsers.next(rest);
      });
    });
  }

  updateFilter(event: any) {}

  onUserSelected(selectedUser: Users) {
    console.log("onUserSelected Event received");
    this.memU.push(selectedUser);
    this.nMemU.forEach((value, index) => {
      if (value === selectedUser) {
        this.nMemU.splice(index, 1);
      }
    });
  }

  onRemoveUserSelected(selectedUser: Users) {
    console.log("onRemoveUserSelected Event received");
    this.nMemU.push(selectedUser);
    this.memU.forEach((value, index) => {
      if (value === selectedUser) {
        this.memU.splice(index, 1);
      }
    });
  }

  saveMembers(groupToUpdate: GroupModel) {
    const members: string[] = [];

    console.warn('saveMembers invoked:');
    console.dir(this.memU);
    this.memU.forEach((member) => {
      console.warn('members before:');
      console.dir(members);
      members.push(member.id);
      console.warn('members after:');
      console.dir(members);
    });

      console.warn('members out:');
      console.dir(members);
    const group: GroupModel = {
      id: groupToUpdate.id,
      name: groupToUpdate.name,
      info: groupToUpdate.info,
      dateCreated: groupToUpdate.dateCreated,
      members: members,
      creator: groupToUpdate.creator,
    };
    
    this.groupServiceFacade.saveGroups(group);
    this.edit = false;
    //this.router.navigate(['/group', this.groupId]); // navigate to album page
  }

  /*  save2(){
     // in case its album that exist on mongoDB and we want to edit it
      // we use the update service module and pass the parameters
      console.log('groupId' + this.groupId);
      const g: GroupModel = {
        creator:'',
        objId: this.groupId,
        name: form.value.groupName,
        info: form.value.info,
        dateCreated: this.groupEdit.Date,
        members: []
      };
      this.groupServiceFacade.saveGroups(g);
  } */

  allowEdit() {
    this.edit = true;
  }

  uList() {
    return this.groupMembers$;
  }
}
