import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from "./components/Home";
import { Code404 } from "./404";
import { FarmRegions } from './components/farm-region/farm-region';
import { FishPonds } from './components/fish-pond/fish-pond';
import { FarmingSeasons } from './components/farming-season/farming-season';
import { Warehouses } from './components/warehouse/warehouse';
import { ProductGroups } from './components/product-group/product-group';
import { ProductUnits } from './components/product-unit/product-unit';
import { Products } from './components/product/product';
import { ProductSubGroups } from './components/product-group/product-subgroup';
import { Customers } from './components/customer/customer';
import { Suppliers } from './components/supplier/supplier';
import { WarehouseTypes } from './components/warehouse-type/warehouse-type';
import { StockReceiveDocketTypes } from './components/stock-receive-docket-type/stock-receive-docket-type';
import { StockIssueDocketTypes } from './components/stock-issue-docket-type/stock-issue-docket-type';
import { ExpenditureTypes } from './components/expenditure-type/expenditure-type';
import { ReleaseLivestocks } from './components/livestock-proceed/release-livestock';
import { FeedLivestocks } from './components/livestock-proceed/feed-livestock';
import { SpreadMedicines } from './components/livestock-proceed/spread-medicine';
import { CollectDeadstocks } from './components/livestock-proceed/collect-deadstock';
import { CheckLivestockInfos } from './components/livestock-proceed/check-livestock-info';
import { ManageImports } from './components/import/manage-import';
import { ImportStocks } from './components/import/import-stock';
import { ManageExports } from './components/export/manage-export';
import { ExportStocks } from './components/export/export-stock';
import { DisposeStocks } from './components/export/dispose-stock';
import { ManageExpenditures } from './components/expenditure/manage-expenditure';
import { NewStockIssueReceipt } from './components/expenditure/new-stock-issue-receipt';
import { NewStockReceivePayslip } from './components/expenditure/new-stock-receive-payslip';
import { ExportLivestocks } from './components/export/export-livestock';
import { ExportDeadstocks } from './components/export/export-deadstock';
import { FarmingSeasonHistories } from './components/report/farming-season-history';
import { FeedConversionRates } from './components/report/feed-conversion-rate';
import { FarmingLivestockReports } from './components/report/farming-livestock-report';
import { ExportReports } from './components/report/export-report';
import { InventoryReports } from './components/report/inventory-report';
import { ExpenditureReports } from './components/report/expenditure-report';
import { CostReports } from './components/report/cost-report';
import { RevenueReports } from './components/report/revenue-report';
import { ManageUsers } from './components/system/manage-user';
import { ManageUserRoles } from './components/system/manage-user-role';
import { StockReceiveDocketEdit } from './components/import/stock-receive-edit';
import { ImportDetail } from './components/import/import-detail';
import { ExportDetail } from './components/export/export-detail';
import { ProductDetail } from './components/product/product-detail';

export const routes = <Layout>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/vungnuoi' component={FarmRegions} />
        <Route exact path='/aonuoi' component={FishPonds} />
        <Route exact path='/dotnuoi' component={FarmingSeasons} />
        <Route exact path='/kho' component={Warehouses} />
        <Route exact path='/nganhhang' component={ProductGroups} />
        <Route exact path='/nhomhang' component={ProductSubGroups} />
        <Route exact path='/donvitinh' component={ProductUnits} />
        <Route exact path='/sanpham' component={Products} />
        <Route exact path='/sanpham/:productId' component={ProductDetail} />
        <Route exact path='/khachhang' component={Customers} />
        <Route exact path='/nhacungcap' component={Suppliers} />
        <Route exact path='/loaikho' component={WarehouseTypes} />
        <Route exact path='/loaiphieunhap' component={StockReceiveDocketTypes} />
        <Route exact path='/loaiphieuxuat' component={StockIssueDocketTypes} />
        <Route exact path='/loaiphieuthuchi' component={ExpenditureTypes} />
        <Route exact path='/quanlynhap' component={ManageImports} />
        <Route exact path='/quanlynhap/nhaphang' component={ImportStocks} />
        <Route exact path='/quanlynhap/:docketId' component={ImportDetail} />
        
        <Route exact path='/quanlyxuat' component={ManageExports} />
        <Route exact path='/quanlyxuat/xuathang' component={ExportStocks} />
        <Route exact path='/quanlyxuat/:docketId' component={ExportDetail} />
        {/*  <Route exact path='/xuathuy' component={DisposeStocks} /> */}
        <Route exact path='/quanlythuchi' component={ManageExpenditures} />
        <Route exact path='/taophieuthu' component={NewStockIssueReceipt} />
        <Route exact path='/taophieuchi' component={NewStockReceivePayslip} />
        <Route exact path='/nhapthaca' component={ReleaseLivestocks} />
        <Route exact path='/choan' component={FeedLivestocks} />
        <Route exact path='/raithuoc' component={SpreadMedicines} />
        <Route exact path='/kiemcachet' component={CollectDeadstocks} />
        <Route exact path='/kiemtratangtrong' component={CheckLivestockInfos} />
        <Route exact path='/xuatbanca' component={ExportLivestocks} />
        <Route exact path='/xuatbancachet' component={ExportDeadstocks} />
        <Route exact path='/nhatkyaonuoi' component={FarmingSeasonHistories} />
        <Route exact path='/theodoitangtrong' component={FeedConversionRates} />
        <Route exact path='/baocao/cagiong' component={FarmingLivestockReports} />
        <Route exact path='/baocao/xuatvattu' component={ExportReports} />
        <Route exact path='/baocao/nhapxuatton' component={InventoryReports} />
        <Route exact path='/baocao/thuchi' component={ExpenditureReports} />
        <Route exact path='/baocao/chiphi' component={CostReports} />
        <Route exact path='/baocao/doanhthu' component={RevenueReports} />
        <Route exact path='/hethong/nguoidung' component={ManageUsers} />
        <Route exact path='/hethong/quyennguoidung' component={ManageUserRoles} />
        {/* not match url */}
        <Route component={Code404} />
    </Switch>
</Layout>;
