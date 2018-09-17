import * as React from "react";
import { _HDateTime } from "../handles/handles";
import * as Moment from 'moment';

interface IStockReceiveDocket {
    actuallyReceivedCode: string;
    executedDate: Date | string;
    executorCode: string;
    approvedDate: Date | string | null;
    approverCode: string;
    isActuallyReceived: boolean | null;
    description: string;
    totalAmount: number;
    amount: number;
    vat: number;
    receiveDate: Date | string | null;
    docketNumber: string;
    warehouseId: number;
    stockReceiveDocketTypeId: number;
    id: number;
    actuallyReceivedDate: Date | string;
    stockIssueDocketId: number | null;
}

export class StockReceiveDocketModel implements IStockReceiveDocket {
    id: number = 0;
    actuallyReceivedCode: string;
    executedDate: Date | string = _HDateTime.DateFormat(Moment().toDate());
    executorCode: string;
    approvedDate: Date | string | null;
    approverCode: string;
    isActuallyReceived: boolean | null;
    description: string;
    totalAmount: number;
    amount: number;
    vat: number;
    receiveDate: Date | string | null;
    docketNumber: string;
    warehouseId: number;
    stockReceiveDocketTypeId: number;
    actuallyReceivedDate: Date | string;
    stockIssueDocketId: number | null;
}