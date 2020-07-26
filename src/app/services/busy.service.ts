import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  public busy: Subscription;
  constructor() { }

}
