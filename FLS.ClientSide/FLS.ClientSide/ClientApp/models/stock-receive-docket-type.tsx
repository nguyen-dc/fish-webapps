import * as React from "react";

interface IStockReceiveDocketType {
    id: number,
    name: string,
    payslipNeeded: boolean,
    payslipTypeId: number,
    approvalNeeded: boolean,
    isSystem: boolean,
    description: string,
}

export class StockReceiveDocketTypeModel implements IStockReceiveDocketType {
    id: number = 0;
    name: string = '';
    payslipNeeded: boolean;
    payslipTypeId: number;
    approvalNeeded: boolean;
    isSystem: boolean;
    description: string;
}