import * as React from "react";

interface IFeedConversionRate {
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

export class FeedConversionRateModel implements IFeedConversionRate {
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