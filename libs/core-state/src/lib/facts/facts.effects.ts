import { Injectable } from '@angular/core';
import { FactsService } from '@cats/core-data';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import {
  loadFact,
  loadFactFailure,
  loadFacts,
  loadFactsFailure,
  loadFactsSuccess,
  loadFactSuccess,
} from './facts.actions';

@Injectable()
export class FactsEffects {
  loadFacts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFacts),
      switchMap(() =>
        this.factsService.all().pipe(
          map((facts) => loadFactsSuccess({ facts })),
          tap(console.log),
          catchError((error) => of(loadFactsFailure({ error })))
        )
      )
    )
  );

  loadFact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFact),
      switchMap(({ id }) =>
        this.factsService.find(id).pipe(
          map((fact) => loadFactSuccess({ fact })),
          catchError((error) => of(loadFactFailure({ error })))
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private factsService: FactsService
  ) {}
}
