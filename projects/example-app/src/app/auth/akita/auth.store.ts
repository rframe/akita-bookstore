import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { User } from '@example-app/auth/models';

export interface AuthState {
  user: User | null;
}

export function createInitialState(): AuthState {
  return {
    user: null
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'Auth' })
export class AuthStore extends Store<AuthState> {

  constructor() {
    super(createInitialState());
  }

  login(user: User) {
    this.update({ user });
  }

  logout() {
    this.update(createInitialState());
  }
}

