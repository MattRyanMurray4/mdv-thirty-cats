import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Fact } from '@cats/api-interfaces';

@Component({
  selector: 'cats-fact-details',
  templateUrl: './fact-details.component.html',
  styleUrls: ['./fact-details.component.scss'],
})
export class FactDetailsComponent {
  currentFact: Fact;
  originalName: string;

  @Input() set fact(value: Fact | null) {
    if (value) this.originalName = value.fact;
    this.currentFact = Object.assign({}, value);
  }

  @Input() form: FormGroup;

  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  save(fact: Fact) {
    this.saved.emit(fact);
  }

  cancel() {
    this.cancelled.emit();
  }

  saveForm(formDirective: FormGroupDirective) {
    if (formDirective.invalid) return;
    this.saved.emit(formDirective.value);
    formDirective.resetForm();
  }
}
