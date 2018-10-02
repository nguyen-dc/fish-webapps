import { PageFilterModel } from "../models/shared";
import { WarehouseTypeModel } from "../models/warehouse-type";
import { APICallerBase } from "./api-caller-base";

export const WarehouseTypeAPICaller = {
    GetList: async (model: PageFilterModel) => await APICallerBase.Post(`api/warehouse-types`, model),
    Create: async (model: WarehouseTypeModel) => await APICallerBase.Post(`api/warehouse-types/add`, model),
    Update: async (model: WarehouseTypeModel) => await APICallerBase.Put(`api/warehouse-types/${model.id}/modify`, model),
}
