import { PageFilterModel } from "../models/shared";
import { CustomerModel } from "../models/customer";

export const CustomerAPICaller = {
    GetList: async (model: PageFilterModel) => {
        try {
            let request = await fetch('api/customers', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(model)
            });
            return await request.json();
        }
        catch (err) {
            return console.log(`Error: ${err.stack}`);
        }
    },

    //GetList: async (model: PageFilterModel) => {
    //    return await fetch(`api/customers`, {
    //        method: 'post',
    //        headers: {
    //            'Accept': 'application/json',
    //            'Content-Type': 'application/json'
    //        },
    //        body: JSON.stringify(model)
    //    });
    //},

    Create: async (model: CustomerModel) => {
        return fetch("api/customers/add", {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        })
    },
    Update: async (model: CustomerModel) => {
        return fetch(`api/customers/${model.id}/modify`, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        });
    }
}
