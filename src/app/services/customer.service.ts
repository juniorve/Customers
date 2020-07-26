import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

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
            map(data => data)
        );
    }


}
