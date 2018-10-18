import * as React from "react";
import { NavLink } from "react-router-dom";
import { RouteComponentProps } from 'react-router';
import { PaginateModel, ResponseConsult } from "../../models/shared";
import Pagination from "react-js-pagination";
import PropTypes from 'prop-types';
import { StockIssueDocketTypeModel } from "../../models/stock-issue-docket-type";
import { ButtonGroup, Glyphicon, Button } from "react-bootstrap";
import { StockIssueDocketTypeEdit } from "./stock-issue-docket-type-edit";
import { StockIssueDocketTypeAPICaller } from "../../api-callers/stock-issue-docket-type";
import { _HString } from "../../handles/handles";
import { EmptyTableMessage, IsSystem } from "../shared/view-only";
import { ConfirmButton } from "../shared/button/ConfirmButton";

const options = [
    { value: '0', label: 'Giá bằng 0' },
    { value: '1', label: 'Giá bán' },
    { value: '2', label: 'Giá vốn' }
];
export class StockIssueDocketTypes extends React.Component<RouteComponentProps<{}>, StockIssueDocketTypeState> {
    constructor(props: any) {
        super(props)
        this.state = {
            listStockIssueDocketType: [],
            pagingModel: new PaginateModel(),
            searchKey: '',
            lastedSearchKey: undefined,
            selectedModel: new StockIssueDocketTypeModel(),
            isTableLoading: true,
            editModalShow: false,
            editModalTitle: ''
        };
    }
    async componentWillMount() {
        await this.onPageChange(1, true);
    }
    static contextTypes = {
        ShowGlobalMessage: PropTypes.func,
        ShowGlobalMessageList: PropTypes.func,
    }
    async loadData(page: number, newSearch: boolean) {
        let keySearch = this.state.lastedSearchKey;
        if (newSearch)
            keySearch = this.state.searchKey;

        return await StockIssueDocketTypeAPICaller.GetList({
            page: page,
            pageSize: this.state.pagingModel.pageSize,
            key: keySearch,
            filters: []
        });
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
                this.setState({ listStockIssueDocketType: result.data.items, pagingModel: paging });
                if (newSearch)
                    this.setState({ lastedSearchKey: this.state.searchKey });
            }
            if (result.hasWarning) {
                this.context.ShowGlobalMessageList('warning', result.warnings);
            }
        } finally {
            this.setState({ isTableLoading: false });
        }
    }
    async onDelete(id: number) {
        let result = await StockIssueDocketTypeAPICaller.Delete(id);
        if (!result) { return; }
        if (result.hasError) {
            this.context.ShowGlobalMessageList('error', result.errors);
        } else if (result.data == true) {
            this.context.ShowGlobalMessage('success', 'Xóa loại phiếu xuất thành công');
            this.onPageChange(1, true);
        } else {
            this.context.ShowGlobalMessage('error', 'Có lỗi trong quá trình xóa dữ liệu');
        }
        if (result.hasWarning) {
            this.context.ShowGlobalMessageList('warning', result.warnings);
        }
    }
    onFormAfterSubmit(isSuccess, model) {
        if (isSuccess)
            this.onPageChange(this.state.pagingModel.currentPage, false)
    }
    onOpenEdit(model: StockIssueDocketTypeModel) {
        if (model.id > 0) {
            this.setState({ editModalShow: true, editModalTitle: 'Chỉnh sửa loại phiếu xuất', selectedModel: model });
        }
        else
            this.setState({ editModalShow: true, editModalTitle: 'Tạo loại phiếu xuất', selectedModel: new StockIssueDocketTypeModel()});
    }
    onCloseEdit() {
        this.setState({ editModalShow: false });
    }
    onSearchKeyChange(e) {
        this.setState({ searchKey: e.target.value});
    }
    onSearchKeyPress(e) {
        if (e.charCode == 13) {
            this.onPageChange(1, true);
        }
    }

    render() {
        let dataTable = this.renderTable(this.state.listStockIssueDocketType);
        let renderPaging = this.state.listStockIssueDocketType.length > 0 ? this.renderPaging() : null;
        let lastedSearchKey = _HString.IsNullOrEmpty(this.state.lastedSearchKey) ? "Tất cả" : this.state.lastedSearchKey;
        return (
            <div className="content-wapper">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><NavLink to="/">Trang chủ</NavLink></li>
                    <li className="breadcrumb-item active" aria-current="page">Loại phiếu xuất</li>
                </ol>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className="col-sm-8 mg-bt-15">
                            <div className="input-group">
                                <input type="text" className="form-control" name="search" placeholder="Tìm kiếm..." value={this.state.searchKey} onChange={this.onSearchKeyChange.bind(this)} onKeyPress={this.onSearchKeyPress.bind(this)} />
                                <span className="input-group-btn">
                                    <button className="btn btn-default" type="button" onClick={() => this.onPageChange(1, true)}><span className="glyphicon glyphicon-search"></span></button>
                                </span>
                            </div>
                        </div>
                        <div className="col-sm-4 mg-bt-15">
                            <div className="text-right">
                                
                                <Button
                                    bsStyle="primary"
                                    onClick={this.onOpenEdit.bind(this)}
                                >Thêm</Button>
                            </div>
                        </div>
                        {
                            this.state.lastedSearchKey == undefined ? null :
                                <div className="col-sm-12">
                                    <div className="alert alert-info text-center">
                                        Có {this.state.pagingModel.totalItems} kết quả cho <strong>{lastedSearchKey}</strong>
                                    </div>
                                </div>
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
                <StockIssueDocketTypeEdit
                    isShow={this.state.editModalShow}
                    onCloseModal={this.onCloseEdit.bind(this)}
                    title={this.state.editModalTitle}
                    isEdit={this.state.selectedModel.id > 0}
                    model={this.state.selectedModel}
                    onFormAfterSubmit={this.onFormAfterSubmit.bind(this)}
                />
            </div>
        );
    }

    private renderTable(models: StockIssueDocketTypeModel[]) {
        
        return (
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Mã loại</th>
                        <th>Tên loại</th>
                        <th>Cần phiếu thu</th>
                        <th>Loại giá</th>
                        <th className="th-sm-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        models.length == 0 ?
                            <EmptyTableMessage /> :
                            models.map(m => {
                                let pickingPrice = options.find(o => o.value == m.pickingPrice + '').label;
                                return <tr key={m.id}>
                                    <td>{m.id}</td>
                                    <td>{m.name}</td>
                                    <td>{m.receiptNeeded ? 'Có' : 'Không'}</td>
                                    <td>{pickingPrice}</td>
                                    <td className="text-right">
                                        {m.isSystem ? <IsSystem /> :
                                            <ButtonGroup>
                                                <Button bsStyle="default" className="btn-sm" onClick={() => this.onOpenEdit(m)}>
                                                    <Glyphicon glyph="edit" /></Button>
                                                <ConfirmButton
                                                    bsStyle="warning"
                                                    className="btn-sm"
                                                    glyph='remove'
                                                    modalTitle='Xác nhận xóa loại phiếu xuất'
                                                    modalBodyContent={
                                                        <span>Xác nhận xóa loại phiếu xuất <strong>{m.name}</strong>?</span>
                                                    }
                                                    onClickYes={() => this.onDelete(m.id)} />
                                            </ButtonGroup>
                                        }
                                    </td>
                                </tr>
                            })
                    }
                </tbody>
            </table>
        );
    }

    private renderPaging() {
        return (
                <div className="col-xs-12">
                    <Pagination
                        innerClass={'pagination mg-0'}
                        activePage={this.state.pagingModel.currentPage}
                        itemsCountPerPage={this.state.pagingModel.pageSize}
                        totalItemsCount={this.state.pagingModel.totalItems}
                        pageRangeDisplayed={this.state.pagingModel.pageRangeDisplayed}
                        onChange={this.onPageChange.bind(this)}
                    />
                </div>
        );
    }
}

interface StockIssueDocketTypeState {
    listStockIssueDocketType: StockIssueDocketTypeModel[],
    pagingModel: PaginateModel,
    searchKey: string,
    lastedSearchKey: string,
    selectedModel: StockIssueDocketTypeModel,
    isTableLoading: boolean,
    editModalShow: boolean,
    editModalTitle: string
}