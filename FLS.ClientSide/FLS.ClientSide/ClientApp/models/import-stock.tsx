import * as React from "react";
import { StockReceiveDocketModel } from "./stock-receive-docket";
import { ExpenditureDocketDetailModel } from "./expenditure-docket-detait";
import { ImportStockSupplierModel } from "./import-stock-supplier";

export class ImportStockModel {
    receiveDocket: StockReceiveDocketModel;
    suppliers: ImportStockSupplierModel[];
    paySlipDetails: ExpenditureDocketDetailModel[];
    constructor() {
        this.receiveDocket = new StockReceiveDocketModel();
        this.suppliers = [] as ImportStockSupplierModel[];
        this.paySlipDetails = [] as ExpenditureDocketDetailModel[];
    };
}
