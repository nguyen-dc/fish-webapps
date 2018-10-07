import { PageFilterModel } from "../models/shared";
import { ImportStockModel } from "../models/import-stock";
import { APICallerBase } from "./api-caller-base";

export const ImportAPICaller = {
    GetList: async (model: PageFilterModel) => await APICallerBase.Post(`api/stock-receive-dockets`, model),
    Create: async (model: ImportStockModel) => await APICallerBase.Post("api/stock-receive-dockets/add", model),
    Update: async (docketId: number, model: ImportStockModel) => await APICallerBase.Post(`api/stock-receive-dockets/${docketId}/modify`, model),
    Detail: async (docketId: number) => await APICallerBase.Get(`api/stock-receive-dockets/${docketId}`),
}
