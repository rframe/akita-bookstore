import { Component, OnInit } from '@angular/core';
import { Credentials } from '@example-app/auth/models';
import { AkitaAuthService } from '@example-app/auth/akita';
import { of } from 'rxjs';

@Component({
  selector: 'bc-login-page',
  template: `
    <bc-login-form
      (submitted)="onSubmit($event)"
      [pending]="pending$ | async"
      [errorMessage]="error$ | async"
    >
    </bc-login-form>
  `,
  styles: [],
})
export class LoginPageComponent implements OnInit {
  pending$ = of(); // this.store.pipe(select(fromAuth.getLoginPagePending));
  error$ = of(); // this.store.pipe(select(fromAuth.getLoginPageError));

  constructor(private akitaAuthService: AkitaAuthService) {}

  ngOnInit() {}

  onSubmit(credentials: Credentials) {
    this.akitaAuthService.login(credentials);
  }
}
