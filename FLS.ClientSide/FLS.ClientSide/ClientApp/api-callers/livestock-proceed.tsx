import { APICallerBase } from "./api-caller-base";
import { ReleaseLivestockModel } from "../models/import-stock";

export const LivestockProceedAPICaller = {
    Release: async(model: ReleaseLivestockModel) => await APICallerBase.Post("api/livestock-proceeds/release", model),
}
