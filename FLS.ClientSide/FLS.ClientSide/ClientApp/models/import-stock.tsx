import * as React from "react";
import { StockReceiveDocketModel } from "./stock-receive-docket";
import { ExpenditureDocketDetailModel } from "./expenditure-docket-detait";
import { ImportStockSupplierModel } from "./import-stock-supplier";
import { StockIssueDocketDetailModel } from "./stock_issue_docket_detail";

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

export class CostsModel {
    paySlipTypeId: number = 0;
    description: string = "";
    amount: number = 0;
}

export class ReleaseLivestockModel {
    livestockDocket: ReleaseLivestockDocketModel;
    suppliers: ImportStockSupplierModel[];
    paySlipDetails: ExpenditureDocketDetailModel[];
}
export class ReleaseLivestockDocketModel {
    fishPondWarehouseId: number;
    receiveDate: Date | null;
    isActuallyReceived: boolean;
    vat: number;
    amount: number;
    totalAmount: number;
    description: string;
}

export class FeedingLivestockModel {
    fishPondWarehouseId: number;
    feedDate: Date | null;
    details: StockIssueDocketDetailModel[];
}