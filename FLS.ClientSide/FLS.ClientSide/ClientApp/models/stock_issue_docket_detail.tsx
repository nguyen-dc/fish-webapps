import * as React from "react";

interface IStockIssueDocketDetail {
    id: number;
    stockIssueDocketId: number;
    productId: number;
    quantity: number;
    productUnitId: number;
    unitPrice: number;
    vatPercent: number;
    vat: number;
    amount: number;
    totalAmount: number;
    capitalCost: number | null;
}

export class StockIssueDocketDetailModel implements IStockIssueDocketDetail {
    id: number;
    stockIssueDocketId: number;
    productId: number;
    quantity: number;
    productUnitId: number;
    unitPrice: number;
    vatPercent: number;
    vat: number;
    amount: number;
    totalAmount: number;
    capitalCost: number | null;
    //----
    productName: string;
    productUnitName: string;
}