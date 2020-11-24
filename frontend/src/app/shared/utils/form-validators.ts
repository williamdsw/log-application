
export class FormValidators {

    // HELPER FUNCTIONS

    public static getErrorMessage(validatorName: string, validatorValue?: any) {
        const ERRORS = {
            required: `This field is required!`,
            minlength: `Minimum ${validatorValue.requiredLength} required characters`,
            maxlength: `Maximum ${validatorValue.requiredLength} required characters`
        };

        return ERRORS[validatorName];
    }
}
