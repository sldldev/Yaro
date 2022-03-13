import {HttpInterceptor, HttpRequest, HttpHandler} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthenticationService} from '../Services/auth.service';


@Injectable()
/**
 * Injectable interceptor for intercept the authentication of the user
 * it inits the request with the authentication information of the user for the server
 */
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) { // it listens to any http request
    const authToken = this.authService.getToken(); // gets the user token
    console.log('this ' + authToken);
    const authRequest = req.clone({ // makes clone of the request and injects the token
      headers: req.headers.set('authorization', 'Bearer ' + authToken)
    });
    return next.handle(authRequest); // continue with the request
  }

}
