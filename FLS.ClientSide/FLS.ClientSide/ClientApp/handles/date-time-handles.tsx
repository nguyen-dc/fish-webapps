import * as moment from 'moment';

const DATE_FORMAT: string = 'DD-MM-YYYY';
const DATETIME_FORMAT: string = 'DD-MM-YYYY HH:mm';
export const _HDateTime = {
    DateFormat(date: Date): string {
        if (date == undefined || date == null)
            return '';
        return moment(date).format(DATE_FORMAT);
    },
    DateTimeFormat(date: Date): string {
        if (date == undefined || date == null)
            return '';
        return moment(date).format(DATETIME_FORMAT);
    }
}
