import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { RouteComponentProps } from 'react-router';
import Pagination from "react-js-pagination";
import { StockReceiveDocketModel } from "../../models/stock-receive-docket";
import { PaginateModel, IdNameModel, PageFilterModel, ApiResponse } from "../../models/shared";
import { ButtonGroup, Glyphicon, Button, Well } from "react-bootstrap";
import { LabeledInput, LabeledSelect, LabeledCheckBox } from "../shared/input/labeled-input";
import { LabeledSingleDatePicker } from "../shared/date-time/labeled-single-date-picker";
import * as Moment from 'moment';
import { CacheAPI } from "../../api-callers/cache";
import { ExportAPICaller } from "../../api-callers/export";
import { ManagerExportStockModel, ManagerExportSearchModel } from "../../models/manager-export-stock";
import { CustomerAPICaller } from "../../api-callers";
import { Customers } from "../customer/customer";
import { UnderConstructor } from "../shared/under-constructor";
const urlLoadList = 'api/stock-receive-dockets';
const filterTitle0 = 'Tất cả';

interface IManageImportState {
    listCustomer: ManagerExportStockModel[],
    warehouses: IdNameModel[],
    customers: IdNameModel[],
    stockIssueDocketTypes: IdNameModel[],
    pagingModel: PaginateModel,
    searchKey: string,
    lastedSearchKey: string,
    isTableLoading: boolean,
    searchModel: PageFilterModel,
    lastSearchModel: PageFilterModel,
    filterSearch: ManagerExportSearchModel
}

export class ManageExports extends React.Component<RouteComponentProps<{}>, IManageImportState> {
    constructor(props: any) {
        super(props)
        let selectedFilter = new IdNameModel();
        selectedFilter.id = 0;
        selectedFilter.name = filterTitle0;

        this.state = {
            listCustomer: [],
            pagingModel: new PaginateModel(),
            searchKey:'',
            lastedSearchKey: '',
            isTableLoading: true,
            warehouses: [],
            customers: [],
            stockIssueDocketTypes:[],
            lastSearchModel: new PageFilterModel(),
            searchModel: new PageFilterModel(),
            filterSearch: new ManagerExportSearchModel()
        };
    }

    async componentWillMount() {
        await this.onPageChange(1, true);
        var warehouses = await CacheAPI.Warehouse();

        var search = new PageFilterModel();
        search.page = 1;
        search.pageSize = this.state.pagingModel.pageSize;
        let result = await CustomerAPICaller.GetList(search);
        if(!result.hasError && result.data)
            this.setState({ customers: result.data });
        var stockIssueDocketTypes = await CacheAPI.StockIssueDocketType();
        this.setState({ warehouses: warehouses.data, stockIssueDocketTypes: stockIssueDocketTypes.data});
    }
    async loadData(page: number, newSearch: boolean) {
        let searchModel = this.state.lastSearchModel;
        searchModel.page = page;
        if (newSearch) {
            searchModel = this.state.searchModel;
            searchModel.page = 1;
        }
        searchModel.filters.push();

        let request = await ExportAPICaller.GetList(searchModel);
        if (request.ok)
            return (await request.json());
        else {
            //// raise error
            return null;
        }
    }
    async onPageChange(page: any, newSearch: boolean) {
        try {
            this.setState({ isTableLoading: true });
            var result = await this.loadData(page, newSearch);
            if (!result || !result.data) { return; }
            var paging = new PaginateModel();
            paging.currentPage = result.data.currentPage;
            paging.totalItems = result.data.totalItems;
            this.setState({ listCustomer: result.data.items, pagingModel: paging });
            if (newSearch)
                this.setState({ lastedSearchKey: this.state.searchKey });
        } finally {
            this.setState({ isTableLoading: false });
        }
    }
   
    onFormAfterSubmit(isSuccess, model) {
        if (isSuccess)
            this.onPageChange(this.state.pagingModel.currentPage, false)
    }
   
    onSearchKeyChange(e) {
        this.setState({ searchKey: e.target.value });
    }
    onSearchKeyPress(e) {
        if (e.charCode == 13) {
            this.onPageChange(1, true);
        }
    }

