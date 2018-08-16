import * as React from "react";

interface IProduct {
    id: number;
    name: string;
    productGroupId: number;
    productSubgroupId: number;
    defaultUnitId: number;
    taxPercentId: number;
    description: string;
}

export class ProductModel implements IProduct {
    id: number = 0;
    name: string = '';
    productGroupId = 0;
    productSubgroupId = 0;
    defaultUnitId = 0;
    taxPercentId = 0;
    description: string = '';
}