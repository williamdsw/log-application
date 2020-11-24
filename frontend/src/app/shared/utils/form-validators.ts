
export class FormValidators {

    // HELPER FUNCTIONS

    public static getErrorMessage(validatorName: string, validatorValue?: any): any {
        const errors = {
            required: `This field is required!`,
            minlength: `Minimum ${validatorValue.requiredLength} required characters`,
            maxlength: `Maximum ${validatorValue.requiredLength} required characters`
        };

        return errors[validatorName];
    }
}
