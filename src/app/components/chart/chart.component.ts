import { Component, input } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { TimeBasedWeatherForecast } from '../../core/models/time-based-weather-forecast';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent {
  dataOfOneDay = input.required<{[hour: string]: TimeBasedWeatherForecast}>({});
  
  basicData: any;
  basicOptions: any;

  ngOnInit() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
      
      this.basicData = {
          labels: Object.keys(this.dataOfOneDay()).map(date => date.substring(0,2)),
          datasets: [
              {
                  label: 'Rain (%)',
                  data:  Object.values(this.dataOfOneDay()).map(item => item.pop * 100),
                  backgroundColor: ['rgba(255, 159, 64, 0.2)'],
                  fill: true,
              }
          ]
      };

      this.basicOptions = {
          plugins: {
              legend: {
                  labels: {
                      color: textColor
                  }
              }
          },
          scales: {
              y: {
                  beginAtZero: true,
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              },
              x: {
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              }
          }
      };
  }
}
