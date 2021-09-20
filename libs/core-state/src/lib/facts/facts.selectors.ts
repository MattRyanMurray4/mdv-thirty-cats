import { emptyFact, Fact } from '@cats/api-interfaces';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FACTS_FEATURE_KEY, FactsState, factsAdapter } from './facts.reducer';

// Lookup the 'Facts' feature state managed by NgRx
export const getFactsState =
  createFeatureSelector<FactsState>(FACTS_FEATURE_KEY);

const { selectAll, selectEntities } = factsAdapter.getSelectors();

export const getFactsLoaded = createSelector(
  getFactsState,
  (state: FactsState) => state.loaded
);

export const getFactsError = createSelector(
  getFactsState,
  (state: FactsState) => state.error
);

export const getAllFacts = createSelector(getFactsState, (state: FactsState) =>
  selectAll(state)
);

export const getFactsEntities = createSelector(
  getFactsState,
  (state: FactsState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getFactsState,
  (state: FactsState) => state.selectedId
);

export const getSelected = createSelector(
  getFactsEntities,
  getSelectedId,
  (entities, selectedId) =>
    (selectedId ? entities[selectedId] : emptyFact) as Fact
);
