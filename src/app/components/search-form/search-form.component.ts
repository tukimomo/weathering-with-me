import {Component, output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss'
})
export class SearchFormComponent {
  search = output<string>();
  searchForm = new FormGroup({
    locationName: new FormControl("", [Validators.required]),
  });

  handleSearch(): void {
    if(this.searchForm.valid) {
      this.search.emit(this.searchForm.controls.locationName.value!)
    }
  }
}
