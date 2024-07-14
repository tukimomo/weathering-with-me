import {Component, input, output} from '@angular/core';
import {DatePipe, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-simple-forecast-card',
  standalone: true,
  imports: [DatePipe, NgOptimizedImage],
  templateUrl: './simple-forecast-card.component.html',
  styleUrl: './simple-forecast-card.component.scss'
})
export class SimpleForecastCardComponent {
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  date = input.required<string>();
  iconName = input.required<string>();
  highestTemperature = input.required<number>();
  lowestTemperature = input.required<number>();
  index = input.required<number>();
  iconAlt = input<string>("");
  clickEvent = output<number>();
  generateDisplayedDayOfWeek() {
    return this.days[new Date(Date.parse(this.date())).getDay()]
  }

  handleClick() {
    this.clickEvent.emit(this.index())
  }
}
