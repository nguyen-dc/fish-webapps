import { PageFilterModel } from "../models/shared";
import { APICallerBase } from "./api-caller-base";
import { ProductSubGroupModel } from "../models/product-subgroup";

export const ProductSubGroupAPICaller = {
    GetList: async (model: PageFilterModel) => await APICallerBase.Post(`api/product-subgroups`, model),
    Create: async (model: ProductSubGroupModel) => await APICallerBase.Post(`api/product-subgroups/add`, model),
    Update: async (model: ProductSubGroupModel) => await APICallerBase.Put(`api/product-subgroups/${model.id}/modify`, model),
    Delete: async (id: number) => await APICallerBase.Delete(`api/product-subgroups/${id}/remove`),
}
