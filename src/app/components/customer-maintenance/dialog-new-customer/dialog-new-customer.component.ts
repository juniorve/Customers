import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-new-customer',
  templateUrl: './dialog-new-customer.component.html',
  styleUrls: ['./dialog-new-customer.component.css']
})
export class DialogNewCustomerComponent implements OnInit {

  form: FormGroup;
  messagesValidations: any = {};
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogNewCustomerComponent>,
    private fb: FormBuilder,
  ) {
    console.log(data);
    this.form = this.fb.group({
      name: [null, Validators.required],
      lastName: [null, Validators.required],
      age: [null, Validators.required],
      birthDate: [null, Validators.required]
    });
  }

  ngOnInit() { }

  newCustomer() {
    this.closeDialog(true);
  }

  closeDialog(success?) {
    this.dialogRef.close(success);
  }
}
