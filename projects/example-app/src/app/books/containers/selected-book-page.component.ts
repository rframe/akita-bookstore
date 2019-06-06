import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Observable } from 'rxjs';

import { AkitaBookService, Book, BookQuery } from '@example-app/books/akita';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'bc-selected-book-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-book-detail
      [book]="book$ | async"
      [inCollection]="isSelectedBookInCollection$ | async"
      (add)="addToCollection($event)"
      (remove)="removeFromCollection($event)">
    </bc-book-detail>
  `,
})
export class SelectedBookPageComponent {
  book$: Observable<Book>;
  isSelectedBookInCollection$: Observable<boolean>;

  constructor(private bookQuery: BookQuery,
              private akitaBookService: AkitaBookService) {

    this.book$ = (this.bookQuery.selectActive<Book>() as Observable<Book | Book[]>)
      .pipe(
        map((book) => book as Book)
      );

    this.isSelectedBookInCollection$ = this.bookQuery.isInCollection$;
  }

  addToCollection({ id }: Book) {
    this.akitaBookService.addToCollection(id)
  }

  removeFromCollection({ id }: Book) {
    this.akitaBookService.removeFromCollection(id)
  }
}
