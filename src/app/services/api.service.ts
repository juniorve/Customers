import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { environment } from 'src/environments/environment';
const swal: SweetAlert = _swal as any;

@Injectable()
export class ApiService {
  customer = `${environment.apiCustomer}`;
  constructor(
    private http: HttpClient
  ) {
  }

  public formatErrors(error: HttpErrorResponse) {
    const messageError = error.error ? error.error : error;
    swal('Error', messageError, 'error');
    return throwError(messageError);
  }

  get(path: string, params?: any): Observable<any> {
    return this.http.get(path, { params }).pipe(
      catchError(error => {
        return this.formatErrors(error);
      })
    );
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(path, JSON.stringify(body)).pipe(
      catchError(error => {
        return this.formatErrors(error);
      })
    );
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(path, JSON.stringify(body)).pipe(
      catchError(error => {
        return this.formatErrors(error);
      })
    );
  }

  delete(path: string): Observable<any> {
    return this.http.delete(path).pipe(
      catchError(error => {
        return this.formatErrors(error);
      })
    );
  }
}
