import { customerValidation } from './new-customer-validations';
import { BusyService } from './../../../services/busy.service';
import { CustomerService } from './../../../services/customer.service';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import swal from 'sweetalert';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dialog-new-customer',
  templateUrl: './dialog-new-customer.component.html',
  styleUrls: ['./dialog-new-customer.component.css']
})
export class DialogNewCustomerComponent implements OnInit, OnDestroy {
  form: FormGroup;
  messagesValidations: any = {};
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogNewCustomerComponent>,
    private fb: FormBuilder,
    private customerService: CustomerService,
    public busyService: BusyService
  ) {
    this.form = this.fb.group({
      name: [null, Validators.required],
      lastName: [null, Validators.required],
      age: [null, Validators.required],
      birthDate: [null, Validators.required]
    });
    this.form.controls.birthDate.disable();
  }

  ngOnInit() {
    this.messagesValidations = customerValidation;
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
  newCustomer() {
    this.busyService.busy = this.customerService.saveCustomer(this.form.getRawValue())
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(response => {
        if (response) {
          swal('Cliente registrado', 'Datos guardados correctamente', 'success').then(() => {
            this.closeDialog(true);
          });
        } else {
          swal('Error', 'Cliente no registrado, reintente por favor', 'info');
        }
      });
  }

  closeDialog(success?) {
    this.dialogRef.close(success);
  }
}
