import * as React from "react";

interface IStockReceiveDocketDetail {
    id: number;
    stockReceiveDocketId: number;
    productId: number;
    quantity: number;
    productUnitId: number;
    unitPrice: number;
    vatPercent: number;
    vat: number;
    amount: number;
    totalAmount: number;
}

export class StockReceiveDocketDetailModel implements IStockReceiveDocketDetail {
    id: number;
    stockReceiveDocketId: number;
    productId: number;
    quantity: number;
    productUnitId: number;
    unitPrice: number;
    vatPercent: number;
    vat: number;
    amount: number;
    totalAmount: number;
    //----
    productName: string;
}
