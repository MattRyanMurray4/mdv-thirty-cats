import { Action } from '@ngrx/store';

import * as FactsActions from './facts.actions';
import { FactsEntity } from './facts.models';
import { State, initialState, reducer } from './facts.reducer';

describe('Facts Reducer', () => {
  const createFactsEntity = (id: string, name = ''): FactsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Facts actions', () => {
    it('loadFactsSuccess should return the list of known Facts', () => {
      const facts = [
        createFactsEntity('PRODUCT-AAA'),
        createFactsEntity('PRODUCT-zzz'),
      ];
      const action = FactsActions.loadFactsSuccess({ facts });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
