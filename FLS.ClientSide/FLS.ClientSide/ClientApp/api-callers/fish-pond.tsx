import { PageFilterModel } from "../models/shared";
import { FishPondModel } from "../models/fish-pond";
import { APICallerBase } from "./api-caller-base";

export const FishPondAPICaller = {
    GetList: async (model: PageFilterModel) => await APICallerBase.Post(`api/fish-ponds`, model),
    Create: async (model: FishPondModel) => await APICallerBase.Post(`api/fish-ponds/add`, model),
    Update: async (model: FishPondModel) => await APICallerBase.Put(`api/fish-ponds/${model.id}/modify`, model),
}
