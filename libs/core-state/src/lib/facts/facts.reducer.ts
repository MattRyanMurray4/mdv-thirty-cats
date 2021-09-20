import { Fact } from '@cats/api-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as FactsActions from './facts.actions';

export const FACTS_FEATURE_KEY = 'facts';

export interface FactsAction extends Action {
  error: string;
}

export interface FactsState extends EntityState<Fact> {
  selectedId?: string | number; // which Facts record has been selected
  loaded: boolean; // has the Facts list been loaded
  error?: string | null; // last known error (if any)
}

export interface FactsPartialState {
  readonly [FACTS_FEATURE_KEY]: FactsState;
}

const setLoading = (state: FactsState) => ({
  ...state,
  loaded: false,
  error: null,
});

const setFailure = (state: FactsState, { error }: FactsAction) => ({
  ...state,
  error,
});

export const factsAdapter: EntityAdapter<Fact> = createEntityAdapter<Fact>();

export const initialState: FactsState = factsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const _factsReducer = createReducer(
  initialState,
  on(FactsActions.loadFact, FactsActions.loadFacts, setLoading),
  on(FactsActions.loadFactFailure, FactsActions.loadFactsFailure, setFailure),
  on(FactsActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(FactsActions.loadFactsSuccess, (state, { facts }) =>
    factsAdapter.setAll(facts, { ...state, loaded: true })
  ),
  on(FactsActions.loadFactsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(FactsActions.loadFactSuccess, (state, { fact }) =>
    factsAdapter.upsertOne(fact, { ...state, loaded: true })
  ),
  on(FactsActions.selectFact, (state, { factId }) => ({
    ...state,
    selectedId: factId,
  }))
);

export function factsReducer(state: FactsState | undefined, action: Action) {
  return _factsReducer(state, action);
}
