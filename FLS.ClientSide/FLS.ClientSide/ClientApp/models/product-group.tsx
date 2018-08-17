import * as React from "react";

interface IProductGroup {
    id: number;
    name: string;
    description: string;
}

export class ProductGroupModel implements IProductGroup {
    id: number = 0;
    name: string = '';
    description: string = '';
}