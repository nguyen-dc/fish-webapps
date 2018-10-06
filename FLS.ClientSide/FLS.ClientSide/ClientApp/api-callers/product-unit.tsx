import { PageFilterModel } from "../models/shared";
import { ProductUnitModel } from "../models/product-unit";
import { APICallerBase } from "./api-caller-base";

export const ProductUnitAPICaller = {
    GetList: async (model: PageFilterModel) => await APICallerBase.Post(`api/product-units`, model),
    Create: async (model: ProductUnitModel) => await APICallerBase.Post(`api/product-units/add`, model),
    Update: async (model: ProductUnitModel) => await APICallerBase.Put(`api/product-units/${model.id}/modify`, model),
    Delete: async (id: number) => await APICallerBase.Delete(`api/product-units/${id}/remove`),
}
