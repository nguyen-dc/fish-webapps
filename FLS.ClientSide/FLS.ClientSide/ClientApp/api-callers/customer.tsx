import { PageFilterModel } from "../models/shared";
import { CustomerModel } from "../models/customer";
import { APICallerBase } from "./api-caller-base";

export const CustomerAPICaller = {
    GetList: async (model: PageFilterModel) => await APICallerBase.Post(`api/customers`, model),
    Create: async (model: CustomerModel) => await APICallerBase.Post("api/customers/add", model),
    Update: async (customerId: number, model: CustomerModel) => await APICallerBase.Post(`api/customers/${customerId}/modify`, model)
}
