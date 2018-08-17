import * as React from "react";

interface IExpenditureType {
    id: number,
    name: string,
    isReceipt: boolean,
    description: string
}

export class ExpenditureTypeModel implements IExpenditureType {
    id: number = 0;
    name: string = '';
    isReceipt: boolean;
    description: string;
}