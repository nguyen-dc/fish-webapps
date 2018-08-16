import { PageFilterModel } from "../models/shared";
import { WarehouseTypeModel } from "../models/warehouse-type";

export const WarehouseTypeAPICaller = {
    GetList: async (model: PageFilterModel) => {
        return fetch(`api/warehouse-types`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        });
    },
    Create: async (model: WarehouseTypeModel) => {
        return fetch("api/warehouse-types/add", {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        })
    },
    Update: async (model: WarehouseTypeModel) => {
        return fetch(`api/warehouse-types/${model.id}/modify`, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        });
    }
}
