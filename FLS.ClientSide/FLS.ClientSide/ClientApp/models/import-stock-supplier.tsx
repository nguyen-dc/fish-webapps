import { StockReceiveDocketDetailModel } from "./stock_receive_docket_detail";

interface IImportStockSupplier {
    supplierBranchId: number;
    billCode: string;
    billSerial: string;
    billTemplateCode: string;
    billDate: Date | string;
    receiveDocketDetails: StockReceiveDocketDetailModel[];
}

export class ImportStockSupplierModel implements IImportStockSupplier {
    supplierBranchId: number = 0;
    billCode: string = "";
    billSerial: string = "" ;
    billTemplateCode: string = "";
    receiveDocketDetails: StockReceiveDocketDetailModel[] = [];
    //----
    supplierBranchName: string = "";
    billDate: Date | string;
}