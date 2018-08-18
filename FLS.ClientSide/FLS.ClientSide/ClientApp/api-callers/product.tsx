import { PageFilterModel } from "../models/shared";
import { ProductModel } from "../models/product";

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

export const ProductAPICaller = {
    GetList: async (model: PageFilterModel) => {
        return await fetch(`api/products`, {
            method: 'post',
            headers: headers,
            body: JSON.stringify(model)
        });
    },
    Create: async (model: ProductModel) => {
        return await fetch("api/products/add", {
            method: 'post',
            headers: headers,
            body: JSON.stringify(model)
        })
    },
    Update: async (model: ProductModel) => {
        return await fetch(`api/products/${model.id}/modify`, {
            method: 'put',
            headers: headers,
            body: JSON.stringify(model)
        });
    }
}
