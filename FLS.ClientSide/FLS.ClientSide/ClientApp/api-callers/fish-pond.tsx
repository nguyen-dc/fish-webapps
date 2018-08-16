import { PageFilterModel } from "../models/shared";
import { FishPondModel } from "../models/fish-pond";

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

export const FishPondAPICaller = {
    GetList: async (model: PageFilterModel) => {
        return await fetch(`api/fish-ponds`, {
            method: 'post',
            headers: headers,
            body: JSON.stringify(model)
        });
    },
    Create: async (model: FishPondModel) => {
        return await fetch("api/fish-ponds/add", {
            method: 'post',
            headers: headers,
            body: JSON.stringify(model)
        })
    },
    Update: async (model: FishPondModel) => {
        return await fetch(`api/fish-ponds/${model.id}/modify`, {
            method: 'put',
            headers: headers,
            body: JSON.stringify(model)
        });
    }
}
