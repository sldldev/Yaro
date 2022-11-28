import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpResponse,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthenticationService } from "../Services/auth.service";
import { catchError, finalize, tap } from "rxjs/operators";
import { Observable, throwError } from "rxjs";

@Injectable()
/**
 * Injectable interceptor for intercept the authentication of the user
 * it inits the request with the authentication information of the user for the server
 */
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // it listens to any http request
    const started = Date.now();
    let ok: string;
    const authToken = this.authService.getToken(); // gets the user token
    console.log("this token " + authToken);
    //  {console.log("!!!!!!!!! ----- (parameter) object: HttpResponse<Blob>")}
    //  console.log(typeof req);
    //  console.dir(req);
    const authRequest = req.clone({
      // makes clone of the request and injects the token
      headers: req.headers.set("authorization", "Bearer " + authToken),
    });

    return next.handle(authRequest).pipe(
      tap({
        // Succeeds when there is a response; ignore other events
        next: (event) =>
          (ok = event instanceof HttpResponse ? "succeeded" : ""),
        // Operation failed; error is an HttpErrorResponse
        error: (error) => (
          ok = "failed"
          
          ),
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

  // public off_intercept(
  //   req: HttpRequest<any>,
  //   next: HttpHandler
  // ): Observable<HttpEvent<any>> {
  //   // it listens to any http request
  //   const started = Date.now();
  //   let ok: string;
  //   const authToken = this.authService.getToken(); // gets the user token
  //   console.log("this token " + authToken);
  //   //  {console.log("!!!!!!!!! ----- (parameter) object: HttpResponse<Blob>")}
  //   //  console.log(typeof req);
  //   //  console.dir(req);
  //   const authRequest = req.clone({
  //     // makes clone of the request and injects the token
  //     headers: req.headers.set("authorization", "Bearer " + authToken),
  //   });

  //   return next.handle(req).pipe(

  //     catchError((err) => {
  //       if(err instanceof HttpResponse)
  //       {
  //         ok = err.ok ? "succeeded" : "";
  //       }
  //       // maybe else???
  //       if (
  //         err instanceof HttpErrorResponse &&
  //         err.error instanceof Blob &&
  //         err.error.type === "application/json"
  //       ) {
  //         // https://github.com/angular/angular/issues/19888
  //         // When request of type Blob, the error is also in Blob instead of object of the json data
  //         return new Promise<any>((resolve, reject) => {
  //           let reader = new FileReader();
  //           reader.onload = (e: Event) => {
  //             try {
  //               const errmsg = JSON.parse((<any>e.target).result);
  //               reject(
  //                 new HttpErrorResponse({
  //                   error: errmsg,
  //                   headers: err.headers,
  //                   status: err.status,
  //                   statusText: err.statusText,
  //                   url: err.url || undefined,
  //                 })
  //               );
  //             } catch (e) {
  //               reject(err);
  //             }
  //           };
  //           reader.onerror = (e) => {
  //             reject(err);
  //           };
  //           reader.readAsText(err.error);
  //         });
  //       }
  //       else{
  //         ok = "failed";
  //       }
        
  //      {
  //         const elapsed = Date.now() - started;
  //         const msg = `${req.method} "${req.urlWithParams}"
  //            ${ok} in ${elapsed} ms.`;
  //         console.log(`Intersepter : ${msg}`);
  //       }
  //       //return throwError(err);
  //     })
  //   );
  // }
}
