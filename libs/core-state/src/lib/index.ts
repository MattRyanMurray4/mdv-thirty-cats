import { ActionReducerMap } from '@ngrx/store';
import {
  factsReducer,
  FactsState,
  FACTS_FEATURE_KEY,
} from './facts/facts.reducer';

export interface AppState {
  [FACTS_FEATURE_KEY]: FactsState;
}

export const reducers: ActionReducerMap<AppState> = {
  [FACTS_FEATURE_KEY]: factsReducer,
};
