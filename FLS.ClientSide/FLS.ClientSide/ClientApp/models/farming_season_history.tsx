import * as React from "react";
interface IFarmingSeasonHistory {
    id: number;
    warehouseId: number;
    productId: number;
    productUnitId: number;
    amountExpect: number;
    amount: number;
}

export class FarmingSeasonHistoryModel implements IFarmingSeasonHistory {
    id: number;
    warehouseId: number;
    productId: number;
    productUnitId: number;
    amountExpect: number;
    amount: number;
}