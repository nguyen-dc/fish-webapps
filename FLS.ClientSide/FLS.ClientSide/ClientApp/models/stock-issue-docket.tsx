export interface IStockIssueDocket {
    id: number;
    stockIssueDocketTypeId: number;
    warehouseId: number;
    customerId: number | null;
    customerName: string;
    docketNumber: string;
    docketTemplateCode: string;
    issueDate: Date | string | null;
    vat: number;
    amount: number;
    totalAmount: number;
    capitalCost: number | null;
    description: string;
    approverCode: string;
    approvedDate: Date | string | null;
    executorCode: string;
    executedDate: Date | string;
    stockReceiveDocketId: number | null;
}
export class StockIssueDocketModel implements IStockIssueDocket {
    id: number;
    stockIssueDocketTypeId: number;
    warehouseId: number;
    customerId: number | null;
    customerName: string;
    docketNumber: string;
    docketTemplateCode: string;
    issueDate: Date | string | null;
    vat: number;
    amount: number;
    totalAmount: number;
    capitalCost: number | null;
    description: string;
    approverCode: string;
    approvedDate: Date | string | null;
    executorCode: string;
    executedDate: Date;
    stockReceiveDocketId: number | null;
}