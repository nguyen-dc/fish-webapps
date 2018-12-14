import * as React from "react";
import { StockReceiveDocketModel } from "./stock-receive-docket";
import { ExpenditureDocketDetailModel } from "./expenditure-docket-detait";
import { ImportStockSupplierModel } from "./import-stock-supplier";
import { StockIssueDocketDetailModel } from "./stock_issue_docket_detail";
import { ProductModel } from "./product";

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
    livestock: ProductModel;
    suppliers: ReleaseStockSupplierModel[];
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
export class ReleaseStockSupplierModel {
    supplierBranchId: number;
    supplierBranchName: string;
    billCode: string;
    billSerial: string;
    billTemplateCode: string;
    billDate: Date | null;
    pricePerKg: number;
    massAmount: number;
    size: number;
    quantity: number;
    amount: number;
    vat: number;
    totalAmount: number;
}

export class FeedingLivestockModel {
    fishPondWarehouseId: number;
    feedDate: Date | null;
    details: StockIssueDocketDetailModel[];
}
export class CollectDeadstockRequest {
    deadstockId: number;
    massAmount: number;
    ratio: number;
    fishPondWarehouseId: number;
    collectDate: Date | null;
}
export class FCRCheckModel {
    fishPondWarehouseId: number;
    livestockId: number;
    weight: number;
    checkDate: Date | null;
}