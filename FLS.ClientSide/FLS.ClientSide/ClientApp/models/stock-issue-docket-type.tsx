import * as React from "react";

interface IStockIssueDocketType {
    id: number,
    name: string,
    receiptNeeded: boolean ,
    receiptTypeId: number ,
    approvalNeeded: boolean ,
    pickingPrice: number ,
    isSystem: boolean,
    description: string ,
}

export class StockIssueDocketTypeModel implements IStockIssueDocketType {
    id: number = 0;
    name: string = '';
    receiptNeeded: boolean = false;
    receiptTypeId: number = 0;
    approvalNeeded: boolean = false;
    pickingPrice: number = 0;
    isSystem: boolean = false;
    description: string = '';
}