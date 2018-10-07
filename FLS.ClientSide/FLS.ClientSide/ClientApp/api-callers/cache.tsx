import { APICallerBase } from "./api-caller-base";

export const CacheAPI = {
    FarmRegion: async () => await APICallerBase.Get(`api/cache/farm-regions`),
    FishPond: async () => await APICallerBase.Get(`api/cache/fish-ponds`),
    ProductGroup: async () => await APICallerBase.Get(`api/cache/product-groups`),
    ProductSubgroup: async () => await APICallerBase.Get(`api/cache/product-subgroups`),
    ProductUnit: async () => await APICallerBase.Get(`api/cache/product-units`),
    TaxPercent: async () => await APICallerBase.Get(`api/cache/tax-percents`),
    Warehouse: async () => await APICallerBase.Get(`api/cache/warehouses`),
    WarehouseTypes: async () => await APICallerBase.Get(`api/cache/warehouse-types`),
    ReceiptType: async () => await APICallerBase.Get(`api/cache/receipt-types`),
    PayslipType: async () => await APICallerBase.Get(`api/cache/payslip-types`),
    StockReceiveDocketType: async () => await APICallerBase.Get(`api/cache/stock-receive-docket-types`),
    StockIssueDocketType: async () => await APICallerBase.Get(`api/cache/stock-issue-docket-types`),
    ExpenditureDocket: async () => await APICallerBase.Get(`api/cache/expenditure-dockets`),
    ExpenditureType: async () => await APICallerBase.Get(`api/cache/expenditure-types`),
}
