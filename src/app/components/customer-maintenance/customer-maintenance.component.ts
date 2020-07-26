import { DialogRemoveCustomerComponent } from './dialog-remove-customer/dialog-remove-customer.component';
import { DialogCustomerProjectionComponent } from './dialog-customer-projection/dialog-customer-projection.component';
import { Customer } from './../../models/customer.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
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
  customerList: Customer[] = [];
  average: string;
  standardDeviation: string;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(
    private dialog: MatDialog,
    private customerService: CustomerService,
    private busyService: BusyService
  ) {
  }

  ngOnInit() {
    this.findCustomers();
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

  actionIcon(event) {
    console.log(event);
    switch (event.action) {
      case 'showCustomer':
        this.opendDialogShowCustomer(event.data);
        break;
      case 'removeCustomer':
        this.openDialogRemoveCustomer(event.data);
        break;
    }
    if (event) {

    }
  }

  opendDialogShowCustomer(customer: Customer) {
    this.dialog.open(DialogCustomerProjectionComponent, {
      data: customer,
      width: '40%',
      disableClose: true
    });
  }

  openDialogRemoveCustomer(customer: Customer) {
    const dialogRef = this.dialog.open(DialogRemoveCustomerComponent, {
      data: customer,
      width: '40%',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.findCustomers();
      }
    });
  }
}
