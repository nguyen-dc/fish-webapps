import { PageFilterModel } from "../models/shared";
import { StockReceiveDocketTypeModel } from "../models/stock-receive-docket-type";

export const StockReceiveDocketTypeAPICaller = {
    GetList: async (model: PageFilterModel) => {
        return fetch(`api/stock-receive-docket-types`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        });
    },
    Create: async (model: StockReceiveDocketTypeModel) => {
        return fetch("api/stock-receive-docket-types/add", {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        })
    },
    Update: async (model: StockReceiveDocketTypeModel) => {
        return fetch(`api/stock-receive-docket-types/${model.id}/modify`, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        });
    }
}
