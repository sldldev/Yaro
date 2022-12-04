import { EventEmitter, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { OptionButtonsModel } from '../DataModels/tool-bar-buttons.model';


@Injectable({
  providedIn: 'root'
})
export class OptionButtonsService {
  /**
   * This Event Emiter emits ToolBarButtonsModel[] or null
   * ToolBarButtonsModel[] are the buttons to be dislayd in toolbar
   */
  //public onViewUpdatedEventEmiter = new EventEmitter < OptionButtonsModel[] | null | string > ();
  //sidenavClose = new EventEmitter<void>(); // side nav close emiter

  private albumButtons = [
    {
      buttonName: 'My Albums',
      buttonLink : '/albums',
    },
    {
      buttonName: 'Add Album',
      buttonLink: '/album/create',
    },
  ];


  private groupButtons = [
    {
      buttonName: 'My Groups',
      buttonLink : '/groups',
    },
    {
      buttonName: 'Add Group',
      buttonLink: '/group/create',
    },
  ];

  optionsButtons: OptionButtonsModel[] | null  = null;
  //tbButtons$: Observable<ToolBarButtonsModel[]>;
  constructor(private route: ActivatedRoute) { }


  setButtons(buttonSet: OptionButtonsModel[] | null | string) {
    if (typeof buttonSet === 'string') {
      switch (buttonSet) {
        case 'albumButtons':
          this.optionsButtons = this.albumButtons;
          console.log(buttonSet + ' was set');
          console.warn(this.optionsButtons);
          break;
  
        case 'groupButtons':
          this.optionsButtons = this.groupButtons;
          console.log( buttonSet + ' was set');
          console.warn(this.optionsButtons);
          break;
      }
    } else {
      
      this.optionsButtons = buttonSet;
      console.log(buttonSet?'OptionButtonsModel[] object' : 'null' + ' was set was set');
      console.warn(this.optionsButtons);
    }
  }

  getButtons() {
    return this.optionsButtons ? this.optionsButtons.slice() : null;
    /* if (this.toolBarButtons !== null ) {
      return this.toolBarButtons.slice();
    } else { return null; } */
  }
}
