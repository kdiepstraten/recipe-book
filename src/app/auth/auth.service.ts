import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, throwError} from "rxjs";
import {UserModel} from "./user.model";
import {Router} from "@angular/router";

export interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string
  registered?: boolean
}

@Injectable({providedIn: 'root'})
export class AuthService {
  // @ts-ignore
  user = new BehaviorSubject<UserModel>(null);
  tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router) {
  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>
    ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCg4dqsYcvUkSNIX5kIyOynHNYtMj0zDjA', {
      email: email,
      password: password,
      returnSecureToken: true
    })
      .pipe(catchError(this.handleError), tap(resData => {
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn);
      }));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>
    ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCg4dqsYcvUkSNIX5kIyOynHNYtMj0zDjA', {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(resData => {
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn)
      }
    ))
  }

  autoLogin() {

    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;   // @ts-ignore
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new UserModel(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate));

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration)
    }
  };

  logout() {
    // @ts-ignore
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
   this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number) {
    const expirationDate = new Date(
      new Date().getTime() + expiresIn * 1000);
    const user = new UserModel(
      email,
      userId,
      token,
      expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!'
    console.log('Error Response:', errorRes);

    if (!errorRes.error || !errorRes.error.error) {
      console.log('Error properties missing:', errorRes.error);
      return throwError(errorMessage)
    }
// Check if the error message is nested under 'message'
    if (errorRes.error.error.message) {
      errorMessage = errorRes.error.error.message;
    } else {
      // Fallback to a generic message if no specific message found
      errorMessage = 'An error occurred.';
    }

    console.log('Final Error Message:', errorMessage);


    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'Not valid credentials';
        break;
      case 'TO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'Try again later';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct';
        break;

    }
    return throwError(errorMessage);
  }

}
