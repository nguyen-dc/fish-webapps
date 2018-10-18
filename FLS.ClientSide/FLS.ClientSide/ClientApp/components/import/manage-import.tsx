import * as React from "react";
import { NavLink } from "react-router-dom";
import { RouteComponentProps } from 'react-router';
import Pagination from "react-js-pagination";
import PropTypes from 'prop-types';
import { StockReceiveDocketModel } from "../../models/stock-receive-docket";
import { PaginateModel, PageFilterModel, ResponseConsult } from "../../models/shared";
import { Glyphicon } from "react-bootstrap";
import { LabeledSelect, LabeledCheckBox } from "../shared/input/labeled-input";
import { LabeledSingleDatePicker } from "../shared/date-time/labeled-single-date-picker";
import * as Moment from 'moment';
import { _HNumber, _HString } from "../../handles/handles";
import { EmptyTableMessage } from "../shared/view-only";
import { ImportAPICaller } from "../../api-callers/import";
import { CacheAPI } from "../../api-callers";
export class ManageImports extends React.Component<RouteComponentProps<{}>, any> {

    constructor(props: any) {
        super(props)
        this.state = {
            listStockReceive: [],
            warehouses: [],
            stockReceiveDocketTypes: [],
            pagingModel: new PaginateModel(),
            searchModel: new PageFilterModel(),
            lastSearchModel: new PageFilterModel(),
            editStockReceiveId: 0,
            isTableLoading: true,
            editModalShow: false,
            editModalTitle: '',
            isHidden: true,
        };
    }
    static contextTypes = {
        ShowGlobalMessage: PropTypes.func,
        ShowGlobalMessageList: PropTypes.func,
    }
    async componentWillMount() {
        var warehouses = await CacheAPI.Warehouse();
        var stockReceiveDocketTypes = await CacheAPI.StockReceiveDocketType();
        this.setState({ warehouses: warehouses.data, stockReceiveDocketTypes: stockReceiveDocketTypes.data });
        await this.onPageChange(1, true);
    }
    async loadData(page: number, newSearch: boolean) {
        let { searchModel } = this.state;
        searchModel.page = page;
        if (newSearch) {
            searchModel = searchModel;
            searchModel.page = 1;
        }
        return await ImportAPICaller.GetList(searchModel);
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
                this.setState({ listStockReceive: result.data.items, pagingModel: paging });
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
        let { listStockReceive, lastSearchModel, pagingModel, isTableLoading } = this.state;
        let dataTable = this.renderTable(listStockReceive);
        let renderPaging = listStockReceive.length > 0 ? this.renderPaging() : null;
        let advanceSeach = this.renderSeach();
        return (
            <div className="content-wapper">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><NavLink to="/">Trang chủ</NavLink></li>
                    <li className="breadcrumb-item active" aria-current="page">Quản lý nhập</li>
                </ol>
                <div className="panel panel-default">
                    <div className="panel-body">
                        {advanceSeach}
                        <div className="mg-bt-15">
                            <div className="text-right">
                                <NavLink className="btn btn-link" to="/quanlynhap/nhaphang" ><Glyphicon glyph='plus'/> Nhập thêm hàng</NavLink>
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

    private renderTable(models: StockReceiveDocketModel[]) {
        return (
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Mã</th>
                        <th>Số phiếu</th>
                        <th>Loại phiếu</th>
                        <th>Kho</th>
                        <th>Tổng tiền</th>
                        <th>Người nhập</th>
                        <th>Ghi chú</th>
                        <th>Từ phiếu xuất</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        models.length == 0 ?
                            <EmptyTableMessage/> :
                            models.map(
                                model =>
                                    <tr key={model.id}>
                                        <td>{model.id}</td>
                                        <td>{model.docketNumber}</td>
                                        <td>{model.stockReceiveDocketTypeId}</td>
                                        <td>{model.warehouseId}</td>
                                        <td>{_HNumber.FormatCurrency(model.totalAmount)}</td>
                                        <td>{model.executorCode}</td>
                                        <td>{model.description}</td>
                                        <td>{model.stockIssueDocketId ? model.stockIssueDocketId : null}</td>
                                        <td><NavLink to={'/quanlynhap/' + model.id} activeClassName="active"><Glyphicon glyph='option-horizontal'/></NavLink></td>
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
                <div className="col-sm-8">
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

    private renderSeach() {
        let { warehouses, stockReceiveDocketTypes, searchModel } = this.state;
        return (
            <div className="col-sm-12">
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
                        name={'input'}
                        value={0}
                        title={'Loại phiếu'}
                        placeHolder={'Loại phiếu nhập'}
                        valueKey={'id'}
                        nameKey={'name'}
                        options={stockReceiveDocketTypes} />
                    <LabeledSelect
                        name='warehouses'
                        value={0}
                        title='Kho nhập'
                        placeHolder='Kho nhập'
                        valueKey='id'
                        nameKey='name'
                        options={warehouses} />
                </div>
                <div className="col-md-4">
                    <LabeledCheckBox
                        name='warehouses'
                        value={false}
                        text='Đã hủy' />
                    <button className="btn btn-primary"
                        type="button"
                        onClick={() => this.loadData(1, true)}>
                        <span className="glyphicon glyphicon-search"> </span> Tìm kiếm
                    </button>
                </div>
            </div>
        )
    }
}