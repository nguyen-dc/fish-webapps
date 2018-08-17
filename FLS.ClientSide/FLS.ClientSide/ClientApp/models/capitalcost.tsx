import * as React from "react";

interface ICapitalCost {
    id: number;
    productId: number;
    month: Date | string;
    previousCapitalCost: number | null;
    capitalCost: number | null;
}

export class CapitalCostModel implements ICapitalCost {
    id: number;
    productId: number;
    month: Date | string;
    previousCapitalCost: number | null;
    capitalCost: number | null;
}
