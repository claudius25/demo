import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IDropdownItem } from './model/dropdown-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  form: FormGroup;
  title = 'suggestion-demo';
  countriesList: IDropdownItem[] = [];

  formCountriesSelected: string[] = [];

  ngOnInit() {
    this.form = new FormGroup({
      countries: new FormControl({
        value: [
          // {
          //   label: 'Albania',
          //   value: 0,
          // },
        ],
      }),
    });

    this.form.controls['countries'].valueChanges.subscribe(
      (value: IDropdownItem[]) => {
        this.formCountriesSelected = value.map((o) => o.label);
      }
    );
    this.countriesList = [
      {
        label: 'Albania',
        value: 0,
      },
      {
        label: 'Rusia',
        value: 1,
      },
      {
        label: 'Romania',
        value: 2,
      },
      {
        label: 'Germany',
        value: 3,
      },
      {
        label: 'Poland',
        value: 4,
      },
      {
        label: 'Hungary',
        value: 5,
      },
      {
        label: 'Bulgaria',
        value: 6,
      },
      {
        label: 'Croatia',
        value: 7,
      },
    ];
  }
}
