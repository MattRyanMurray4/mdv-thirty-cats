import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as FactsActions from './facts.actions';
import * as FactsFeature from './facts.reducer';
import * as FactsSelectors from './facts.selectors';

@Injectable()
export class FactsFacade {
  loaded$ = this.store.pipe(select(FactsSelectors.getFactsLoaded));
  allFacts$ = this.store.pipe(select(FactsSelectors.getAllFacts));
  selectedFacts$ = this.store.pipe(select(FactsSelectors.getSelected));

  constructor(private readonly store: Store) {}

  init() {
    this.store.dispatch(FactsActions.init());
  }

  loadFacts() {
    return this.store.dispatch(FactsActions.loadFacts());
  }

  loadFact(id: string) {
    return this.store.dispatch(FactsActions.loadFact({ id }));
  }

  selectFact(factId: string) {
    return this.store.dispatch(FactsActions.selectFact({ factId }));
  }

  private dispatch(action: Action) {
    return this.store.dispatch(action);
  }
}
