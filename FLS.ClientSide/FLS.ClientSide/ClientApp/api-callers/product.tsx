import { PageFilterModel } from "../models/shared";
import { ProductModel } from "../models/product";
import { APICallerBase } from "./api-caller-base";

export const ProductAPICaller = {
    GetList: async (model: PageFilterModel) => await APICallerBase.Post(`api/products`, model),
    Create: async (model: ProductModel) => await APICallerBase.Post(`api/products/add`, model),
    Update: async (model: ProductModel) => await APICallerBase.Put(`api/products/${model.id}/modify`, model),
    Delete: async (id: number) => await APICallerBase.Delete(`api/products/${id}/remove`),
}
