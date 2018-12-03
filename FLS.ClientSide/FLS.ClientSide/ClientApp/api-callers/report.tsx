import { APICallerBase } from "./api-caller-base";

export const LiveStockHistoryDetailAPICaller = {
    GetList: async (model: any) => await APICallerBase.Post(`api/reports/live-stock-history-detail`, model)
}
