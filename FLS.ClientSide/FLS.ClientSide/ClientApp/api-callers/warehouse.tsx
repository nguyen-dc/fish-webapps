import { PageFilterModel } from "../models/shared";
import { WarehouseModel } from "../models/warehouse";

export const WarehouseAPICaller = {
    GetList: async (model: PageFilterModel) => {
        return fetch(`api/warehouses`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        });
    },
    Create: async (model: WarehouseModel) => {
        return fetch("api/warehouses/add", {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        })
    },
    Update: async (model: WarehouseModel) => {
        return fetch(`api/warehouses/${model.id}/modify`, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        });
    }
}
