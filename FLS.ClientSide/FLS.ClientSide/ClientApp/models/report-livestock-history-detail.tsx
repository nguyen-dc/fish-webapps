import * as React from "react";

interface IReportLivestockHistoryDetail {
    actionTypeId: number; //int
    seasonName: string;
    farmHistoryId: number; //int
    actionDate: Date | string;
    actionType: string;
    productId: number; //int
    productName: string;
    productUnitId: number; //int
    productUnitName: string;
    weight: number; //decimal
    quantity: number;//decimal
    massAmount: number;//decimal
    deadstockRatio: number;//decimal
    qtyFood: number;//decimal
    qtyMedicine: number;//decimal
    medicineName: string;
}

export class ReportLivestockHistoryDetail implements IReportLivestockHistoryDetail {
    actionTypeId: number;
    seasonName: string;
    farmHistoryId: number;
    actionDate: Date;
    actionType: string;
    productId: number;
    productName: string;
    productUnitId: number;
    productUnitName: string;
    weight: number;
    quantity: number;
    massAmount: number;
    deadstockRatio: number;
    qtyFood: number;
    qtyMedicine: number;
    medicineName: string;
}
