import * as React from "react";

interface IWarehouseType {
    id: number,
    name: string,
    isSystem: boolean
}

export class WarehouseTypeModel implements IWarehouseType {
    id: number = 0;
    name: string = '';
    isSystem: boolean;
}