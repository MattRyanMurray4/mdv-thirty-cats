import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootStoreConfig, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FactsEffects } from './facts/facts.effects';
import { FactsFacade } from './facts/facts.facade';
import { reducers } from '.';

const storeConfig: RootStoreConfig<any> = {
  runtimeChecks: {
    strictActionImmutability: true,
    strictStateImmutability: true,
  },
};

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers, storeConfig),
    EffectsModule.forRoot([FactsEffects]),
    StoreDevtoolsModule.instrument({ name: 'CAT-APP' }),
  ],
  providers: [FactsFacade],
})
export class CoreStateModule {}
