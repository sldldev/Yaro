import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { BackupModel } from '../DataModels/backup.model';
import { RestoreModel } from '../DataModels/restore.model';
import { host } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, public router: Router) {
  }


  runBackup(){
    console.log('Sending request');
    // this.http.get<{ message: string, albums: any }>(host + '/api/album/getAlbums')
    return this.http.get<BackupModel>(host + '/api/admin/backup')
    .pipe(map(responce => {
      console.log(responce);
      return {
        bacupResult: responce.bacupResult,
        bacupName: responce.bacupName,
        backupMessage: responce.backupMessage,
      };
    }));
  }

  
  getRestoreList(){
    console.log('Getting Restors list');
    return this.http.get<RestoreModel>(host + '/api/admin/get_restores')
    .pipe(map(responce => {
      console.log(responce);
      return {
        restoreResult: responce.restoreResult,
        restoreName: responce.restoreName,
        restoreList: responce.restoreList,
        restoreMessage: responce.restoreMessage,
      };
    }));
  }

  runRestore(itemId: string){
    console.log(itemId);
    const restoreId = { restoreId: itemId };
    return this.http.post<RestoreModel>(host + '/api/admin/runrestore', restoreId)
    .pipe(map(responce => {
      console.log(responce);
      return {
        restoreResult: responce.restoreResult,
        restoreName: responce.restoreName,
        restoreList: responce.restoreList,
        restoreMessage: responce.restoreMessage,
      };
    }));

    // .pipe(map(responce =>{
    //   console.log(responce);
    //   return {
    //     restoreResult: responce.restoreResult,
    //     restoreName: responce.restoreName,
    //     restoreList: responce.restoreList,
    //     restoreMessage: responce.restoreMessage,
    //   };
    // }));
  }
}
