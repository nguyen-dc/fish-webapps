import * as React from "react";

interface IProductSubGroup {
    id: number;
    name: string;
    productGroupId: number;
    description: string;
}

export class ProductSubGroupModel implements IProductSubGroup {
    id: number = 0;
    name: string = '';
    productGroupId: number = 0;
    description: string = '';
}