import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserInterface } from '../interface/userinterface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { UserNotf } from '../interface/user-notf';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userApiUrl = 'https://widyajobtest.000webhostapp.com';

  constructor(private http: HttpClient) { }

  //not a good idea, mostly useless except sysadmin
  // getAllUser(){
  //   return this.http.get<UserInterface>(this.userApiUrl).pipe(
  //     retry(3), // retry a failed request up to 3 times
  //     catchError(this.handleError) // then handle the error
  //   );
  // }

  //for login
  checkUser(user: UserInterface): Observable<UserNotf> {
    return this.http.post<UserNotf>(this.userApiUrl+'/login', user).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError)// check the error
    );
  }

  //for register
  addUser(user: UserInterface): Observable<UserNotf> {
    return this.http.post<UserNotf>(this.userApiUrl+'/user', user).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError)// check the error
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
