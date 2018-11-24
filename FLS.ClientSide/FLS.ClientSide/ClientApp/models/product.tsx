import * as React from "react";

interface IProduct {
    id: number;
    name: string;
    productGroupId: number;
    productSubgroupId: number;
    defaultUnitId: number;
    taxPercent: number;
    description: string;
}

export class ProductModel implements IProduct {
    id: number = 0;
    name: string = '';
    productGroupId = 0;
    productSubgroupId = 0;
    defaultUnitId = 0;
    taxPercent;
    description: string = '';
    checked?: boolean = false;
}
export class ProductDetailModel {
    id: number;
    name: string;
    productGroupId: number;
    productGroupName: string;
    productSubgroupId: number;
    productSubgroupName: string;
    defaultUnitId: number;
    defaultUnitName: string;
    taxPercent: number;
    description: string;
    productUnits: ProductUnitProductModel[];
    checked?: boolean;
}
export class ProductUnitProductModel {
    id: number;
    productId: number;
    productName: string;
    productUnitId: number;
    productUnitName: string;
    unitHasScale: boolean;
    defaultUnitValue: number;
    constructor() {
        this.defaultUnitValue = 1;
    }
}