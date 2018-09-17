import { PageFilterModel } from "../models/shared";
import { ExportStockModel } from "../models/export-stock";

export const ExportAPICaller = {
    GetList: async (model: PageFilterModel) => {
        return await fetch(`api/stock-issue-dockets`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        });
    },
    Create: async (model: ExportStockModel) => {
        return await fetch("api/stock-issue-dockets/add", {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        });
    },
    Update: async (model: ExportStockModel) => {
        return await fetch(`api/stock-issue-dockets/${model.issueDocket.id}/modify`, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        });
    }
}
