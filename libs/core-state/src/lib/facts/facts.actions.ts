import { Fact } from '@cats/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const init = createAction('[Facts Page] Init');

// ALL

export const loadFacts = createAction('[Facts] Load All Facts');

export const loadFactsSuccess = createAction(
  '[Facts] Load Facts Success',
  props<{ facts: Fact[] }>()
);

export const loadFactsFailure = createAction(
  '[Facts] Load Facts Failure',
  props<{ error: any }>()
);

// SINGULAR

export const loadFact = createAction(
  '[Fact] Load A Fact',
  props<{ id: string }>()
);
export const loadFactSuccess = createAction(
  '[Fact] Load A Fact Success',
  props<{ fact: Fact }>()
);
export const loadFactFailure = createAction(
  '[Fact] Load A Fact Failure',
  props<{ error: any }>()
);

// SELECT

export const selectFact = createAction(
  '[Fact] Selected A Fact',
  props<{ factId: string }>()
);
