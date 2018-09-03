interface IExpenditureDocket {
    id: number;
    stockDocketId: number;
    warehouseId: number;
    expendDate: Date | string;
    partnerId: number;
    partnerName: string;
    vat: number;
    amount: number;
    totalAmount: number;
    unpaidAmount: number | null;
    billCode: string;
    billSerial: string;
    billTemplateCode: string;
}
export class ExpenditureDocketModel implements IExpenditureDocket {
    id: number;
    stockDocketId: number;
    warehouseId: number;
    expendDate: Date | string;
    partnerId: number;
    partnerName: string;
    vat: number;
    amount: number;
    totalAmount: number;
    unpaidAmount: number | null;
    billCode: string;
    billSerial: string;
    billTemplateCode: string;
}