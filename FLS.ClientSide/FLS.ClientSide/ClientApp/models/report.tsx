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
    qtyDeadStock: number;
    deadStockMassAmount: number;
}
export class ReportFarmingSeasonHistoryStockRequest {
    farmingSeasonId: number = 0;
    productGroupId: number = 0;
    productSubgroupId: number = 0;
    productId: number = 0;
}
export class ReportFarmingSeasonHistoryStock {
    productGroupId: number;
    productGroupName: string | null;
    productSubgroupId: number;
    productSubgroupName: string | null;
    productId: number;
    productName: string;
    productUnitId: number;
    productUnitName: string;
    amount: number;
    capitalCost: number;
    childs: ReportFarmingSeasonHistoryStock[];
}
export class ReportFarmingSeasonRequest {
    farmRegionId: number;
    fishPondId: number;
    fromDate: Date;
    toDate: Date;
}
export class ReportFarmingSeasonModel { //report cá giống
    fishPondId: number;
    fishPondName: string;
    a: number;
    b: number;
    c: number;
    d: number;
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