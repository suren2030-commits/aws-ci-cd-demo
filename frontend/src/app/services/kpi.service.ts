import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KpiService {

  private baseUrl = '/api';

  constructor(private http: HttpClient) {}

  getKpis(): Observable<any> {
    return this.http.get(`${this.baseUrl}/kpis/`);
  }

  getKpiHistory(): Observable<any> {
    return this.http.get(`${this.baseUrl}/kpis/history/`);
  }
}
