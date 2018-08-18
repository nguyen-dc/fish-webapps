import * as React from "react";

interface ICurrentInStock {
    id: number;
    warehouseId: number;
    productId: number;
    productUnitId: number;
    amountExpect: number;
    amount: number;
}

export class CurrentInStockModel implements ICurrentInStock {
    id: number;
    warehouseId: number;
    productId: number;
    productUnitId: number;
    amountExpect: number;
    amount: number;
}
