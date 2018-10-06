import { PageFilterModel } from "../models/shared";
import { SupplierModel } from "../models/supplier";
import { APICallerBase } from "./api-caller-base";

export const SupplierAPICaller = {
    GetList: async (model: PageFilterModel) => await APICallerBase.Post(`api/suppliers`, model),
    Create: async (model: SupplierModel) => await APICallerBase.Post(`api/suppliers/add`, model),
    Update: async (model: SupplierModel) => await APICallerBase.Put(`api/suppliers/${model.id}/modify`, model),
    Delete: async (id: number) => await APICallerBase.Delete(`api/suppliers/${id}/remove`),
}
