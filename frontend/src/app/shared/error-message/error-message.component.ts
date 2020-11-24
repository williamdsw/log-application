import { Component, OnInit, Input } from '@angular/core';
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

  public get errorMessages() {

    for (const PROPERTY_NAME in this.control.errors) {
      if (this.control.errors.hasOwnProperty (PROPERTY_NAME) && this.control.dirty) {
        return FormValidators.getErrorMessage (PROPERTY_NAME, this.control.errors[PROPERTY_NAME]);
      }
    }

    return null;
  }
}
