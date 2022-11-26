import {HttpInterceptor, HttpRequest, HttpHandler, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthenticationService} from '../Services/auth.service';
import { finalize, tap } from 'rxjs/operators';

@Injectable()
/**
 * Injectable interceptor for intercept the authentication of the user
 * it inits the request with the authentication information of the user for the server
 */
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) { // it listens to any http request
    const started = Date.now();
    let ok: string;
    const authToken = this.authService.getToken(); // gets the user token
    console.log('this token ' + authToken);
     //  {console.log("!!!!!!!!! ----- (parameter) object: HttpResponse<Blob>")}
    //  console.log(typeof req);
    //  console.dir(req);
    const authRequest = req.clone({ // makes clone of the request and injects the token
      headers: req.headers.set('authorization', 'Bearer ' + authToken)
    });
    return next.handle(authRequest).pipe(
      tap({
        // Succeeds when there is a response; ignore other events
        next: (event) => (ok = event instanceof HttpResponse ? 'succeeded' : ''),
        // Operation failed; error is an HttpErrorResponse
        error: (error) => (ok = 'failed')
      }),
      // Log when response observable either completes or errors
      finalize(() => {
        const elapsed = Date.now() - started;
        const msg = `${req.method} "${req.urlWithParams}"
           ${ok} in ${elapsed} ms.`;
        console.log(`Intersepter : ${msg}`);
      })
    ); // continue with the request
  }

}
