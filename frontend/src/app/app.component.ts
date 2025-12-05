import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpiService } from './services/kpi.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  loading = true;
  error = false;
  kpi: any = null;

  constructor(private kpiService: KpiService) {}

  ngOnInit(): void {
    this.loadKpis();
    // refresh every 5 seconds
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
