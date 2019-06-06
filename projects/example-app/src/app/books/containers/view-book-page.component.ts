import { Component, OnDestroy, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ID } from '@datorama/akita';
import { AkitaBookService } from '@example-app/books/akita';

/**
 * Note: Container components are also reusable. Whether or not
 * a component is a presentation component or a container
 * component is an implementation detail.
 *
 * The View Book Page's responsibility is to map router params
 * to a 'Select' book action. Actually showing the selected
 * book remains a responsibility of the
 * SelectedBookPageComponent
 */
@Component({
  selector: 'bc-view-book-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-selected-book-page></bc-selected-book-page>
  `,
})
export class ViewBookPageComponent implements OnInit, OnDestroy {
  // actionsSubscription: Subscription;

  constructor(private akitaBookService: AkitaBookService, private route: ActivatedRoute) {
    // this.actionsSubscription = route.params
    //   .pipe(map(params => ViewBookPageActions.selectBook({ id: params.id })))
    //   .subscribe(action => store.dispatch(action));

  }

  ngOnInit(): void {
    const activeBookId = this.route.snapshot.paramMap.get('id');
    this.akitaBookService.setActive(activeBookId as ID);
  }

  ngOnDestroy() {
    // this.actionsSubscription.unsubscribe();
  }
}
