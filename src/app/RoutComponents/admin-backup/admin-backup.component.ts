import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BackupModel } from 'src/app/DataModels/backup.model';
import { AdminService } from 'src/app/Services/admin.service';


@Component({
  selector: 'app-admin-backup',
  templateUrl: './admin-backup.component.html',
  styleUrls: ['./admin-backup.component.scss']
})
export class AdminBackupComponent implements OnInit {

  active = 1;
  public backupResponce:Observable<BackupModel> ;
  public backupRespon:BackupModel;
  
  constructor(
    public route: ActivatedRoute,
    private filesService: AdminService,
    // private albumService: AlbumService,
    // private dialog: MatDialog,
    // public sanitizer: DomSanitizer,
    // private optionButtons: OptionButtonsService
  ) {}


  ngOnInit(): void {
  }

  runBackup(){
    console.log('Button pressed');
    this.backupResponce = this.filesService.runBackup();
    this.backupResponce.subscribe((result)=>{
      this.backupRespon = result;
    } )

  }
  ngOnDestroy(){
    //this.backupResponce.unsubscribe();
  }
}
