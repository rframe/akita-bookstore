import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AkitaAuthService, AuthQuery } from '@example-app/auth/akita';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authQuery: AuthQuery, private akitaAuthService: AkitaAuthService) {}

  canActivate(): Observable<boolean> {
    return this.authQuery.isLoggedIn$
      .pipe(
        tap(authed => {
          if (!authed) {
            return this.akitaAuthService.loginRedirect();
          }
        }),
        take(1)
      );
  }
}
