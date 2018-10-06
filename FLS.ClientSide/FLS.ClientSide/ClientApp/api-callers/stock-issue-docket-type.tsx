import { PageFilterModel } from "../models/shared";
import { StockIssueDocketTypeModel } from "../models/stock-issue-docket-type";
import { APICallerBase } from "./api-caller-base";

export const StockIssueDocketTypeAPICaller = {
    GetList: async (model: PageFilterModel) => await APICallerBase.Post(`api/stock-issue-docket-types`, model),
    Create: async (model: StockIssueDocketTypeModel) => await APICallerBase.Post(`api/stock-issue-docket-types/add`, model),
    Update: async (model: StockIssueDocketTypeModel) => await APICallerBase.Put(`api/stock-issue-docket-types/${model.id}/modify`, model),
    Delete: async (id: number) => await APICallerBase.Delete(`api/stock-issue-docket-types/${id}/remove`),
}
