import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@cats/material';
import { CoreDataModule } from '@cats/core-data';
import { CoreStateModule } from '@cats/core-state';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FactsComponent } from './facts/facts.component';
import { FactsListComponent } from './facts/facts-list/facts-list.component';
import { FactDetailsComponent } from './facts/fact-details/fact-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UiLibraryModule } from '@cats/ui-library';
import { RoutingModule } from './routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FactsComponent,
    FactsListComponent,
    FactDetailsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    CoreDataModule,
    CoreStateModule,
    UiLibraryModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
