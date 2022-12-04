/*import {Observable} from '../../../node_modules/rxjs/index';*/
import {AuthenticationService} from '../Services/auth.service';
import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';

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
  constructor(
    private authService: AuthenticationService,
    private router: Router) {/* Default Empty */ }

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
      this.router.navigate(['/register/login']); // if not authenticated moves user back to login menu
    }
    return isAuth; // return the status
  }
}
