import { APICallerBase } from "./api-caller-base";

export const ReportFarmingSeasonAPICaller = {
    GetList: async (model: any) => await APICallerBase.Post(`api/report-live-stock-history-detail/list`, model)
}
