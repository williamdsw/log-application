import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, ValidationErrors } from '@angular/forms';
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

    protected abstract submit(): void;
    protected abstract buildForm(): void;

    // HELPER FUNCTIONS

    public onSubmit(): void {
        this.wasSubmitted = true;

        if (this.form.valid) {
            this.submit ();
        }
        else {
            this.checkValidations (this.form);
        }
    }

    protected checkValidations(currentForm: FormGroup | FormArray): void {
        Object.keys (currentForm.controls).forEach (field => {
            const control = currentForm.get (field);
            control.markAsDirty ();
            control.markAsTouched ();

            if (control instanceof FormGroup || control instanceof FormArray) {
                this.checkValidations (control);
            }
        });
    }

    public checkIsValid(field: string): boolean {
        return this.form.get (field).valid;
    }

    public hasError(field: string): ValidationErrors {
        return this.form.get (field).errors;
    }

    public buildValidationClass(field: string): {} {
        return {
            'is-invalid': this.wasSubmitted && this.hasError (field),
            'is-valid': this.wasSubmitted && this.hasError (field)
        };
    }
}
