import { Injectable } from '@angular/core';
import { LayoutStore } from './layout.store';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AkitaLayoutService {

  constructor(private layoutStore: LayoutStore,
              private http: HttpClient) {
  }

  setSideNavState(status: boolean) {
    this.layoutStore.updateSideNavState(status);
  }
}
