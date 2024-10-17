import { Component, OnInit } from '@angular/core';
import { ReportingAndAnalyticsService } from '../services/admin/reporting-and-analytics.service';
import { Chart, BarController, BarElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';

@Component({
  selector: 'app-loan-dashboard-chart',
  templateUrl: './loan-dashboard-chart.component.html',
  styleUrls: ['./loan-dashboard-chart.component.css']
})
export class LoanDashboardChartComponent implements OnInit {

  public chart: any;

  constructor(private loanService: ReportingAndAnalyticsService) {}

  ngOnInit() {
    // Register all required components in Chart.js
    Chart.register(BarController, BarElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

    // Fetch data from the service
    this.loanService.getanalysis().subscribe(data => {
      console.log(data);
      
      this.createChart(data);
    });
  }

  createChart(data: any) {
    if (this.chart) {
      // Update the chart's data and labels dynamically
      this.chart.data.datasets[0].data = [
        data.eligibilityCount,
        data.loanSchemeCount,
        data.loanOfficerCount,
        data.analyticsCount,
      ];
  
      // Call chart.update() to re-render the chart with the new data
      this.chart.update();
    } else {
      // Create the chart if it doesn't exist
      this.chart = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: ['Eligibility', 'Loan Schemes', 'Loan Officers', 'Analytics'],
          datasets: [
            {
              label: 'Count',
              data: [
                data.eligibilityCount,
                data.loanSchemeCount,
                data.loanOfficerCount,
                data.analyticsCount,
              ],
              backgroundColor: [
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(255, 99, 132, 0.6)',
              ],
              borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              type: 'category',
            },
            y: {
              beginAtZero: true,
              type: 'linear',
            },
          },
        },
      });
    }
  }
  
}
