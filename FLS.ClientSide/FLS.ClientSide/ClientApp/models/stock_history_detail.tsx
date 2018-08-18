import * as React from "react";

interface IStockHistoryDetail {
    id: number;
    historyId: number;
    productId: number;
    productName: string;
    productUnitId: number;
    amount: number;
}

export class StockHistoryDetailModel implements IStockHistoryDetail {
    id: number;
    historyId: number;
    productId: number;
    productName: string;
    productUnitId: number;
    amount: number;
}