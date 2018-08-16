import { PageFilterModel } from "../models/shared";
import { FarmingSeasonModel } from "../models/farming-season";

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

export const FarmingSeasonAPICaller = {
    GetList: async (model: PageFilterModel) => {
        return await fetch(`api/farming-seasons`, {
            method: 'post',
            headers: headers,
            body: JSON.stringify(model)
        });
    },
    Create: async (model: FarmingSeasonModel) => {
        return await fetch("api/farming-seasons/add", {
            method: 'post',
            headers: headers,
            body: JSON.stringify(model)
        })
    },
    Update: async (model: FarmingSeasonModel) => {
        return await fetch(`api/farming-seasons/${model.id}/modify`, {
            method: 'put',
            headers: headers,
            body: JSON.stringify(model)
        });
    }
}
