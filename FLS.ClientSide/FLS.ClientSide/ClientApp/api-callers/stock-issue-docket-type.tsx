import { PageFilterModel } from "../models/shared";
import { StockIssueDocketTypeModel } from "../models/stock-issue-docket-type";

export const StockIssueDocketTypeAPICaller = {
    GetList: async (model: PageFilterModel) => {
        return fetch(`api/stock-issue-docket-types`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        });
    },
    Create: async (model: StockIssueDocketTypeModel) => {
        return fetch("api/stock-issue-docket-types/add", {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        })
    },
    Update: async (model: StockIssueDocketTypeModel) => {
        return fetch(`api/stock-issue-docket-types/${model.id}/modify`, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        });
    }
}
