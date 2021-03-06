import { Customer } from './../../../models/customer.model';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import * as moment from 'moment';
import { CustomerService } from 'src/app/services/customer.service';
import { BusyService } from 'src/app/services/busy.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-dialog-customer-projection',
  templateUrl: './dialog-customer-projection.component.html',
  styleUrls: ['./dialog-customer-projection.component.css']
})
export class DialogCustomerProjectionComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<void> = new Subject<void>();
  deathDate;
  customer: Customer;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogCustomerProjectionComponent>,
    private customerService: CustomerService,
    public busyService: BusyService
  ) {
  }

  ngOnInit() {
    this.getCustomer();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  getCustomer() {
    this.busyService.busy = this.customerService.getCustomerById(this.data.id)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(response => {
        if (response) {
          this.customer = response;
          /* Según el INEI la esperanza de via de la población peruana es de 74 años por lo tanto la
             proyección de la fecha de fallecimiento del cliente sera sumarle 74 años a su fecha de nacimiento. */
          const birthDate = new Date(this.customer.birthDate);
          this.deathDate = moment(new Date(birthDate.setFullYear(birthDate.getFullYear() + 74))).format('DD/MM/YYYY');
        }
      });
  }

  closeDialog(status?) {
    this.dialogRef.close(status);
  }

}
