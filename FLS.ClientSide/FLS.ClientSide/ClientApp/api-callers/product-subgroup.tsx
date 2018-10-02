import { PageFilterModel } from "../models/shared";
import { ProductGroupModel } from "../models/product-group";
import { APICallerBase } from "./api-caller-base";

export const ProductSubGroupAPICaller = {
    GetList: async (model: PageFilterModel) => await APICallerBase.Post(`api/product-subgroups`, model),
    Create: async (model: ProductGroupModel) => await APICallerBase.Post(`api/product-subgroups/add`, model),
    Update: async (model: ProductGroupModel) => await APICallerBase.Put(`api/product-subgroups/${model.id}/modify`, model),
}
