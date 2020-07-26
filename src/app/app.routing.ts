import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerMaintenanceComponent } from './components/customer-maintenance/customer-maintenance.component';

const routes: Routes = [
  { path: 'mantenimiento-clientes', component: CustomerMaintenanceComponent },
  { path: '', redirectTo: '/mantenimiento-clientes', pathMatch: 'full' }
];

export const appRoutingProviders: any[] = [];
export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);
