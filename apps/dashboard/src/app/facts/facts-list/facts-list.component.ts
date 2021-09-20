import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Fact } from '@cats/api-interfaces';

@Component({
  selector: 'cats-facts-list',
  templateUrl: './facts-list.component.html',
  styleUrls: ['./facts-list.component.scss'],
})
export class FactsListComponent {
  @Input() facts: Fact[] | null;
  @Input() readonly = false;
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();
}
