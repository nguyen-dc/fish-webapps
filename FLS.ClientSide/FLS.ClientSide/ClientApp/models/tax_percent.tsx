import * as React from "react";

interface ITaxPercent {
    id: number;
    name: string;
    value: number;
}

export class TaxPercentModel implements ITaxPercent {
    id: number;
    name: string;
    value: number;
}