import * as React from "react";

interface IReportLivestockHistoryDetail {
    FarmingSeasonId: number;
    SeasonName: string;
    FarmHistoryId: number;
    ActionDate: Date | string;
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
    FarmingSeasonId: number;
    SeasonName: string;
    FarmHistoryId: number;
    ActionDate: Date | string;
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
