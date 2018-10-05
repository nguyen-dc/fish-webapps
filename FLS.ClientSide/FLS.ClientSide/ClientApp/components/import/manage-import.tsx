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
import { EmptyTableMessage } from "../shared/view-only";
import { UnderConstructor } from "../shared/under-constructor";
const urlLoadList = 'api/stock-receive-dockets';
export class ManageImports extends React.Component<RouteComponentProps<{}>, any> {

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
            warehouses: [],
            suppliers: [],
            stockReceiveDocketTypes: []
        };
    }
    async componentWillMount() {
        var warehouses = await CacheAPI.Warehouse();
        var stockReceiveDocketTypes = await CacheAPI.StockReceiveDocketType();
        this.setState({ warehouses: warehouses.data, stockReceiveDocketTypes: stockReceiveDocketTypes.data });
        await this.handlePageChange(1);
    }
    async loadData(page: number) {
        try {
            let request = await fetch(urlLoadList, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Page: page,
                    PageSize: this.state.pagingModel.pageSize,
                    Key: this.state.searchKey
                })
            });
            return await request.json();
        }
        catch (err) {
            console.log(`Error: ${err.stack}`);
        }
    }
    async handleOpenEdit(id: number) {
        if (id > 0)
            this.setState({ editModalShow: true, editModalTitle: 'Chỉnh sửa phiếu ' + id, editStockReceiveId: id });
        else
            this.setState({ editModalShow: true, editModalTitle: 'Tạo phiếu nhập', editStockReceiveId: id });
    }
    handleCloseEdit() {
        this.setState({ editModalShow: false });
    }
    toggleHidden() {
        this.setState({
            isHidden: !this.state.isHidden
        })
    }
    async handlePageChange(page: any) {
        try {
            this.setState({ isTableLoading: true });
            var result = await this.loadData(page);
            if (!result) {
                ////
                return;
            }
            var paging = new PaginateModel();
            paging.currentPage = result.data.currentPage;
            paging.totalItems = result.data.totalItems;
            this.setState({ listStockReceive: result.data.items, pagingModel: paging });
        } finally {
            this.setState({ isTableLoading: false });
        }
    }

    render() {
        let dataTable = this.renderTable(this.state.listStockReceive);
        let renderPaging = this.state.listStockReceive.length > 0 ? this.renderPaging() : null;
        let advanceSeach = this.renderSeach();
        return (
            <UnderConstructor /> ||
            <div className="content-wapper">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><NavLink to="/">Trang chủ</NavLink></li>
                    <li className="breadcrumb-item active" aria-current="page">Quản lý nhập</li>
                </ol>
                <div className="panel panel-default">
                    <div className="panel-body">
                        {advanceSeach}
                        <div className="col-sm-8 mg-bt-15">
                            <div className="input-group">
                                <div className="input-group-btn search-panel">
                                    <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                        <span id="search_concept">Tất cả</span> <span className="caret"></span>
                                    </button>
                                    <ul className="dropdown-menu" role="menu">
                                        <li><a>Tất cả</a></li>
                                    </ul>
                                </div>
                                <input type="text" className="form-control" name="search" placeholder="Tìm kiếm..." value={this.state.searchKey} onChange={() => this.handlePageChange(1)} />
                                <span className="input-group-btn">
                                    <button className="btn btn-primary" type="button" onClick={() => this.loadData(1)}><span className="glyphicon glyphicon-search"> </span> Tìm kiếm</button>
                                </span>
                            </div>
                        </div>
                        <div className="col-sm-4 mg-bt-15">
                            <div className="text-right">
                                <NavLink className="btn btn-primary" to="/nhapmuahang" >Thêm</NavLink>
                            </div>
                        </div>
                        {
                            this.state.lastedSearchKey ?
                                <div className="col-sm-12">
                                    <div className="alert alert-info text-center">
                                        Có {this.state.pagingModel.totalItems} kết quả cho <strong>{this.state.lastedSearchKey}</strong>
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
                    {
                        models.length == 0 ?
                            <EmptyTableMessage/> :
                            models.map(
                                model =>
                                    <tr key={model.id}>
                                        <td>{model.id}</td>
                                        <td>{model.stockReceiveDocketTypeId}</td>
                                        <td>{model.warehouseId}</td>
                                        <td>chưa có customer</td>
                                        <td>{model.docketNumber}</td>
                                        <td>{model.totalAmount}</td>
                                        <td>{model.executorCode}</td>
                                        <td>{model.description}</td>
                                        <td>{model.stockReceiveDocketTypeId}</td>
                                        <td><a className="cursor-pointer" onClick={() => this.handleOpenEdit(model.id)}>Sửa</a></td>
                                    </tr>
                            )
                    }
                </tbody>
            </table>
        );
    }

    private renderPaging() {
        return (
            <div>
                <div className="col-sm-8">
                    <Pagination
                        innerClass={'pagination mg-0'}
                        activePage={this.state.pagingModel.currentPage}
                        itemsCountPerPage={this.state.pagingModel.pageSize}
                        totalItemsCount={this.state.pagingModel.totalItems}
                        pageRangeDisplayed={this.state.pagingModel.pageRangeDisplayed}
                        onChange={this.handlePageChange.bind(this)}
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
        return (
            <div className="col-sm-12">
                <div className="col-sm-4">
                    <LabeledSingleDatePicker
                        name={'fromDate'}
                        title={'Từ ngày'}
                        date={Moment()} />
                    <LabeledSingleDatePicker
                        name={'toDate'}
                        title={'Đến ngày'}
                        date={Moment()} />
                </div>
                <div className="col-sm-4">
                    <LabeledSelect
                        name={'warehouses'}
                        value={0}
                        title={'Kho nhập'}
                        placeHolder={'Kho nhập'}
                        valueKey={'id'}
                        nameKey={'name'}
                        options={this.state.warehouses} />
                    <LabeledSelect
                        name={'suppliers'}
                        value={0}
                        title={'Nhà cung cấp'}
                        placeHolder={'Nhà cung cấp'}
                        valueKey={'id'}
                        nameKey={'name'}
                        options={[{ id: 1, name: 'Nhà CC 1' }, { id: 2, name: 'Nhà CC 2' }]} />
                </div>
                <div className="col-sm-4">
                    <LabeledSelect
                        name={'input'}
                        value={0}
                        title={'Loại phiếu nhập'}
                        placeHolder={'Loại phiếu nhập'}
                        valueKey={'id'}
                        nameKey={'name'}
                        options={this.state.stockReceiveDocketTypes} />
                    <div className='form-group-custom mg-bt-15'>
                        <label className="control-label min-w-140 float-left"></label>
                        <div>
                            <label className="font-normal"><input type="checkbox" /> Đã hủy</label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

interface ManageImportState {
    listStockReceive: StockReceiveDocketModel[],
    pagingModel: PaginateModel,
    searchKey: string,
    lastedSearchKey: string,
    editStockReceiveId: number,
    isTableLoading: boolean,
    editModalShow: boolean,
    editModalTitle: string,
}