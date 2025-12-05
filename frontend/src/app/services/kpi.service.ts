import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KpiService {

  private apiUrl = `http://${window.location.hostname}:8000/api/kpis/`;

  constructor(private http: HttpClient) {}

  getKpis(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
