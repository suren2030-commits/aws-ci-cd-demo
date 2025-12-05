import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { KpiService } from '../../services/kpi.service';

@Component({
  selector: 'app-performance-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './performance-chart.component.html',
  styleUrls: ['./performance-chart.component.scss']
})
export class PerformanceChartComponent implements OnInit {

  loading = true;
  error = false;

  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: []
  };

  lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      tooltip: { mode: 'index', intersect: false }
    },
    interaction: { mode: 'nearest', intersect: false },
    scales: {
      y: {
        title: { display: true, text: 'On-time %' },
        min: 0,
        max: 100
      },
      y1: {
        position: 'right',
        title: { display: true, text: 'Queue (mins)' },
        grid: { drawOnChartArea: false }
      }
    }
  };

  constructor(private kpiService: KpiService) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  private loadHistory(): void {
    this.kpiService.getKpiHistory().subscribe({
      next: (resp: any) => {
        const points = resp?.points ?? [];

        const labels = points.map((p: any) =>
          new Date(p.timestamp).toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit'
          })
        );

        const onTime = points.map((p: any) => p.on_time_percent);
        const queue = points.map((p: any) => p.security_queue_avg_minutes);

        this.lineChartData = {
          labels,
          datasets: [
            {
              label: 'On-time %',
              data: onTime,
              tension: 0.3,
              fill: true,
              yAxisID: 'y'
            },
            {
              label: 'Security queue (mins)',
              data: queue,
              tension: 0.3,
              yAxisID: 'y1',
              borderDash: [5, 5]
            }
          ]
        };

        this.loading = false;
        this.error = false;
      },
      error: () => {
        this.loading = false;
        this.error = true;
      }
    });
  }
}
