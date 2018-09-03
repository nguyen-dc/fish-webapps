interface IExpenditureDocketDetail {
    id: number;
    expenditureDocketId: number;
    expenditureTypeId: number;
    productId: number;
    title: string;
    vatPercent: number;
    vat: number;
    amount: number;
    totalAmount: number;
}
export class ExpenditureDocketDetailModel implements IExpenditureDocketDetail {
    id: number = 0;
    expenditureDocketId: number = 0;
    expenditureTypeId: number = 0;
    productId: number = 0;
    title: string = "";
    vatPercent: number = 0;
    vat: number = 0;
    amount: number = 0;
    totalAmount: number = 0;
}