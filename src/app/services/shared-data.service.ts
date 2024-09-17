import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private dataSubject = new BehaviorSubject<any>(null);
  data$ = this.dataSubject.asObservable();

  constructor() {

    const storedData = localStorage.getItem('sharedData');
    if (storedData) {
      this.dataSubject.next(JSON.parse(storedData));
    }

  }

  getData(): Observable<any> {
    return this.dataSubject.asObservable();
  }

  sendData(data: any) {
    this.dataSubject.next(data);
    localStorage.setItem('sharedData', JSON.stringify(data));
  }
}
