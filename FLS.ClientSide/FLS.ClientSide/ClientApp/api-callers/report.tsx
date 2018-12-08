import { APICallerBase } from "./api-caller-base";
import {
    ReportLivestockHistoryDetailRequest,
    ReportFarmingSeasonHistoryStockRequest,
    ReportFeedConversionRateRequest,
    ReportFarmingSeasonRequest
} from "../models/report";

export const ReportAPICaller = {
    GetLiveStockHistoryDetail: async (model: ReportLivestockHistoryDetailRequest) => await APICallerBase.Post(`api/reports/livestock-history-detail`, model),
    GetFeedConversionRate: async (model: ReportFeedConversionRateRequest) => await APICallerBase.Post(`api/reports/feed-conversion-rate`, model),
    GetFarmingSeason: async (model: ReportFarmingSeasonRequest) => await APICallerBase.Post(`api/reports/farmingseason`, model),
    GetFarmingSeasonHistoryStock: async (model: ReportFarmingSeasonHistoryStockRequest) => await APICallerBase.Post(`api/reports/farmingseason-stock-history`, model),
}
