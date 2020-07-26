import swal from 'sweetalert';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CustomerService } from 'src/app/services/customer.service';
import { BusyService } from 'src/app/services/busy.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dialog-remove-customer',
  templateUrl: './dialog-remove-customer.component.html',
  styleUrls: ['./dialog-remove-customer.component.css']
})
export class DialogRemoveCustomerComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<void> = new Subject<void>();
  deathDate;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogRemoveCustomerComponent>,
    private customerService: CustomerService,
    private busyService: BusyService
  ) {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  removeCustomer() {
    this.busyService.busy = this.customerService.deleteCustomerById(this.data.id)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(response => {
        console.log(response);
        swal('Cliente eliminado', 'El cliente fue eliminado exitosamente', 'success').then(value=>{
          this.closeDialog(true);
        });
      });
  }

  closeDialog(status?) {
    this.dialogRef.close(status);
  }

}
