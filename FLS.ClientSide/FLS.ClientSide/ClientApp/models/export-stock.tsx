import { StockIssueDocketModel } from "./stock-issue-docket";
import { StockIssueDocketDetailModel } from "./stock_issue_docket_detail";
import { ExpenditureDocketModel } from "./expenditure-docket";

interface IExportStock {
    issueDocket: StockIssueDocketModel;
    docketDetails: StockIssueDocketDetailModel[];
    receipt: ExpenditureDocketModel;
}
export class ExportStockModel implements IExportStock {
    issueDocket: StockIssueDocketModel;
    docketDetails: StockIssueDocketDetailModel[];
    receipt: ExpenditureDocketModel;
}