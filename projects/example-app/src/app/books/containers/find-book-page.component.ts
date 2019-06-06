import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';

import { Book } from '@example-app/books/models';
import { AkitaBookService, BookQuery } from '@example-app/books/akita';

@Component({
  selector: 'bc-find-book-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-book-search
      [query]="searchQuery$ | async"
      [searching]="loading$ | async"
      [error]="error$ | async"
      (search)="search($event)">
    </bc-book-search>
    <bc-book-preview-list
      [books]="books$ | async">
    </bc-book-preview-list>
  `,
})
export class FindBookPageComponent {
  searchQuery$: Observable<string>;
  books$: Observable<Book[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(private bookQuery: BookQuery,
              private akitaBookService: AkitaBookService) {
    this.searchQuery$ = this.bookQuery.selectSearchTerm$;
    this.loading$ = this.bookQuery.selectLoading();
    this.books$ = this.bookQuery.selectResultIds$.pipe(
      switchMap(ids => this.bookQuery.selectMany(ids))
    );
    // this.error$ = store.pipe(select(fromBooks.getSearchError));
  }

  search(query: string) {
    this.akitaBookService.updateSearchTerm(query);
    this.akitaBookService.searchBooks(query);
  }
}
