import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from './modules/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [
  ],
  declarations: [
  ],
  exports: [
    CommonModule,
    MaterialModule
  ],
  entryComponents: [
  ]
})
export class SharedModule { }
