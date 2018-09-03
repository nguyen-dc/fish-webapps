import * as React from "react";
import { StockReceiveDocketModel } from "./stock-receive-docket";
import { StockReceiveDocketDetailModel } from "./stock_receive_docket_detail";
import { ExpenditureDocketDetailModel } from "./expenditure-docket-detait";

export class ImportStockModel {
    ReceiveDocket: StockReceiveDocketModel;
    ReceiveDocketDetails: StockReceiveDocketDetailModel;
    PaySlipDetails: ExpenditureDocketDetailModel;
    constructor() {
        this.ReceiveDocket = new StockReceiveDocketModel();
        this.ReceiveDocketDetails = new StockReceiveDocketDetailModel();
        this.PaySlipDetails = new ExpenditureDocketDetailModel();
    };
}
