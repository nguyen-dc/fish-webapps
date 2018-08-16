import * as Moment from 'moment';
const DATE_FORMAT: string = 'DD-MM-YYYY';
const DATETIME_FORMAT: string = 'DD-MM-YYYY HH:mm';
export const DateTimeHandle = {
    DateFormat(date: Date): string {
        if (date == undefined || date == null)
            return '';
        return Moment(date).format(DATE_FORMAT);
    },
    DateTimeFormat(date: Date): string {
        if (date == undefined || date == null)
            return '';
        return Moment(date).format(DATETIME_FORMAT);
    }
}