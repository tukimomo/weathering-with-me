import {Component, input} from '@angular/core';
import {DatePipe, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-overview-info-card',
  standalone: true,
  imports: [DatePipe, NgOptimizedImage],
  templateUrl: './overview-info-card.component.html',
  styleUrl: './overview-info-card.component.scss'
})
export class OverviewInfoCardComponent {
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  date = input.required<string>();
  iconName = input.required<string>();
  highestTemperature = input.required<number>();
  lowestTemperature = input.required<number>();
  getDayOfWeek() {
    return this.days[new Date(Date.parse(this.date())).getDay()]
  }
}
