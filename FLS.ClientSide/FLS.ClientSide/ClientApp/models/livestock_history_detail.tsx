import * as React from "react";

interface ILivestockHistoryDetail {
    id: number;
    farmingSeasonId: number;
    productId: number;
    productName: string;
    surveyDate: Date | string;
    weight: number;
    quantity: number;
    massAmount: number;
    fcr: number;
    isAuto: boolean;
}

export class LivestockHistoryDetailModel implements ILivestockHistoryDetail {
    id: number;
    farmingSeasonId: number;
    productId: number;
    productName: string;
    surveyDate: Date | string;
    weight: number;
    quantity: number;
    massAmount: number;
    fcr: number;
    isAuto: boolean;
}