
const NumberFormat = new Intl.NumberFormat('en-EN', {
    maximumFractionDigits: 3,
});
const IntegerFormat = new Intl.NumberFormat('en-EN', {
    maximumFractionDigits: 0
});
const DecimalFormat = new Intl.NumberFormat('en-EN', {
    maximumFractionDigits: 3,
    minimumFractionDigits: 3
});
const CurrencyFormat = new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'VND' });
export const _HNumber = {
    IsNumber(input: any): boolean {
        let number = Number(input);
        if (Number.isNaN(number))
            return false;
        return true;
    },
    FormatCurrency(input: any): string {
        let number = Number(input);
        if (Number.isNaN(number))
            return 'NaN';
        return NumberFormat.format(number) + ' ₫';
    },
    FormatNumber(input: any): string {
        let number = Number(input);
        if (Number.isNaN(number))
            return 'NaN';
        return NumberFormat.format(number);
    },
    FormatInteger(input: any): string {
        let number = Number(input);
        if (Number.isNaN(number))
            return 'NaN';
        return IntegerFormat.format(number);
    },
    FormatDecimal(input: any): string {
        let number = Number(input);
        if (Number.isNaN(number))
            return 'NaN';
        return DecimalFormat.format(number);
    },
    Sum(...values): number {
        return Number(values.reduce((p, n) => Number(p) + Number(n)));
    }
}