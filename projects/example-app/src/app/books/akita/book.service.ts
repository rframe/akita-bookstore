import { Injectable } from '@angular/core';
import { BookStore } from './book.store';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BookQuery } from '@example-app/books/akita/book.query';
import { GoogleBooksService } from '@example-app/core/services';
// import { Book } from '@example-app/books/models';
import { ID } from '@datorama/akita';
import { forkJoin } from 'rxjs';
import { Book } from '@example-app/books/akita/book.model';

@Injectable({ providedIn: 'root' })
export class AkitaBookService {

  constructor(private bookStore: BookStore,
              private http: HttpClient,
              private bookQuery: BookQuery,
              private googleService: GoogleBooksService) {
  }

  searchBooks(searchTerm: string) {
    this.bookStore.setLoading(true);
    this.googleService.searchBooks(searchTerm)
      .toPromise()
      .then((books) => {
        const nonCollection = this.bookQuery.nonCollectionBooks;
        this.bookStore.remove([...nonCollection]);
        this.add(books);
        this.bookStore.updateResultsIds(books.map(({ id }) => id));
        this.bookStore.setLoading(false);
      })
  }

  updateSearchTerm(searchTerm: string) {
    this.bookStore.updateSearchTerm(searchTerm);
  }

  setActive(id: ID) {
    this.bookStore.setActive(id);
  }

  add(books: Book[]) {
    this.bookStore.add(books);
  }

  loadBooksToStore() {
    const books$ = this.bookQuery.collection.map(id => this.googleService.retrieveBook(id.toString()));
    forkJoin(books$)
      .toPromise()
      .then((books) => this.add(books));
  }

  updateCollection(bookId: ID) {
    this.bookStore.updateCollection(bookId);
    // removeFromCollection
    // addToCollection
  }

  removeFromCollection(bookId: ID) {

    this.bookStore.removeFromCollection(bookId);
  }

  addToCollection(bookId: ID) {
    this.bookStore.addToCollection(bookId);

  }
}
