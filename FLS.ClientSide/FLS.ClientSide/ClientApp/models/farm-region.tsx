import * as React from "react";

interface IFarmRegion {
    id: number,
    name: string,
}

export class FarmRegionModel implements IFarmRegion {
    id: number = 0;
    name: string = '';
}