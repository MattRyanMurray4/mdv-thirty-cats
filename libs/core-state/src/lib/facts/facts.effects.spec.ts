import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as FactsActions from './facts.actions';
import { FactsEffects } from './facts.effects';

describe('FactsEffects', () => {
  let actions: Observable<Action>;
  let effects: FactsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        FactsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(FactsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: FactsActions.init() });

      const expected = hot('-a-|', {
        a: FactsActions.loadFactsSuccess({ facts: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
