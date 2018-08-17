import { PageFilterModel } from "../models/shared";
import { SupplierModel } from "../models/supplier";

export const SupplierAPICaller = {
    GetList: async (model: PageFilterModel) => {
        return fetch(`api/suppliers`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        });
    },
    Create: async (model: SupplierModel) => {
        return fetch("api/suppliers/add", {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        })
    },
    Update: async (model: SupplierModel) => {
        return fetch(`api/suppliers/${model.id}/modify`, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        });
    }
}
