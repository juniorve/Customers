import { Customer } from './../models/customer.model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})

export class CustomerService {
    constructor(
        private apiService: ApiService
    ) { }

    saveCustomer(request): Observable<any> {
        return this.apiService.post(`${this.apiService.customer}/customers.json`, request).pipe(
            map(data => data)
        );
    }

    getCustomers(): Observable<any> {
        return this.apiService.get(`${this.apiService.customer}/customers.json`).pipe(
            map(this.convertDate)
        );
    }

    private convertDate(customers: object) {
        // convertimos el objeto devuelto por firebase a un arreglo
        const customerList: Customer[] = [];
        Object.keys(customers).forEach(key => {
            const customer: Customer = customers[key];
            customer.birthDate = moment(new Date(customer.birthDate)).format('DD/MM/YYYY');
            customer.id = key;
            customerList.push(customers[key]);
        });
        return customerList;
    }

    getCustomerById(customerId): Observable<any> {
        return this.apiService.get(`${this.apiService.customer}/customers/${customerId}.json`).pipe(
            map(data => data)
        );
    }

    deleteCustomerById(customerId): Observable<any> {
        return this.apiService.delete(`${this.apiService.customer}/customers/${customerId}.json`).pipe(
            map(data => data)
        );
    }

}
