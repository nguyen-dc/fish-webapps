import { PageFilterModel } from "../models/shared";
import { ExpenditureTypeModel } from "../models/expenditure-type";
import { APICallerBase } from "./api-caller-base";

export const ExpenditureTypeAPICaller = {
    GetList: async (model: PageFilterModel) => await APICallerBase.Post(`api/expenditure-types`, model),
    Create: async (model: ExpenditureTypeModel) => await APICallerBase.Post(`api/expenditure-types/add`, model),
    Update: async (model: ExpenditureTypeModel) => await APICallerBase.Put(`api/expenditure-types/${model.id}/modify`, model),
    Delete: async (id: number) => await APICallerBase.Delete(`api/expenditure-types/${id}/remove`),
}
