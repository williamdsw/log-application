
export class LogUtils {

    // HELPER FUNCTIONS

    public static validateStartAndEndDates(startDateTime: any, endDateTime: any): boolean {

        if (startDateTime.length !== 19 || endDateTime.length !== 19) {
            return false;
        }
        else {
            const invalidDate = 'Invalid Date';
            startDateTime = new Date(startDateTime);
            endDateTime = new Date(endDateTime);

            if (startDateTime.toString() === invalidDate || endDateTime.toString() === invalidDate) {
                return false;
            }

            return true;
        }
    }

    public static checkValidIpAddress(ipAddress: string): boolean {
        if (ipAddress.length < 7 || ipAddress.length > 17) {
            return false;
        }

        const values = ipAddress.split('.');
        if (values.length !== 4) {
            return false;
        }

        if (values[3] === '') {
            return false;
        }

        // tslint:disable-next-line: prefer-for-of
        for (let index = 0; index < values.length; index++) {
            const value: number = parseInt(values[index], 10);

            if (value < 0 || value > 255) {
                return false;
            }
        }

        return true;
    }
}
