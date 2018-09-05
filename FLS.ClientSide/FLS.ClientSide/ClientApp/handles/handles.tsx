import * as Moment from 'moment';

export const ArrayHandle = {
    ConcatAndDeDuplicate(key, ...arrs) {
        return [].concat(...arrs).reduce((a, b) => !a.filter(c => b[key] === c[key]).length ? [...a, b] : a, []);
    }
}

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

export const ObjectHandle = {
    Clone(source: any) {
        let target = Object.assign({}, source);
        return target;
    }
}

export const StringHandle = {
    IsNullOrEmpty(input: string) {
        if (input == undefined || input == null)
            return true;
        input = input.trim();
        return input.length == 0;
    }
}

const NumberFormat = new Intl.NumberFormat('vi-VN');
const CurrencyFormat = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
export const NumberHandle = {
    FormatCurrency(input: number): string {
        if (Number.isNaN(input))
            return 'NaN';
        return CurrencyFormat.format(input);
    },
    FormatNumber(input: number): string {
        if (Number.isNaN(input))
            return 'NaN';
        return NumberFormat.format(input);
    }
}