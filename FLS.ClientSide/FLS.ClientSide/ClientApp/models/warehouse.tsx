import * as React from "react";

interface IWarehouse {
    id: number,
    name: string,
    defaultWarehouseId?: number,
    warehouseTypeId?: number,
    warehouseTypeName: string
}

export class WarehouseModel implements IWarehouse {
    id: number = 0;
    name: string;
    defaultWarehouseId?: number;
    warehouseTypeId?: number;
    warehouseTypeName: string;
    farmRegionId?: number;
}