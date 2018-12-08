export class ReportLivestockHistoryDetailRequest {
    farmingSeasonId: number;
    fromDate: Date;
    toDate: Date;
}
export class ReportLivestockHistoryDetail{
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
export class ReportFarmingSeasonHistoryStockRequest {
    farmingSeasonId: number;
    productGroupId: number;
    productSubgroupId: number;
    productId: number;

}
export class ReportFarmingSeasonHistoryStock {
    farmingSeasonId: number;
    fishPondId: number;
    startFarmDate: Date;
    finishFarmDate: Date;
    productGroupId: number;
    productSubgroupId: number;
    productId: number;
    productName: string;
    productUnitId: number;
    productUnitName: string;
    amount: number;
    capitalCost: number;
}
export class ReportFarmingSeasonRequest {
    farmRegionId: number;
    fishPondId: number;
    fromDate: Date;
    toDate: Date;
}
export class ReportFarmingSeason {
    fishPondId: number;
    fishPondName: string;
    A: number;
    B: number;
    C: number;
    D: number;
    waterSurfaceArea: number;
    depth: number;
    farmingSeasonId: number;
    actionDate: Date;
    actionType: string;
    historyId: number;
    massAmount: number;
    quantity: number;
    averageQuantity: number;
    density: number;
    expectedHarvestDate: Date;
    expectedHarvestQuantity: number;
}
export class ReportFeedConversionRateRequest {
    farmingSeasonId: number;
}
export class ReportFeedConversionRate {
    feedConversionRateId: number;
    fishPondId: number;
    waterSurfaceArea: number;
    farmingSeasonId: number;
    surveyDate: Date;
    productId: number;
    weight: number;
    averageQuantity: number;
    deadstockAmount: number;
    deadstockQuantity: number;
    foodQuantity: number;
    livestockAmount: number;
    livestockQuantity: number;
    lostPercent: number;
    proprotionPercent: number;
    density: number;
    fcr: number;
}