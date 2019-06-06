import { Injectable } from '@angular/core';
import { AuthStore } from './auth.store';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { Credentials, User } from '@example-app/auth/models';
import { LogoutConfirmationDialogComponent } from '@example-app/auth/components';
import { MatDialog } from '@angular/material';

@Injectable({ providedIn: 'root' })
export class AkitaAuthService {

  constructor(private authStore: AuthStore,
              private http: HttpClient,
              private router: Router,
              private dialog: MatDialog) {
  }

  login(creds: Credentials): void {
    this.callServer(creds)
      .pipe(
        tap(user => {
          this.authStore.login(user);
          this.router.navigate([ '/' ])
        }),
        catchError(error => {
          console.log('there was an error');
          return of(error)
        })
      )
      .toPromise()
  }

  callServer({ username, password }: Credentials): Observable<User> {
    if (username !== 'test' && username !== 'ngrx') {
      return throwError('Invalid username or password');
    }

    return of({ name: 'User' });
  }

  logout(): void {
    this.authStore.logout();
    this.loginRedirect();
  }

  logoutConfirmation(): void {
    const dialogRef = this.dialog.open<LogoutConfirmationDialogComponent,
      undefined,
      boolean>(LogoutConfirmationDialogComponent);

    dialogRef.afterClosed()
      .pipe(
        tap((result) => {
          if (result) {
            this.logout();
          }
        })
      )
      .toPromise();
  }

  logoutIdleUser(): void {
    this.logout();
  }

  loginRedirect(): void {
    this.router.navigate([ '/login' ]);
  }
}
