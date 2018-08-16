import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { RouteComponentProps } from 'react-router';
import { PaginateModel } from "../../models/shared";
import Pagination from "react-js-pagination";
import { ProductUnitModel } from "../../models/product-unit";
import { ButtonGroup, Glyphicon, Button } from "react-bootstrap";
import { ProductUnitEdit } from "./product-unit-edit";
import { ProductUnitAPICaller } from "../../api-callers/product-unit";
import { Last } from "react-bootstrap/lib/Pagination";
import { StringHandle } from "../../handles/string-handle";

export class ProductUnits extends React.Component<RouteComponentProps<{}>, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            listProductUnit: [],
            pagingModel: new PaginateModel(),
            searchKey: '',
            lastedSearchKey: undefined,
            selectedModel: new ProductUnitModel(),
            isTableLoading: true,
            editModalShow: false,
            editModalTitle: ''
        };
    }
    async componentDidMount() {
        await this.onPageChange(1, true);
    }
    async loadData(page: number, newSearch: boolean) {
        let keySearch = this.state.lastedSearchKey;
        if (newSearch)
            keySearch = this.state.searchKey;

        let request = await ProductUnitAPICaller.GetList({
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
            this.setState({ listProductUnit: result.data.items, pagingModel: paging });
            if (newSearch)
                this.setState({ lastedSearchKey: this.state.searchKey });
        } finally {
            this.setState({ isTableLoading: false });
        }
    }
    async onDelete(id: number) {
        //// 
    }
    onFormAfterSubmit(isSuccess, model) {
        if (isSuccess)
            this.onPageChange(this.state.pagingModel.currentPage, false)
    }
    onOpenEdit(id: number) {
        if (id > 0) {
            let list = this.state.listProductUnit as ProductUnitModel[];
            let model = list.find(pu => pu.id == id);
            if (!model) return;
            this.setState({ editModalShow: true, editModalTitle: 'Chỉnh sửa đơn vị sản phẩm', selectedModel: model });
        }
        else
            this.setState({ editModalShow: true, editModalTitle: 'Tạo đơn vị sản phẩm', selectedModel: new ProductUnitModel()});
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
        let dataTable = this.renderTable(this.state.listProductUnit);
        let renderPaging = this.state.listProductUnit.length > 0 ? this.renderPaging() : null;
        let lastedSearchKey = StringHandle.IsNullOrEmpty(this.state.lastedSearchKey) ? "Tất cả" : this.state.lastedSearchKey;
        return (
            <div className="content-wapper">
                <div className="row">
                    <div className="col-md-12">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><NavLink to="/">Trang chủ</NavLink></li>
                                <li className="breadcrumb-item active" aria-current="page">Đơn vị sản phẩm</li>
                            </ol>
                        </nav>
                    </div>
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
                            <button className="btn btn-default mg-r-15">Import</button>
                            <Button
                                bsStyle="primary"
                                onClick={this.onOpenEdit.bind(this)}
                            >Thêm</Button>
                        </div>
                    </div>
                </div>
                {
                    this.state.lastedSearchKey == undefined ? null :
                        <div className="row">
                            <div className="col-md-12">
                                <div className="alert alert-success text-center">
                                    Có {this.state.pagingModel.totalItems} kết quả cho <strong>{lastedSearchKey}</strong>
                                </div>
                            </div>
                        </div>
                }
                <div className="table-responsive p-relative">
                    {dataTable}
                    {this.state.isTableLoading ? <div className="icon-loading"></div> : null}
                </div>
                <div className="row">
                    {renderPaging}
                </div>
                <ProductUnitEdit
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

    private renderTable(models: ProductUnitModel[]) {
        return (
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Mã vùng</th>
                        <th>Tên đơn vị sản phẩm</th>
                        <th>Có số lẻ</th>
                        <th width="100px"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        models.length == 0 ?
                            <tr><td colSpan={10}>Không có dữ liệu!</td></tr> :
                            models.map(m =>
                                <tr key={m.id}>
                                    <td>{m.id}</td>
                                    <td>{m.name}</td>
                                    <td>{m.hasScale ? 'Có' : 'Không'}</td>
                                    <td className="text-right">
                                        <ButtonGroup>
                                            <Button bsStyle="default" className="btn-sm" onClick={() => this.onOpenEdit(m.id)}>
                                                <Glyphicon glyph="edit" /></Button>
                                            <Button bsStyle="danger" onClick={() => this.onDelete(m.id)}>
                                                <Glyphicon glyph="remove" /></Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                            )
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

interface ProductUnitState {
    listProductUnit: ProductUnitModel[],
    pagingModel: PaginateModel,
    searchKey: string,
    lastedSearchKey: string,
    selectedModel: ProductUnitModel,
    isTableLoading: boolean,
    editModalShow: boolean,
    editModalTitle: string
}