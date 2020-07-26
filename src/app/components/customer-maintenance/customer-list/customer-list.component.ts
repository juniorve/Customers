import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../../../models/customer.model';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  @Input() customerList: Customer[] = [];
  displayedColumns: string[] = ['name', 'lastName', 'age', 'birthDate', 'actions'];
  dataSource: Customer[];
  constructor() {
    console.log(this.customerList);
  }

  ngOnInit() {
    this.dataSource = this.customerList;
  }

}
