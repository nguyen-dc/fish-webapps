import * as React from "react";

interface IStockReceiveDocket {
    Id: number;
    StockIssueDocketTypeId: number;
    WarehouseId: number;
    CustomerId?: number;
    CustomerName: string;
    DocketNumber: string;
    IssueDate?: Date;
    Vat: number;
    Amount: number;
    TotalAmount: number;
    CapitalCost?: number;
    Description: number;
    ApproverCode: string;
    ApprovedDate: Date;
    ExecutorCode: string;
    ExecutedDate: Date;
    StockReceiveDocketId?: number;
}

export class StockReceiveDocketModel implements IStockReceiveDocket {
    Id = 0;
    StockIssueDocketTypeId = 0;
    WarehouseId = 0;
    CustomerId? = 0;
    CustomerName = '';
    DocketNumber = '';
    IssueDate?: Date;
    Vat = 0;
    Amount = 0;
    TotalAmount = 0;
    CapitalCost? = 0;
    Description = 0;
    ApproverCode = '';
    ApprovedDate: Date;
    ExecutorCode = '';
    ExecutedDate: Date;
    StockReceiveDocketId? = 0;
}