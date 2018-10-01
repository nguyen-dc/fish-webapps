import { PageFilterModel } from "../models/shared";
import { WarehouseModel } from "../models/warehouse";
import { APICallerBase } from "./api-caller-base";

export const WarehouseAPICaller = {
    GetList: async (model: PageFilterModel) => await APICallerBase.Post(`api/warehouses`, model),
    Create: async (model: WarehouseModel) => await APICallerBase.Post(`api/warehouses/add`, model),
    Update: async (model: WarehouseModel) => await APICallerBase.Put(`api/warehouses/${model.id}/modify`, model),
}
