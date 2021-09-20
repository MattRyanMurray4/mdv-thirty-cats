import { FactsEntity } from './facts.models';
import { factsAdapter, FactsPartialState, initialState } from './facts.reducer';
import * as FactsSelectors from './facts.selectors';

describe('Facts Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getFactsId = (it: FactsEntity) => it.id;
  const createFactsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as FactsEntity);

  let state: FactsPartialState;

  beforeEach(() => {
    state = {
      facts: factsAdapter.setAll(
        [
          createFactsEntity('PRODUCT-AAA'),
          createFactsEntity('PRODUCT-BBB'),
          createFactsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Facts Selectors', () => {
    it('getAllFacts() should return the list of Facts', () => {
      const results = FactsSelectors.getAllFacts(state);
      const selId = getFactsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = FactsSelectors.getSelected(state) as FactsEntity;
      const selId = getFactsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getFactsLoaded() should return the current "loaded" status', () => {
      const result = FactsSelectors.getFactsLoaded(state);

      expect(result).toBe(true);
    });

    it('getFactsError() should return the current "error" state', () => {
      const result = FactsSelectors.getFactsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
