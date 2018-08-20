import { PageFilterModel } from "../models/shared";
import { CustomerModel } from "../models/customer";
import { ProductGroupModel } from "../models/product-group";

export const ProductGroupAPICaller = {
    GetList: async (model: PageFilterModel) => {
        return fetch(`api/product-groups`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        });
    },
    Create: async (model: ProductGroupModel) => {
        return fetch("api/product-groups/add", {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        })
    },
    Update: async (model: ProductGroupModel) => {
        return fetch(`api/product-groups/${model.id}/modify`, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        });
    }
}
