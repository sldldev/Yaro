import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlbumModel } from 'src/app/DataModels/album.model';
//import { AlbumService } from 'src/app/Services/album.service';

import { OptionButtonsService } from 'src/app/Services/tool-bar-buttons.service';
import { GroupModel } from 'src/app/DataModels/group-model';
import { GroupServiceFacade } from 'src/app/Services/groupServiceFacade';


@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss'],

})
export class AddGroupComponent implements OnInit {

  groupInformation = ''; // hold the information about the group for the template
  private mode = 'create'; // init the mode at startup as create new group
  private groupId: string; // we know that the type if groupId will be string
  groupEdit: any; //AlbumModel; // information about the edited album in case in edit mode



  constructor(
    private groupServiceFacade: GroupServiceFacade,

   // public albumsService: AlbumService,
    public route: ActivatedRoute,
    private toolBarButtonsService: OptionButtonsService,
    ) { }

  /**
   * initialization on init.
   * if groupId parameter is passed by the router paramMap we are in edit group name
   * else this mode is create
   */
   ngOnInit() {
    this.toolBarButtonsService.setButtons('groupButtons');

    this.groupId = this.route.snapshot.paramMap.get('groupId'); // first of all we check if param was passed as argument via Map
    console.log('the group we edit' + this.groupId);
    if (this.groupId != null) { // in case we have param that means we trying to edit existing group
      this.mode = 'edit'; // mode is changed to 'edit'
      // then we subscribe to the getgroup service that recieves the groupData from the server in init groupEdit
      // this.groupService.getAllGroupsById(this.groupId).subscribe(
      //   groupData => this.groupEdit = groupData);
    } else { // else we in mode of creating new group
      this.mode = 'create';
    }
  }

  /**
   * method for saving the album into the MongoDb
   * @param {NgForm} form
   */
   onSaveGroup(form: NgForm) {
    if (form.invalid) { // in case form is invalid we return
      return;
    }
    if (this.mode === 'create') { // if we are creating new album
      const group: GroupModel = {
        id: null,
        name: form.value.groupName,
        info: form.value.info,  // Group description,
        dateCreated: '',
        creator: '',
        members: [],
      };
      this.groupServiceFacade.saveGroups(group); // we pass the album to the album service module method add album

    } else { // in case its album that exist on mongoDB and we want to edit it
      // we use the update service module and pass the parameters
      console.log('groupId' + this.groupId);
      const g: GroupModel = {
        creator:'',
        id: this.groupId,
        name: form.value.groupName,
        info: form.value.info,
        dateCreated: this.groupEdit.Date,
        members: []
      };
      this.groupServiceFacade.saveGroups(g);
    }
    form.resetForm(); // we reset the form.
  }
}

