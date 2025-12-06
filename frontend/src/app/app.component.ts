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

  statusLevel: 'good' | 'warn' | 'bad' = 'good';
  statusTitle = 'Operations healthy';
  statusMessages: string[] = [];

  lastRefresh: Date | null = null;
  justUpdated = false;

  constructor(private kpiService: KpiService) {}

  ngOnInit(): void {
    // Initial load
    this.loadKpis(false);

    // Auto-refresh
    this.refreshHandle = setInterval(
      () => this.loadKpis(true),
      this.REFRESH_MS
    );
  }

  ngOnDestroy(): void {
    if (this.refreshHandle) {
      clearInterval(this.refreshHandle);
    }
  }

  loadKpis(isAuto: boolean): void {
    if (!isAuto && !this.kpi) {
      this.loading = true;
    }

    this.kpiService.getKpis().subscribe({
      next: (data) => {
        this.kpi = data;
        this.loading = false;
        this.error = false;

        this.evaluateStatus();

        this.lastRefresh = new Date();

        // Small visual pulse when auto-refreshed
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

  private evaluateStatus(): void {
    if (!this.kpi) {
      this.statusLevel = 'good';
      this.statusTitle = 'Awaiting data';
      this.statusMessages = [];
      return;
    }

    const onTime = Number(this.kpi.on_time_percent ?? 0);
    const delayed = Number(this.kpi.delayed_percent ?? 0);
    const queue = Number(this.kpi.security_queue_avg_minutes ?? 0);

    // severity: 0 = good, 1 = warn, 2 = bad
    let severity = 0;
    const msgs: string[] = [];

    const bump = (newSeverity: number) => {
      if (newSeverity > severity) {
        severity = newSeverity;
      }
    };

    // On-time performance
    if (onTime < 80) {
      bump(2);
      msgs.push('On-time performance critical (< 80%)');
    } else if (onTime < 90) {
      bump(1);
      msgs.push('On-time below target (< 90%)');
    }

    // Delayed share
    if (delayed > 25) {
      bump(2);
      msgs.push('High share of delayed flights (> 25%)');
    } else if (delayed > 15) {
      bump(1);
      msgs.push('Delays trending high (> 15%)');
    }

    // Security queue
    if (queue > 25) {
      bump(2);
      msgs.push('Security queues very high (> 25 mins)');
    } else if (queue > 15) {
      bump(1);
      msgs.push('Security queues elevated (> 15 mins)');
    }

    // Map severity to statusLevel
    let level: 'good' | 'warn' | 'bad';
    if (severity >= 2) {
      level = 'bad';
    } else if (severity >= 1) {
      level = 'warn';
    } else {
      level = 'good';
    }
    this.statusLevel = level;

    // Title + messages
    if (severity === 0 && msgs.length === 0) {
      this.statusTitle = 'Operations healthy';
      this.statusMessages = ['Within normal thresholds'];
    } else {
      this.statusTitle =
        severity >= 2
          ? 'Operational risk detected'
          : 'Operational attention needed';
      this.statusMessages = msgs;
    }
  }
}
