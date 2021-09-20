import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { emptyFact, Fact } from '@cats/api-interfaces';
import { FactsFacade } from '@cats/core-state';
import { empty, Observable } from 'rxjs';

@Component({
  selector: 'cats-facts',
  templateUrl: './facts.component.html',
  styleUrls: ['./facts.component.scss'],
})
export class FactsComponent implements OnInit {
  form: FormGroup;
  facts$: Observable<Fact[]> = this.factsFacade.allFacts$;
  selectedFact$: Observable<Fact> = this.factsFacade.selectedFacts$;
  constructor(
    private factsFacade: FactsFacade,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
    this.factsFacade.loadFacts();
    this.reset();
  }

  selectFact(fact: Fact) {
    this.factsFacade.selectFact(fact.fact);
    this.form.patchValue(fact);
  }

  reset() {
    this.selectFact(emptyFact);
    this.form.reset();
  }

  cancel() {
    this.reset();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      id: null,
      fact: [''],
      dateOfBirth: [''],
      placeOfBirth: [''],
      occupation: [''],
      iq: [''],
      banished: [''],
    });
  }
}
