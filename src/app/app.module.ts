import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './shared/modules/material.module';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBusyModule } from 'ng-busy';
import { MAT_DATE_LOCALE } from '@angular/material';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { HttpTokenInterceptor } from './interceptors/http-token.interceptor';
import { CustomerMaintenanceComponent } from './components/customer-maintenance/customer-maintenance.component';
import { appRoutingProviders, routingModule } from './app.routing';
import { ModuleHeaderComponent } from './components/customer-maintenance/module-header/module-header.component';
import { DialogNewCustomerComponent } from './components/customer-maintenance/dialog-new-customer/dialog-new-customer.component';
import { CustomerListComponent } from './components/customer-maintenance/customer-list/customer-list.component';
@NgModule({
  declarations: [
    AppComponent,
    CustomerMaintenanceComponent,
    ModuleHeaderComponent,
    DialogNewCustomerComponent,
    CustomerListComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    SharedModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    routingModule,
    OverlayModule,
    ReactiveFormsModule,
    NgBusyModule,
  ],
  entryComponents: [
    DialogNewCustomerComponent
  ],
  providers: [appRoutingProviders,
    ApiService,
    { provide: MAT_DATE_LOCALE, useValue: 'es-Es' },
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
