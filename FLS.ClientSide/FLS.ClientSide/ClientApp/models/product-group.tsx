import * as React from "react";

interface IProductGroup {
    id: number;
    name: string;
    isSystem: boolean;
    description: string;
}

export class ProductGroupModel implements IProductGroup {
    id: number = 0;
    name: string = '';
    isSystem: boolean = false;
    description: string = '';
}