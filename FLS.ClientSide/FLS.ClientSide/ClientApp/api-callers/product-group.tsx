import { PageFilterModel } from "../models/shared";
import { ProductGroupModel } from "../models/product-group";
import { APICallerBase } from "./api-caller-base";

export const ProductGroupAPICaller = {
    GetList: async (model: PageFilterModel) => await APICallerBase.Post(`api/product-groups`, model),
    Create: async (model: ProductGroupModel) => await APICallerBase.Post(`api/product-groups/add`, model),
    Update: async (model: ProductGroupModel) => await APICallerBase.Put(`api/product-groups/${model.id}/modify`, model),
    Delete: async (id: number) => await APICallerBase.Delete(`api/product-groups/${id}/remove`),
}
