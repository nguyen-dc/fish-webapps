import { APICallerBase } from "./api-caller-base";
import { ReleaseLivestockModel, FeedingLivestockModel, CollectDeadstockRequest } from "../models/import-stock";

export const LivestockProceedAPICaller = {
    Release: async (model: ReleaseLivestockModel) => await APICallerBase.Post("api/livestock-proceeds/release", model),
    Feed: async (model: FeedingLivestockModel) => await APICallerBase.Post("api/livestock-proceeds/feed", model),
    Cure: async (model: FeedingLivestockModel) => await APICallerBase.Post("api/livestock-proceeds/cure", model),
    CollectDeadstock: async (model: CollectDeadstockRequest) => await APICallerBase.Post("api/livestock-proceeds/deadstocks/collect", model),
}
