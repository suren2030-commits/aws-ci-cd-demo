import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KpiService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    const hostname = window.location.hostname;

    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      // Local dev -> talk directly to Django on localhost
      this.baseUrl = 'http://localhost:8000/api';
    } else {
      // Production -> always talk to backend via ALB
      this.baseUrl = 'http://airport-alb-1437043109.ap-south-1.elb.amazonaws.com/api';
      // ^ use your exact ALB DNS name here (no / at the end)
    }
  }

  // Current snapshot
  getKpis(): Observable<any> {
    return this.http.get(`${this.baseUrl}/kpis/`);
  }

  // Time-series history for charts
  getKpiHistory(): Observable<any> {
    return this.http.get(`${this.baseUrl}/kpis/history/`);
  }
}
