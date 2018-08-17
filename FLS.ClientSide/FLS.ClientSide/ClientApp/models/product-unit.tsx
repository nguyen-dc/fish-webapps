import * as React from "react";

interface IProductUnit {
    id: number;
    name: string;
    hasScale: boolean;
}

export class ProductUnitModel implements IProductUnit {
    id: number = 0;
    name: string = '';
    hasScale: boolean = false;
}