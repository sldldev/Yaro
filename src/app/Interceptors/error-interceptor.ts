import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse
} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ErrorComponent} from '../Dialogs/error/error.component';
import {UIService} from '../Services/ui.service';


@Injectable()
/**
 * error interceptor , checks any request of http to find error message and display it
 */
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private dialog: MatDialog, private snackbar: MatSnackBar, private uiService: UIService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) { // listens to any http request

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred!'; // init the error message
        console.log(error);
        if (error.error && error.status !== 0) {
          errorMessage = error.error; // sets new error messagen
        } else {
          errorMessage = 'Oops Something Went Wrong!';
        }
        if (errorMessage === 'DUP') {
          return;
        }
        this.uiService.loadingChanged.next(false); // stops the loading banner
        this.snackbar.open(errorMessage, null, {duration: 3000}); // display snack bar error
        this.dialog.open(ErrorComponent, {data: {message: errorMessage}}); // display dialog error
        console.log(error);
        return throwError(error); // returns back to process
      })
    );
  }

}
