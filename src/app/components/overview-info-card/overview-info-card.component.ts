import {Component, input} from '@angular/core';

@Component({
  selector: 'app-overview-info-card',
  standalone: true,
  imports: [],
  templateUrl: './overview-info-card.component.html',
  styleUrl: './overview-info-card.component.scss'
})
export class OverviewInfoCardComponent {
  date = input.required<string>();
  iconName = input.required<string>();
  highestTemperature = input.required<number>();
  lowestTemperature = input.required<number>();
}
