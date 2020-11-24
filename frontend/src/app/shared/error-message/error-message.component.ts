import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FormValidators } from '../utils/form-validators';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html'
})
export class ErrorMessageComponent {

  // FIELDS

  @Input() public control: FormControl;

  // CONSTRUCTOR

  constructor() { }

  // HELPER FUNCTIONS

  public get errorMessages(): any {

    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty (propertyName) && this.control.dirty) {
        return FormValidators.getErrorMessage (propertyName, this.control.errors[propertyName]);
      }
    }

    return null;
  }
}
