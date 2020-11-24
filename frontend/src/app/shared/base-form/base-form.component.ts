import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AlertModalService } from 'src/app/services/alert-modal.service';

@Component({
    selector: 'app-base-form',
    template: '<div></div>'
})
export abstract class BaseFormComponent<T> {

    // FIELDS

    public form: FormGroup;
    public wasSubmitted = false;
    protected subscription: Subscription;
    public model: T;

    // CONSTRUCTOR

    constructor(
        protected formBuilder: FormBuilder,
        protected router: Router,
        protected alertModalService: AlertModalService
    ) {
        this.subscription = new Subscription();
    }

    // ABSTRACT FUNCTIONS

    protected abstract submit();
    protected abstract buildForm();

    // HELPER FUNCTIONS

    public onSubmit() {
        this.wasSubmitted = true;

        if (this.form.valid) {
            this.submit ();
        }
        else {
            this.checkValidations (this.form);
        }
    }

    protected checkValidations(currentForm: FormGroup | FormArray) {
        Object.keys (currentForm.controls).forEach (field => {
            const CONTROL = currentForm.get (field);
            CONTROL.markAsDirty ();
            CONTROL.markAsTouched ();

            if (CONTROL instanceof FormGroup || CONTROL instanceof FormArray) {
                this.checkValidations (CONTROL);
            }
        });
    }

    public checkIsValid(field: string) {
        const FIELD = this.form.get (field);
        return FIELD.valid;
    }

    public hasError(field: string) {
        return this.form.get (field).errors;
    }

    public buildValidationClass(field: string) {
        return {
            'is-invalid': this.wasSubmitted && this.hasError (field),
            'is-valid': this.wasSubmitted && this.hasError (field)
        };
    }
}
