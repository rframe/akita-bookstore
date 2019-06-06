import { Injectable } from '@angular/core';
import { arrayAdd, arrayRemove, EntityState, EntityStore, ID, StoreConfig } from '@datorama/akita';
import { Book } from './book.model';

export interface BookState extends EntityState<Book> {
  searchTerm: string;
  resultIds: ID[];
  collection: ID[];
}

export function createInitialState(): BookState {
  return {
    searchTerm: '',
    resultIds: [],
    loading: false,
    collection: [],
  };
}


@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'Book' })
export class BookStore extends EntityStore<BookState, Book> {

  constructor() {
    super(createInitialState());
  }

  updateSearchTerm(searchTerm: string) {
    this.update({ searchTerm });
  }

  updateResultsIds(resultIds: ID[]) {
    this.update({ resultIds })
  }

  updateCollection(id: ID) {
    this.update(state => {
      const add: boolean = !state.collection.includes(id);
      return add ?
             arrayAdd(state.collection, id) :
             arrayRemove(state.collection, id);
    })
  }

  removeFromCollection(id: ID) {
    this.update(state => ({ collection: arrayRemove(state.collection, id) }))
  }

  addToCollection(id: ID) {
    this.update(state => ({ collection: arrayAdd(state.collection, id) }))
  }
}

