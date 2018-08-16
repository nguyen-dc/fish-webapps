import { PageFilterModel } from "../models/shared";
import { FarmRegionModel } from "../models/farm-region";

export const FarmRegionAPICaller = {
    GetList: async (model: PageFilterModel) => {
        return fetch(`api/farm-regions`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        });
    },
    Create: async (model: FarmRegionModel) => {
        return fetch("api/farm-regions/add", {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        })
    },
    Update: async (model: FarmRegionModel) => {
        return fetch(`api/farm-regions/${model.id}/modify`, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        });
    }
}
