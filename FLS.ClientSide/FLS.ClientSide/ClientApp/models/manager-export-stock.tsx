export class ManagerExportStockModel {
    id: number;
    amount: number;
    approvedDate: Date | string;
    approverCode: string;
    capitalCost: number;
    customerId: number;
    customerName: string;
    description: string;
    docketNumber: string;
    docketTemplateCode: string;
    executedDate: Date|string;
    executorCode: string;
    issueDate: Date |string;
    stockIssueDocketTypeId: number;
    stockReceiveDocketId: number;
    totalAmount: number;
    vat: number;
    warehouseId: number;
}

export class ManagerExportSearchModel {
    formDate: Date | string = '';
    toDate: Date | string = '';
    warehouseId: number = 0;
    customerId: number = 0;
    stockIssueDocketTypeId: number = 0;
    status: boolean = false;
}