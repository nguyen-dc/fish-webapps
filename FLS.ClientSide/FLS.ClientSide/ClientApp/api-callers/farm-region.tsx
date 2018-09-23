import { PageFilterModel } from "../models/shared";
import { FarmRegionModel } from "../models/farm-region";
import { APICallerBase } from "./api-caller-base";

export const FarmRegionAPICaller = {
    GetList: async (model: PageFilterModel) => {
        return APICallerBase.Post(`api/farm-regions`, null, model);
    },
    Create: async (model: FarmRegionModel) => {
        return APICallerBase.Post("api/farm-regions/add", null, model);
    },
    Update: async (model: FarmRegionModel) => {
        return APICallerBase.Put(`api/farm-regions/${model.id}/modify`, null, model);
    }
}
