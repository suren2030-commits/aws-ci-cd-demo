import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KpiService {

  private baseUrl = `http://${window.location.hostname}:8000/api`;

  constructor(private http: HttpClient) {}

  // Current snapshot
  getKpis(): Observable<any> {
    return this.http.get(`${this.baseUrl}/kpis/`);
  }

  // Time-series history for charts
  getKpiHistory(): Observable<any> {
    return this.http.get(`${this.baseUrl}/kpis/history/`);
  }
}
