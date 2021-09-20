import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as FactsActions from './facts.actions';
import { FactsEffects } from './facts.effects';
import { FactsFacade } from './facts.facade';
import { FactsEntity } from './facts.models';
import {
  FACTS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './facts.reducer';
import * as FactsSelectors from './facts.selectors';

interface TestSchema {
  facts: State;
}

describe('FactsFacade', () => {
  let facade: FactsFacade;
  let store: Store<TestSchema>;
  const createFactsEntity = (id: string, name = ''): FactsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(FACTS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([FactsEffects]),
        ],
        providers: [FactsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(FactsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allFacts$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allFacts$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadFactsSuccess` to manually update list
     */
    it('allFacts$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allFacts$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        FactsActions.loadFactsSuccess({
          facts: [createFactsEntity('AAA'), createFactsEntity('BBB')],
        })
      );

      list = await readFirst(facade.allFacts$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
