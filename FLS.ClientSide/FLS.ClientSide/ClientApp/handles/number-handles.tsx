
const NumberFormat = new Intl.NumberFormat('vi-VN');
const CurrencyFormat = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
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
        return CurrencyFormat.format(number);
    },
    FormatNumber(input: any): string {
        let number = Number(input);
        if (Number.isNaN(number))
            return 'NaN';
        return NumberFormat.format(number);
    },
    Sum(...values): number {
        return Number(values.reduce((p, n) => Number(p) + Number(n)));
    }
}