import { PageFilterModel } from "../models/shared";
import { StockReceiveDocketTypeModel } from "../models/stock-receive-docket-type";
import { APICallerBase } from "./api-caller-base";

export const StockReceiveDocketTypeAPICaller = {
    GetList: async (model: PageFilterModel) => await APICallerBase.Post(`api/stock-receive-docket-types`, model),
    Create: async (model: StockReceiveDocketTypeModel) => await APICallerBase.Post(`api/stock-receive-docket-types/add`, model),
    Update: async (model: StockReceiveDocketTypeModel) => await APICallerBase.Put(`api/stock-receive-docket-types/${model.id}/modify`, model),
}
