import * as React from "react";

interface IFarmingSeason {
    id: number;
    name: string;
    fishPondId: number;
    startFarmDate: Date;
    finishFarmDateExpected: Date;
    finishFarmDate?: Date;
    isFinished: boolean;
}

export class FarmingSeasonModel implements IFarmingSeason {
    id: number;
    name: string;
    fishPondId: number;
    startFarmDate: Date;
    finishFarmDateExpected: Date;
    finishFarmDate?: Date;
    isFinished: boolean;
}