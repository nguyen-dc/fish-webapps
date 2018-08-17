import { PageFilterModel } from "../models/shared";
import { ExpenditureTypeModel } from "../models/expenditure-type";

export const ExpenditureTypeAPICaller = {
    GetList: async (model: PageFilterModel) => {
        return fetch(`api/expenditure-types`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        });
    },
    Create: async (model: ExpenditureTypeModel) => {
        return fetch("api/expenditure-types/add", {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        })
    },
    Update: async (model: ExpenditureTypeModel) => {
        return fetch(`api/expenditure-types/${model.id}/modify`, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        });
    }
}
