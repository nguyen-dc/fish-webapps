import { PageFilterModel } from "../models/shared";
import { CustomerModel } from "../models/customer";
import { ProductGroupModel } from "../models/product-group";

export const ProductSubGroupAPICaller = {
    GetList: async (model: PageFilterModel) => {
        return fetch(`api/product-subgroups`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        });
    },
    Create: async (model: ProductGroupModel) => {
        return fetch("api/product-subgroups/add", {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        })
    },
    Update: async (model: ProductGroupModel) => {
        return fetch(`api/product-subgroups/${model.id}/modify`, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        });
    }
}