    render() {
        let dataTable = this.renderTable(this.state.listCustomer);
        let renderPaging = this.state.listCustomer.length > 0 ? this.renderPaging() : null;
        let renderAdvanceSearch = this.renderAdvanceSearch(this.state.filterSearch);
        return (
            <UnderConstructor /> ||
            <div className="content-wapper">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><NavLink to="/">Trang chủ</NavLink></li>
                        <li className="breadcrumb-item active" aria-current="page">Quản lý xuất</li>
                    </ol>
                </nav>
                <div className="panel panel-default">
                    <div className="panel-body">
                        {renderAdvanceSearch}
                        <div className="col-xs-8 mg-bt-15">
                            <div className="input-group">
                                <div className="input-group-btn search-panel">
                                    <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                        <span id="search_concept">Tất cả</span> <span className="caret"></span>
                                    </button>
                                    <ul className="dropdown-menu" role="menu">
                                        <li><a>Tất cả</a></li>
                                    </ul>
                                </div>
                                <input type="text" className="form-control" name="search" placeholder="Tìm kiếm..." value={this.state.searchKey} onChange={this.onSearchKeyChange.bind(this)} onKeyPress={this.onSearchKeyPress.bind(this)} />
                                <span className="input-group-btn">
                                    <button className="btn btn-primary" type="button" onClick={() => this.onPageChange(1, true)}><span className="glyphicon glyphicon-search"> </span> Tìm kiếm</button>
                                </span>
                            </div>
                        </div>
                        <div className="col-xs-4">
                            <div className="text-right">
                                <NavLink className="btn btn-primary" to="/xuatbanhang" >Thêm</NavLink>
                            </div>
                        </div>
                        {
                            this.state.lastedSearchKey ?
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="alert alert-info text-center">
                                            Có {this.state.pagingModel.totalItems} kết quả cho <strong>{this.state.lastedSearchKey}</strong>
                                        </div>
                                    </div>
                                </div> : null
                        }
                        <div className="col-sm-12">
                            <div className="table-responsive p-relative">
                                {dataTable}
                                {this.state.isTableLoading ? <div className="icon-loading"></div> : null}
                            </div>
                        </div>
                        {renderPaging}
                    </div>
                </div>
            </div>
        );
    }

    private renderTable(models: ManagerExportStockModel[]) {
        return (
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Mã</th>
                        <th>Số phiếu</th>
                        <th>Loại phiếu</th>
                        <th>Kho</th>
                        <th>Khách hàng</th>
                        <th>Tổng tiền</th>
                        <th>Người nhập</th>
                        <th>Ghi chú</th>
                        <th>Từ phiếu xuất</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {models != null && models.length > 0 ?
                        models.map(item =>
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.approverCode}</td>
                                <td>{item.stockIssueDocketTypeId}</td>
                                <td>{item.warehouseId}</td>
                                <td>{item.customerName}</td>
                                <td>{item.totalAmount}</td>
                                <td></td>
                                <td></td>
                                <td>{item.description}</td>
                                <td></td>
                        </tr>): null}
                </tbody>
            </table>
        );
    }

    private renderPaging() {
        return (
            <div>
                <div className="col-xs-8">
                    <Pagination
                        innerClass={'pagination mg-0'}
                        activePage={this.state.pagingModel.currentPage}
                        itemsCountPerPage={this.state.pagingModel.pageSize}
                        totalItemsCount={this.state.pagingModel.totalItems}
                        pageRangeDisplayed={this.state.pagingModel.pageRangeDisplayed}
                        onChange={this.onPageChange.bind(this)}
                    />
                </div>
                <div className="col-xs-4">
                    <div className="text-right">
                        <button className="btn btn-default">Export</button>
                    </div>
                </div>
            </div>
        );
    }
    private renderAdvanceSearch(filters: ManagerExportSearchModel) {
        return (
            <div className="col-sm-12">
                <div className="row">
                    <div className="col-md-4">
                        <LabeledSingleDatePicker
                            name={'fromDate'}
                            title={'Từ ngày'}
                            date={Moment()} />
                        <LabeledSingleDatePicker
                            name={'toDate'}
                            title={'Đến ngày'}
                            date={Moment()} />
                    </div>
                    <div className="col-md-4">
                        <LabeledSelect
                            name={'warehouseId'}
                            value={filters.warehouseId}
                            title={'Kho xuất'}
                            placeHolder={'Kho xuất'}
                            valueKey={'id'}
                            nameKey={'name'}
                            options={this.state.warehouses} />
                        <LabeledSelect
                            name={'customerId'}
                            value={filters.customerId}
                            title={'Khách hàng'}
                            placeHolder={'Khách hàng'}
                            valueKey={'id'}
                            nameKey={'name'}
                            options={this.state.customers} />
                    </div>
                    <div className="col-md-4">
                        <LabeledSelect
                            name={'stockIssueDocketTypeId'}
                            value={filters.stockIssueDocketTypeId}
                            title={'Loại phiếu xuất'}
                            placeHolder={'Loại phiếu xuất'}
                            valueKey={'id'}
                            nameKey={'name'}
                            options={this.state.stockIssueDocketTypes} />
                        <LabeledCheckBox
                            name={'status'}
                            value={filters.status}
                            title={'Loại phiếu xuất'}
                            text='Đã hủy'
                        />
                    </div>
                </div>
            </div>
            )
    }
}