import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import * as moment from 'moment';
@Component({
  selector: 'app-dialog-customer-projection',
  templateUrl: './dialog-customer-projection.component.html',
  styleUrls: ['./dialog-customer-projection.component.css']
})
export class DialogCustomerProjectionComponent implements OnInit {
  deathDate;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogCustomerProjectionComponent>
  ) {
    console.log(this.data);
  }

  ngOnInit() {
    const birthDate = new Date(this.data.birthDate);
    /* Según el INEI la esperanza de via de la población peruana es de 74 años por lo tanto la
        proyección de la fecha de fallecimiento del cliente sera sumarle 74 años a su fecha de nacimiento. */
    this.deathDate = moment(new Date(birthDate.setFullYear(birthDate.getFullYear() + 74))).format('DD/MM/YYYY');
      console.log(this.deathDate);
  }

  closeDialog(status?) {
    this.dialogRef.close(status);
  }

}
