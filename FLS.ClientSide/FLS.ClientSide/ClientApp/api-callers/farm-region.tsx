import { PageFilterModel } from "../models/shared";
import { FarmRegionModel } from "../models/farm-region";
import { APICallerBase } from "./api-caller-base";

export const FarmRegionAPICaller = {
    GetList: async (model: PageFilterModel) => await APICallerBase.Post(`api/farm-regions`, model),
    Create: async (model: FarmRegionModel) => await APICallerBase.Post("api/farm-regions/add", model),
    Update: async (model: FarmRegionModel) => await APICallerBase.Put(`api/farm-regions/${model.id}/modify`, model),
}
