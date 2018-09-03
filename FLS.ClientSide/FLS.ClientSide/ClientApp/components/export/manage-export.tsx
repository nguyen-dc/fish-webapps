import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { RouteComponentProps } from 'react-router';
import Pagination from "react-js-pagination";
import { StockReceiveDocketModel } from "../../models/stock-receive-docket";
import { PaginateModel } from "../../models/shared";
import { ButtonGroup, Glyphicon, Button, Well } from "react-bootstrap";
import { LabeledInput, LabeledSelect } from "../shared/input/labeled-input";
import { LabeledSingleDatePicker } from "../shared/date-time/labeled-single-date-picker";
import * as Moment from 'moment';
import { CacheAPI } from "../../api-callers/cache";
import { ExportAPICaller } from "../../api-callers/export";
const urlLoadList = 'api/stock-receive-dockets';

export class ManageExports extends React.Component<RouteComponentProps<{}>, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            listStockReceive: [],
            pagingModel: new PaginateModel(),
            searchKey: '',
            lastedSearchKey: null,
            editStockReceiveId: 0,
            isTableLoading: true,
            editModalShow: false,
            editModalTitle: '',
            isHidden: true,
            warehouses: []
        };
    }

    async componentWillMount() {
        await this.onPageChange(1, true);
        var warehouses = await CacheAPI.Warehouse();
        this.setState({ warehouses: warehouses.data });
    }
    async loadData(page: number, newSearch: boolean) {
        let keySearch = this.state.lastedSearchKey;
        if (newSearch)
            keySearch = this.state.searchKey;

        let request = await ExportAPICaller.GetList({
            page: page,
            pageSize: this.state.pagingModel.pageSize,
            key: keySearch,
            filters: []
        });
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
    async onDelete(id: number) {
        //// 
    }
    toggleHidden() {
        this.setState({
            isHidden: !this.state.isHidden
        })
    }
    onFormAfterSubmit(isSuccess, model) {
        if (isSuccess)
            this.onPageChange(this.state.pagingModel.currentPage, false)
    }
    onOpenEdit(model: any) {
        if (model.id > 0) {
            this.setState({ editModalShow: true, editModalTitle: 'Chỉnh sửa thông tin khách hàng', selectedModel: model });
        }
        else
            this.setState({ editModalShow: true, editModalTitle: 'Tạo thông tin khách hàng', selectedModel: null });
    }
    onCloseEdit() {
        this.setState({ editModalShow: false });
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
        let dataTable = this.renderTable(this.state.listStockReceive);
        let renderPaging = this.state.listStockReceive.length > 0 ? this.renderPaging() : null;

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
                        {<AdvanceSearch />}
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

    private renderTable(models: StockReceiveDocketModel[]) {
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
}
const AdvanceSearch = () => (
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
                    name={'warehouses'}
                    value={0}
                    title={'Kho xuất'}
                    placeHolder={'Kho xuất'}
                    valueKey={'id'}
                    nameKey={'name'}
                    options={[{ id: 1, name: 'Kho 1' }, { id: 2, name: 'Kho 2' }]} />
                <LabeledSelect
                    name={'suppliers'}
                    value={0}
                    title={'Khách hàng'}
                    placeHolder={'Khách hàng'}
                    valueKey={'id'}
                    nameKey={'name'}
                    options={[{ id: 1, name: 'Khách hàng 1' }, { id: 2, name: 'Khách hàng 2' }]} />
            </div>
            <div className="col-md-4">
                <LabeledSelect
                    name={'input'}
                    value={0}
                    title={'Loại phiếu xuất'}
                    placeHolder={'Loại phiếu xuất'}
                    valueKey={'id'}
                    nameKey={'name'}
                    options={[{ id: 1, name: 'Loại phiếu xuất 1' }, { id: 2, name: 'Loại phiếu xuất 2' }]} />
                <div className='form-group-custom mg-bt-15'>
                    <label className="control-label min-w-140 float-left"></label>
                    <div>
                        <label className="font-normal"><input type="checkbox" /> Đã hủy</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

interface ManageImportState {
    listStockReceive: StockReceiveDocketModel[],
    pagingModel: PaginateModel,
    searchKey: string,
    lastedSearchKey: string,
    editStockReceiveId: number,
    isTableLoading: boolean,
    editModalShow: boolean,
    editModalTitle: string
}