import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RestoreModel } from 'src/app/DataModels/restore.model';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-admin-restore',
  templateUrl: './admin-restore.component.html',
  styleUrls: ['./admin-restore.component.scss']
})
export class AdminRestoreComponent implements OnInit {

  public restoreResponce$: Observable<RestoreModel> ;
  private restId:string;
  //public restoreRespon: RestoreModel;
  
  constructor(
    public route: ActivatedRoute,
    private adminService: AdminService,
    // private albumService: AlbumService,
    // private dialog: MatDialog,
    // public sanitizer: DomSanitizer,
    // private optionButtons: OptionButtonsService
  ) {}


  ngOnInit(): void {
    console.log('initing restore');
    this.restoreResponce$ = this.adminService.getRestoreList();
    // this.restoreResponce_.subscribe((response: RestoreModel)=>{
    //   this.restoreRespon = response;
    //   console.dir(this.restoreRespon);
    // });
    
    console.dir(this.restoreResponce$);

  }

  click(obj)
  {
    console.dir(obj);
    this.restId = obj;
  }

  restore(itemTimeId){
    console.log(this.restId);
    this.restoreResponce$ = this.adminService.runRestore(this.restId);
    console.dir(this.restoreResponce$);
  }
}
