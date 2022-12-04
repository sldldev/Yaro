import {AuthenticationService} from '../../Services/auth.service';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
} from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
// import { DeleteAlbumDialogComponent } from '../../Dialogs/delete-album-dialog/delete-album-dialog.component';

import { IFilterOption } from 'src/app/DataModels/filter-option.model';
// import { FilterByComponent} from '../filter-by/filter-by.component';
import {GroupModel} from '../../DataModels/group-model';
// import { GroupService } from 'src/app/Services/group.service';
import { OptionButtonsService} from 'src/app/Services/tool-bar-buttons.service';
import { GroupServiceFacade } from 'src/app/Services/groupServiceFacade';


const emptyGroup: GroupModel = {
  creator: '',
  id: null,
  dateCreated: '',
  info: '',
  members: [],
  name: '',
};

const groupButtons = [
  {buttonName: 'My Groups', buttonLink : '/groups', },
  {buttonName: 'Add Group', buttonLink: '/group/create', },
];


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupsComponent implements OnInit {

  groups$: Observable<GroupModel[]> = this.groupServiceFacade.allGroups$;

  // selectedGroup$: Observable<GroupModel> = this.groupServiceFacade.selectedGroup$;
  // groups: Observable<GroupModel[]>; // initing the groups array as Observable

  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;

  public filterStr = '';
  public filterKey = '';




  groupsFilterOptions: IFilterOption[] =
  [
    {value: 'name', label: 'Group Name'},
    {value: 'member', label: 'Group Member'},
    {value: 'date', label: 'Group Date'},
    {value: 'info', label: 'Group Info'},
  ];

  albumsService: any;
   /**
   * constructor inits the class with albumService and router
   * @param {GroupService} albumsService
   * @param {ActivatedRoute} route
   */
  constructor(
    private groupServiceFacade: GroupServiceFacade,
    // public groupsService: GroupService,
    private optionButtonsService: OptionButtonsService,
    public route: ActivatedRoute,
    private dialog: MatDialog, ) {
  }

  ngOnInit(): void {
    this.reset();
  }

  reset() {
    this.optionButtonsService.setButtons(groupButtons);
    this.filterKey = this.groupsFilterOptions[0].value;
    this.loadGroups();
  }



  loadGroups() {
    this.groupServiceFacade.loadGroups();
  }

  updateFilter(filter: any) {
      this.filterStr = filter.filterStr;
      this.filterKey = filter.filterKey;
  }


  onDelete(groupobjId: string, group_Name: string) {
    console.log('OnDelete method invoked');
    console.log('Not Implemented');
  }
/*
  onDelete(groupobjId:string, group_Name:string){
    console.warn("Deleting group group objId: ", group_id, ": Name : ", group_Name );
    this.groupsService.getFilesCount(group_id).subscribe((data)=>{
      console.log("groups found: ",data);
      if (data > 0) {
        // DeleteDialogComponent:
        const dialogRef = this.dialog.open(DeleteAlbumDialogComponent, {
          // we init dialog to ask user if he sure he want to delete
          // and pass the album name to the dialog
          data: {
            message: group_Name + ' Group contains ' + data + ' members.',
          },
        });
        // we subscribe to the result of Dialog close
        dialogRef.afterClosed().subscribe((result) => {
          console.log('the result is:' + result);
          if (!result) {
            return;
          } else {
            this.groupsService.deleteAlbum(group_id);
            return;
          }
        });
      } else {
        this.groupsService.deleteAlbum(group_id);
      }
    });
  } */
}
