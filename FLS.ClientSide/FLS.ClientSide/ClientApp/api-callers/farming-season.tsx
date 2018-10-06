import { PageFilterModel } from "../models/shared";
import { FarmingSeasonModel } from "../models/farming-season";
import { APICallerBase } from "./api-caller-base";

export const FarmingSeasonAPICaller = {
    GetList: async (model: PageFilterModel) => await APICallerBase.Post(`api/farming-seasons`, model),
    Create: async (model: FarmingSeasonModel) => await APICallerBase.Post(`api/farming-seasons/add`, model),
    Update: async (model: FarmingSeasonModel) => await APICallerBase.Put(`api/farming-seasons/${model.id}/modify`, model),
    Delete: async (id: number) => await APICallerBase.Delete(`api/farming-seasons/${id}/remove`),
}
