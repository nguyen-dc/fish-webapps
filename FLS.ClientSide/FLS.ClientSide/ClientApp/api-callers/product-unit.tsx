import { PageFilterModel } from "../models/shared";
import { ProductUnitModel } from "../models/product-unit";

export const ProductUnitAPICaller = {
    GetList: async (model: PageFilterModel) => {
        return fetch(`api/product-units`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        });
    },
    Create: async (model: ProductUnitModel) => {
        return fetch("api/product-units/add", {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        })
    },
    Update: async (model: ProductUnitModel) => {
        return fetch(`api/product-units/${model.id}/modify`, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        });
    }
}
