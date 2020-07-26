import { DialogCustomerProjectionComponent } from './dialog-customer-projection/dialog-customer-projection.component';
import { Customer } from './../../models/customer.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DialogNewCustomerComponent } from './dialog-new-customer/dialog-new-customer.component';
import { CustomerService } from 'src/app/services/customer.service';
import { BusyService } from 'src/app/services/busy.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-customer-maintenance',
  templateUrl: './customer-maintenance.component.html',
  styleUrls: ['./customer-maintenance.component.css']
})
export class CustomerMaintenanceComponent implements OnInit, OnDestroy {
  form: FormGroup;
  customerList: Customer[] = [];
  average: string;
  standardDeviation: string;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private customerService: CustomerService,
    private busyService: BusyService
  ) {
    this.form = this.fb.group({
      name: [null],
      lastName: [null]
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  openDialogNewCustomer() {
    const dialogRef = this.dialog.open(DialogNewCustomerComponent, {
      width: '50%',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.findCustomers();
      }
    });
  }

  findCustomers(filters?) {
    this.customerList = [];

    this.busyService.busy = this.customerService.getCustomers()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(response => {
        if (response.length && response.length > 0) {
          this.customerList = response;
          if (filters) {
            filters.close();
          }
          this.customersCalculations();
        }
      });
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

  actionIcon(event) {
    if (event) {
      this.dialog.open(DialogCustomerProjectionComponent, {
        data: event,
        width: '50%',
        disableClose: true
      });
    }
  }

}
