import { PageFilterModel } from "../models/shared";
import { ProductModel, ProductUnitProductModel } from "../models/product";
import { APICallerBase } from "./api-caller-base";

export const ProductAPICaller = {
    GetList: async (model: PageFilterModel, type: 'stock' | 'livestock' = 'stock') => {
        let path = `api/products?type=${type}`;
            return await APICallerBase.Post(path, model);
    },
    Create: async (model: ProductModel) => await APICallerBase.Post(`api/products/add`, model),
    Update: async (model: ProductModel) => await APICallerBase.Put(`api/products/${model.id}/modify`, model),
    Delete: async (id: number) => await APICallerBase.Delete(`api/products/${id}/remove`),
    Detail: async (id: number) => await APICallerBase.Get(`api/products/${id}`),
    CreateUnit: async (model: ProductUnitProductModel) => await APICallerBase.Post(`api/products/${model.productId}/units/add`, model),
    UpdateUnit: async (model: ProductUnitProductModel) => await APICallerBase.Put(`api/products/units/${model.id}/modify`, model),
    DeleteUnit: async (id: number) => await APICallerBase.Delete(`api/products/units/${id}/remove`),
}