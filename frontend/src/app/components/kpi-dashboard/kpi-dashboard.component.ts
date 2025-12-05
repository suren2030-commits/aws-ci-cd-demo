import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpiService } from '../../services/kpi.service';

@Component({
  selector: 'app-kpi-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kpi-dashboard.component.html',
  styleUrls: ['./kpi-dashboard.component.scss']
})
export class KpiDashboardComponent implements OnInit {

  loading = true;
  error = false;
  kpi: any = null;

  constructor(private kpiService: KpiService) {}

  ngOnInit(): void {
    this.loadKpis();
    setInterval(() => this.loadKpis(), 5000);
  }

  loadKpis() {
    this.kpiService.getKpis().subscribe({
      next: (data) => {
        this.kpi = data;
        this.loading = false;
        this.error = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }
}
