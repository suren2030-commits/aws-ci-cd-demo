import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpiService } from './services/kpi.service';
import { PerformanceChartComponent } from './components/performance-chart/performance-chart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PerformanceChartComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private readonly REFRESH_MS = 15000; // 15 seconds
  private refreshHandle: any;

  loading = true;
  error = false;
  kpi: any = null;

  lastRefresh: Date | null = null;
  justUpdated = false;

  constructor(private kpiService: KpiService) {}

  ngOnInit(): void {
    this.loadKpis(false);
    this.refreshHandle = setInterval(() => this.loadKpis(true), this.REFRESH_MS);
  }

  ngOnDestroy(): void {
    if (this.refreshHandle) {
      clearInterval(this.refreshHandle);
    }
  }

  loadKpis(isAuto: boolean): void {
    this.kpiService.getKpis().subscribe({
      next: (data) => {
        this.kpi = data;
        this.loading = false;
        this.error = false;
        this.lastRefresh = new Date();

        // Trigger a short visual pulse when auto-refreshed
        if (isAuto) {
          this.justUpdated = true;
          setTimeout(() => (this.justUpdated = false), 700);
        }
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }
}
