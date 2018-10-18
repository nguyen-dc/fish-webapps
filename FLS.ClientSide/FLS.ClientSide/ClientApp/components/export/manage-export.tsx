import * as React from "react";
import { NavLink } from "react-router-dom";
import { RouteComponentProps } from 'react-router';
import Pagination from "react-js-pagination";
import PropTypes from 'prop-types';
import { PaginateModel, IdNameModel, PageFilterModel, ResponseConsult } from "../../models/shared";
import { LabeledSelect, LabeledCheckBox } from "../shared/input/labeled-input";
import { LabeledSingleDatePicker } from "../shared/date-time/labeled-single-date-picker";
import * as Moment from 'moment';
import { CacheAPI } from "../../api-callers/cache";
import { ExportAPICaller } from "../../api-callers/export";
import { _HString, _HNumber } from "../../handles/handles";
import { Glyphicon } from "react-bootstrap";
import { EmptyTableMessage } from "../shared/view-only";
import { StockIssueDocketModel } from "../../models/stock-issue-docket";

interface ManageExportState {
    listStockIssue: any,
    warehouses: IdNameModel[],
    stockIssueDocketTypes: IdNameModel[],
    pagingModel: PaginateModel,
    isTableLoading: boolean,
    searchModel: PageFilterModel,
    lastSearchModel: PageFilterModel,
}

export class ManageExports extends React.Component<RouteComponentProps<{}>, ManageExportState> {
    constructor(props: any) {
        super(props)
        this.state = {
            pagingModel: new PaginateModel(),
            isTableLoading: true,
            listStockIssue: [],
            warehouses: [],
            stockIssueDocketTypes:[],
            lastSearchModel: new PageFilterModel(),
            searchModel: new PageFilterModel(),
        };
    }
    static contextTypes = {
        ShowGlobalMessage: PropTypes.func,
        ShowGlobalMessageList: PropTypes.func,
    }
    async componentWillMount() {
        var warehouses = await CacheAPI.Warehouse();
        var stockIssueDocketTypes = await CacheAPI.StockIssueDocketType();
        this.setState({ warehouses: warehouses.data, stockIssueDocketTypes : stockIssueDocketTypes.data });
        await this.onPageChange(1, true);
    }
    async loadData(page: number, newSearch: boolean) {
        let searchModel = this.state.lastSearchModel;
        searchModel.page = page;
        if (newSearch) {
            searchModel = searchModel;
            searchModel.page = 1;
        }
        return await ExportAPICaller.GetList(searchModel);
    }
    async onPageChange(page: any, newSearch: boolean) {
        try {
            this.setState({ isTableLoading: true });
            var result = await this.loadData(page, newSearch) as ResponseConsult;
            if (!result) { return; }
            if (result.hasError) {
                this.context.ShowGlobalMessageList('error', result.errors);
            } else {
                var paging = new PaginateModel();
                paging.currentPage = result.data.currentPage;
                paging.totalItems = result.data.totalItems;
                this.setState({ listStockIssue: result.data.items, pagingModel: paging });
                if (newSearch)
                    this.setState({ lastSearchModel: this.state.searchModel });
            }
            if (result.hasWarning) {
                this.context.ShowGlobalMessageList('warning', result.warnings);
            }
        } finally {
            this.setState({ isTableLoading: false });
        }
    }
    render() {
        let { listStockIssue, searchModel, lastSearchModel, pagingModel, isTableLoading } = this.state;
        let lastedSearchKey = _HString.IsNullOrEmpty(lastSearchModel.key) ? "Tất cả" : lastSearchModel.key;
        let dataTable = this.renderTable(listStockIssue);
        let renderPaging = listStockIssue.length > 0 ? this.renderPaging() : null;
        let renderAdvanceSearch = this.renderAdvanceSearch();
        return (
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
                        <div className="mg-bt-15">
                            <div className="text-right">
                                <NavLink className="btn btn-link" to="/quanlyxuat/xuathang" ><Glyphicon glyph='plus' /> Xuất hàng khác</NavLink>
                            </div>
                        </div>
                        {
                            lastSearchModel == undefined ? null :
                                <div className="col-sm-12">
                                    <div className="alert alert-info text-center">
                                        Có <strong>{pagingModel.totalItems}</strong> kết quả
                                    </div>
                                </div>
                        }
                        <div className="col-sm-12">
                            <div className="table-responsive p-relative">
                                {dataTable}
                                {isTableLoading && <div className="icon-loading"></div>}
                            </div>
                        </div>
                        {renderPaging}
                    </div>
                </div>
            </div>
        );
    }

    private renderTable(models: StockIssueDocketModel[]) {
        return (
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Mã</th>
                        <th>Số phiếu</th>
                        <th>Loại phiếu</th>
                        <th>Kho</th>
                        <th>Tổng tiền</th>
                        <th>Người xuất</th>
                        <th>Ghi chú</th>
                        <th>Từ phiếu nhập</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        models.length == 0 ?
                            <EmptyTableMessage /> :
                            models.map(
                                model =>
                                    <tr key={model.id}>
                                        <td>{model.id}</td>
                                        <td>{model.docketNumber}</td>
                                        <td>{model.stockIssueDocketTypeId}</td>
                                        <td>{model.warehouseId}</td>
                                        <td>{_HNumber.FormatCurrency(model.totalAmount)}</td>
                                        <td>{model.executorCode}</td>
                                        <td>{model.description}</td>
                                        <td>{model.stockReceiveDocketId ? model.stockReceiveDocketId: null}</td>
                                        <td><NavLink to={'/quanlyxuat/' + model.id} activeClassName="active"><Glyphicon glyph='option-horizontal' /></NavLink></td>
                                    </tr>
                            )
                    }
                </tbody>
            </table>
        );
    }
    private renderPaging() {
        let { pagingModel } = this.state;
        return (
            <div>
                <div className="col-xs-8">
                    <Pagination
                        innerClass={'pagination mg-0'}
                        activePage={pagingModel.currentPage}
                        itemsCountPerPage={pagingModel.pageSize}
                        totalItemsCount={pagingModel.totalItems}
                        pageRangeDisplayed={pagingModel.pageRangeDisplayed}
                        onChange={this.onPageChange.bind(this)}
                    />
                </div>
                <div className="col-xs-4">
                    <div className="text-right">
                        
                    </div>
                </div>
            </div>
        );
    }
    private renderAdvanceSearch() {
        let { stockIssueDocketTypes, warehouses } = this.state;
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
                            name={'stockIssueDocketTypeId'}
                            value={0}
                            title={'Loại phiếu xuất'}
                            placeHolder={'Loại phiếu xuất'}
                            valueKey={'id'}
                            nameKey={'name'}
                            options={stockIssueDocketTypes} />
                        <LabeledSelect
                            name={'warehouseId'}
                            value={0}
                            title={'Kho xuất'}
                            placeHolder={'Kho xuất'}
                            valueKey={'id'}
                            nameKey={'name'}
                            options={warehouses} />
                    </div>
                    <div className="col-md-4">
                        <LabeledCheckBox
                            name={'status'}
                            value={true}
                            text='Đã hủy'
                        />
                        <button className="btn btn-primary"
                            type="button"
                            onClick={() => this.loadData(1, true)}>
                            <span className="glyphicon glyphicon-search"> </span> Tìm kiếm
                    </button>
                    </div>
                </div>
            </div>
            )
    }
}