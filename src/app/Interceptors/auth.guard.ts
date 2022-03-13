/*import {Observable} from '../../../node_modules/rxjs/index';*/
import {AuthenticationService} from '../Services/auth.service';
import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';

/**
 * its injectable components AuthGuard that implements CanActive
 * this component responsible make sure components routes guarded
 */
@Injectable()
export class AuthGuard implements CanActivate {
  /**
   * the constructur uses the AuthenticationService and the Router Service
   * @param {AuthenticationService} authService
   * @param {Router} router
   */
  constructor(private authService: AuthenticationService, private router: Router) {
  }

  /**
   * canActivate method checks if user is authenticated before allowing router options
   * @param {ActivatedRouteSnapshot} rout
   * @param {RouterStateSnapshot} state
   * @returns {boolean | Observable<boolean> | Promise<boolean>}
   */

  canActivate(
    rout: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const isAuth = this.authService.getAuthStatus(); // gets authentication status from service
    if (!isAuth) {
      this.router.navigate(['/']); // if not authenticated moves user back to login menu
    }
    return isAuth; // return the status
  }


  /*  canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const isAuth = this.authService.getAuthStatus(); // gets authentication status from service
      if (!isAuth) {
        this.router.navigate(['/']); // if not authenticated moves user back to login menu
      }
      return isAuth; // return the status
    }*/

}
