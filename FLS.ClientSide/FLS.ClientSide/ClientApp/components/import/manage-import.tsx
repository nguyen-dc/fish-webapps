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
            isHidden: true
        };
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
    async componentWillMount() {
        await this.handlePageChange(1);
    }
    render() {
        let dataTable = this.renderTable(this.state.listStockReceive);
        let renderPaging = this.state.listStockReceive.length > 0 ? this.renderPaging() : null;

        return (
            <div className="content-wapper">
                <div className="row">
                    <div className="col-md-12">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><NavLink to="/">Trang chủ</NavLink></li>
                                <li className="breadcrumb-item active" aria-current="page">Quản lý nhập</li>
                            </ol>
                        </nav>
                    </div>
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
                            <input type="text" className="form-control" name="search" placeholder="Tìm kiếm..." value={this.state.searchKey} onChange={() => this.handlePageChange(1)} />
                            <span className="input-group-btn">
                                <button className="btn btn-default" type="button" onClick={() => this.loadData(1)}><span className="glyphicon glyphicon-search"></span></button>
                                <button className="btn btn-default" onClick={this.toggleHidden.bind(this)}>Mở rộng</button>
                            </span>
                        </div>
                    </div>
                    <div className="col-xs-4">
                        <div className="text-right">
                            <button className="btn btn-default mg-r-15">Import</button>
                            <NavLink className="btn btn-primary" to="/nhapmuahang" >Thêm</NavLink>
                        </div>
                    </div>
                </div>
                {!this.state.isHidden && <AdvanceSearch />}
                {
                    this.state.lastedSearchKey ?
                        <div className="row">
                            <div className="col-md-12">
                                <div className="alert alert-success text-center">
                                    Có {this.state.pagingModel.totalItems} kết quả cho <strong>{this.state.lastedSearchKey}</strong>
                                </div>
                            </div>
                        </div> : null
                }
                <div className="table-responsive p-relative">
                    {dataTable}
                    {this.state.isTableLoading ? <div className="icon-loading"></div> : null}
                </div>
                <div className="row">
                    {renderPaging}
                </div>
            </div>
        );
    }

    private renderTable(models: StockReceiveDocketModel[]) {
        return (
            <table className="table table-bordered table-hover">
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
                    <tr key={1}>
                        <td>{1}</td><td>{'HS21223'}</td><td>{'Nhập cá'}</td><td>{'Kho số 7'}</td>
                        <td>{'Anh Tâm'}</td><td>{'21,000,000'}</td>
                        <td>{'Lê Hùng'}</td><td>{'Nhập thẳng ao 1'}</td><td>{''}</td>
                        <td><ButtonGroup><Button onClick={() => this.handleOpenEdit(1)}>
                            <Glyphicon glyph="edit" /></Button></ButtonGroup>
                        </td></tr>
                    <tr key={2}>
                        <td>{2}</td><td>{'HS21223'}</td><td>{'Nhập cá'}</td><td>{'Kho số 7'}</td>
                        <td>{'Anh Tâm'}</td><td>{'21,000,000'}</td>
                        <td>{'Lê Hùng'}</td><td>{'Nhập thẳng ao 1'}</td><td>{''}</td>
                        <td><ButtonGroup><Button onClick={() => this.handleOpenEdit(2)}>
                            <Glyphicon glyph="edit" /></Button></ButtonGroup>
                        </td></tr>
                    <tr key={3}>
                        <td>{3}</td><td>{'HS21223'}</td><td>{'Nhập cá'}</td><td>{'Kho số 7'}</td>
                        <td>{'Anh Tâm'}</td><td>{'21,000,000'}</td>
                        <td>{'Lê Hùng'}</td><td>{'Nhập thẳng ao 1'}</td><td>{''}</td>
                        <td><ButtonGroup><Button onClick={() => this.handleOpenEdit(3)}>
                            <Glyphicon glyph="edit" /></Button></ButtonGroup>
                        </td></tr>
                    <tr key={4}>
                        <td>{4}</td><td>{'HS21223'}</td><td>{'Nhập cá'}</td><td>{'Kho số 7'}</td>
                        <td>{'Anh Tâm'}</td><td>{'21,000,000'}</td>
                        <td>{'Lê Hùng'}</td><td>{'Nhập thẳng ao 1'}</td><td>{''}</td>
                        <td><ButtonGroup><Button onClick={() => this.handleOpenEdit(4)}>
                            <Glyphicon glyph="edit" /></Button></ButtonGroup>
                        </td></tr>
                    <tr key={5}>
                        <td>{5}</td><td>{'HS21223'}</td><td>{'Nhập cá'}</td><td>{'Kho số 7'}</td>
                        <td>{'Anh Tâm'}</td><td>{'21,000,000'}</td>
                        <td>{'Lê Hùng'}</td><td>{'Nhập thẳng ao 1'}</td><td>{''}</td>
                        <td><ButtonGroup><Button onClick={() => this.handleOpenEdit(5)}>
                            <Glyphicon glyph="edit" /></Button></ButtonGroup>
                        </td></tr>
                    <tr key={6}>
                        <td>{6}</td><td>{'HS21223'}</td><td>{'Nhập cá'}</td><td>{'Kho số 7'}</td>
                        <td>{'Anh Tâm'}</td><td>{'21,000,000'}</td>
                        <td>{'Lê Hùng'}</td><td>{'Nhập thẳng ao 1'}</td><td>{''}</td>
                        <td><ButtonGroup><Button onClick={() => this.handleOpenEdit(6)}>
                            <Glyphicon glyph="edit" /></Button></ButtonGroup>
                        </td></tr>
                    <tr key={7}>
                        <td>{7}</td><td>{'HS21223'}</td><td>{'Nhập cá'}</td><td>{'Kho số 7'}</td>
                        <td>{'Anh Tâm'}</td><td>{'21,000,000'}</td>
                        <td>{'Lê Hùng'}</td><td>{'Nhập thẳng ao 1'}</td><td>{''}</td>
                        <td><ButtonGroup><Button onClick={() => this.handleOpenEdit(7)}>
                            <Glyphicon glyph="edit" /></Button></ButtonGroup>
                        </td></tr>
                    <tr key={8}>
                        <td>{8}</td><td>{'HS21223'}</td><td>{'Nhập cá'}</td><td>{'Kho số 7'}</td>
                        <td>{'Anh Tâm'}</td><td>{'21,000,000'}</td>
                        <td>{'Lê Hùng'}</td><td>{'Nhập thẳng ao 1'}</td><td>{''}</td>
                        <td><ButtonGroup><Button onClick={() => this.handleOpenEdit(8)}>
                            <Glyphicon glyph="edit" /></Button></ButtonGroup>
                        </td></tr>
                    {/*
                        models.length == 0 ?
                            <tr><td colSpan={10}>Không có dữ liệu!</td></tr> :
                            models.map(
                                model =>
                                    <tr key={model.Id}>
                                        <td>{model.Id}</td>
                                        <td>{model.StockIssueDocketTypeId}</td>
                                        <td>{model.WarehouseId}</td>
                                        <td>{model.CustomerName}</td>
                                        <td>{model.DocketNumber}</td>
                                        <td>{model.TotalAmount}</td>
                                        <td>{model.ExecutorCode}</td>
                                        <td>{model.Description}</td>
                                        <td>{model.StockReceiveDocketId}</td>
                                        <td><a className="cursor-pointer" onClick={() => this.handleOpenEdit(model.Id)}>Sửa</a></td>
                                    </tr>
                            )
                    */}
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
                        onChange={this.handlePageChange.bind(this)}
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
    <Well className="row">
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
                title={'Kho nhập'}
                placeHolder={'Kho nhập'}
                valueKey={'id'}
                nameKey={'name'}
                options={[{ id: 1, name: 'Kho 1' }, { id: 2, name: 'Kho 2' }]} />
            <LabeledSelect
                name={'suppliers'}
                value={0}
                title={'Nhà cung cấp'}
                placeHolder={'Nhà cung cấp'}
                valueKey={'id'}
                nameKey={'name'}
                options={[{ id: 1, name: 'Nhà CC 1' }, { id: 2, name: 'Nhà CC 2' }]} />
        </div>
        <div className="col-md-4">
            <LabeledSelect
                name={'input'}
                value={0}
                title={'Loại phiếu nhập'}
                placeHolder={'Loại phiếu nhậpp'}
                valueKey={'id'}
                nameKey={'name'}
                options={[{ id: 1, name: 'Loại phiếu nhập 1' }, { id: 2, name: 'Loại phiếu nhập 2' }]} />
            <div className='form-group-custom mg-bt-15'>
                <label className="control-label min-w-140 float-left"></label>
                <div>
                    <label className="font-normal"><input type="checkbox" /> Đã hủy</label>
                </div>
            </div>
        </div>
        <div className="col-md-12">
            <div className="col-md-12">
                <div className="text-right">
                    <button type="submit" className="btn btn-primary">Tìm kiếm</button>
                </div>
            </div>
        </div>
    </Well>
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