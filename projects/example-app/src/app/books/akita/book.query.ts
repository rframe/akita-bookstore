import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { BookState, BookStore } from './book.store';
import { Book } from './book.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BookQuery extends QueryEntity<BookState, Book> {

  constructor(protected store: BookStore) {
    super(store);
  }

  selectSearchTerm$ = this.select(state => state.searchTerm);
  selectResultIds$ = this.select(state => state.resultIds);
  selectCollection$ = this.select(state => state.collection);

  isInCollection$ = this.selectCollection$.pipe(map(ids => ids.includes(this.getActiveId())));

  get getSearchTerm() {
    return this.getValue().searchTerm;
  }

  get collection() {
    return this.getValue().collection;
  }

  get nonCollectionBooks() {
    return this.getAll({
                         filterBy: ({ id }) => this.collection.includes(id) === false
                       })
      .map(({ id }) => id);
  }
}
