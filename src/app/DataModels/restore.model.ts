/**
 * interface of Backup Responce Model
 */
 export interface RestoreModel {
   restoreResult: string;
   restoreName: string;
   restoreMessage: string;
   restoreList: RestoreItem[];
 }

 export interface RestoreItem{
  restoreItem: string;
 }