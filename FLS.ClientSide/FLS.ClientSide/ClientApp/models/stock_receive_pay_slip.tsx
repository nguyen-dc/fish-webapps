import * as React from "react";

export interface IStockReceivePaySlip {
    id: number;
    stockReceiveDocketId: number;
    stockReceivePayslipTypeId: number;
    warehouseId: number;
    payslipDate: Date | string;
    supplierBranchId: number;
    supplierBranchFullName: string;
    supplierBranchPhone: string;
    totalAmount: number | null;
    unpaidAmount: number | null;
    billCode: string;
    billSerial: string;
    billTemplateCode: string;
}

export class StockReceivePaySlipModel implements IStockReceivePaySlip {
    id: number;
    stockReceiveDocketId: number;
    stockReceivePayslipTypeId: number;
    warehouseId: number;
    payslipDate: Date | string;
    supplierBranchId: number;
    supplierBranchFullName: string;
    supplierBranchPhone: string;
    totalAmount: number | null;
    unpaidAmount: number | null;
    billCode: string;
    billSerial: string;
    billTemplateCode: string;
}