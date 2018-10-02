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
    id: number = 0;
    stockReceiveDocketId: number = 0;
    productId: number = 0;
    quantity: number = 0;
    productUnitId: number;
    unitPrice: number = 0;
    vatPercent: number = 0;
    vat: number = 0;
    amount: number = 0;
    totalAmount: number = 0;
    //----
    productName: string;
}
