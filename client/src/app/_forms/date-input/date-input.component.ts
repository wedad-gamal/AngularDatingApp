import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Component, Input, OnInit, Self } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styles: [
  ]
})
export class DateInputComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() maxDate: Date;
  bsConfig: Partial<BsDatepickerConfig>;// every single property inside this type is going to be optional, we don't have to provide all the different configuration option, without partial we will have to provide every single possible configuration option.
  //dependency injected locally, so it doesn't try get this ngControl from somewhare else in dependecny injection
  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
    this.bsConfig = {
      containerClass: 'theme-red',
      dateInputFormat: 'DD MMMM YYYY'
    }
   }
  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }

}
