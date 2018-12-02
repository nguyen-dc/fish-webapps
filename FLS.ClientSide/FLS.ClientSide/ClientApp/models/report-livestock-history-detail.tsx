import * as React from "react";

interface IReportLivestockHistoryDetail {
    FarmingSeasonId: number;
    SeasonName: string;
    FarmHistoryId: number;
    ActionDate: Date;
    ActionType: string;
    ProductId: number;
    ProductName: string;
    ProductUnitId: number;
    ProductUnitName: string;
    Weight: number;
    Quantity: number;
    MassAmount: number;
    DeadstockRatio: number;
}

export class ReportLivestockHistoryDetail implements IReportLivestockHistoryDetail {
    FarmingSeasonId: number = 0;
    SeasonName: string = null;
    FarmHistoryId: number = 0;
    ActionDate: Date;
    ActionType: string = null;
    ProductId: number = 0;
    ProductName: string = null;
    ProductUnitId: number = 0;
    ProductUnitName: string = null;
    Weight: number = 0;
    Quantity: number = 0;
    MassAmount: number = 0;
    DeadstockRatio: number = 0;
}
