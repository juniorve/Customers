import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Customer } from '../../../models/customer.model';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  @Input() customerList: Customer[] = [];
  @Output() actionIcon = new EventEmitter<object>();
  displayedColumns: string[] = ['name', 'lastName', 'age', 'birthDate', 'actions'];
  dataSource: Customer[];
  constructor() {
  }

  ngOnInit() {
    this.dataSource = this.customerList;
  }

  showCustomer(element, action) {
    this.actionIcon.emit({
      data: element,
      action
    });
  }

}
