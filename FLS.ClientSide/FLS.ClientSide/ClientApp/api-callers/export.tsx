import { PageFilterModel } from "../models/shared";
import { ExportStockModel } from "../models/export-stock";
import { APICallerBase } from "./api-caller-base";

export const ExportAPICaller = {
    GetList: async (model: PageFilterModel) => await APICallerBase.Post(`api/stock-issue-dockets`, model),
    Create: async (model: ExportStockModel) => await APICallerBase.Post(`api/stock-issue-dockets/add`, model),
    Update: async (model: ExportStockModel) => await APICallerBase.Put(`api/stock-issue-dockets/${model.issueDocket.id}/modify`, model),
    Detail: async (docketId: number) => await APICallerBase.Get(`api/stock-issue-dockets/${docketId}`),
}
