import {Observable, Subject} from 'rxjs';

export class UIService {
  loadingChanged = new Subject<boolean>(); // init of loadingChanged as new Subject<boolean>

  /**
   * we return loadingChanged asObservable trough
   * getter for security measures we want it to be encapsulated
   * @returns {Observable<boolean>} as data that couldn't not be changed
   */
  getLoadingStatus(): Observable<boolean> {
    return this.loadingChanged.asObservable();
  }

}
