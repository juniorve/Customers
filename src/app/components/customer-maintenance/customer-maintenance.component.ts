import { Customer } from './../../models/customer.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DialogNewCustomerComponent } from './dialog-new-customer/dialog-new-customer.component';

@Component({
  selector: 'app-customer-maintenance',
  templateUrl: './customer-maintenance.component.html',
  styleUrls: ['./customer-maintenance.component.css']
})
export class CustomerMaintenanceComponent implements OnInit {
  form: FormGroup;
  customerList: Customer[] = [];
  average: string;
  standardDeviation: string;
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) {
    this.form = this.fb.group({
      name: [null],
      lastName: [null]
    });
  }

  ngOnInit() {
  }

  openDialogNewCustomer(event) {
    console.log(event);
    const dialogRef = this.dialog.open(DialogNewCustomerComponent, {
      width: '60%',
      disableClose: true,
      data: {}
    });

    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.findCustomers();
      }
    });
  }

  findCustomers(filters?) {
    this.customerList = [];
    this.customerList = [
      {
        name: 'Carlos',
        lastName: 'Mendoza lopez',
        age: 31,
        birthDate: '24/02/1993'
      },
      {
        name: 'María',
        lastName: 'Silva Mendez',
        age: 30,
        birthDate: '12/01/1994'
      },
      {
        name: 'Ana',
        lastName: 'Del Campo Silva',
        age: 28,
        birthDate: '24/02/1993'
      }
    ];

    if (filters) {
      filters.close();
    }

    this.customersCalculations();
  }

  customersCalculations() {
    const ageList = this.customerList.map(value => value.age);
    this.average = this.calculateAverage(ageList).toFixed(2);
    this.standardDeviation = this.calculateStandardDeviation(ageList).toFixed(2);
  }

  calculateAverage(ageList): number {
    const sum = ageList.reduce((previous, current) => current += previous);
    return (sum / ageList.length);
  }

  calculateStandardDeviation(ageList): number {
    const length = ageList.length;
    const mean = this.calculateAverage(ageList);
    return Math.sqrt(ageList.map(x => Math.pow(x - mean, 2)).reduce((previous, current) => previous + current) / length);
  }

  cleanForm() {
    this.customerList = [];
    this.form.reset();
  }

}
