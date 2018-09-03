import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { RouteComponentProps } from 'react-router';
import { PaginateModel, IdNameModel, PageFilterModel, FilterModel } from "../../models/shared";
import Pagination from "react-js-pagination";
import { ButtonGroup, Glyphicon, Button } from "react-bootstrap";
import { ProductEdit } from "./product-edit";
import { ProductAPICaller } from "../../api-callers/product";
import { CacheAPI } from "../../api-callers/cache";
import { StringHandle, ObjectHandle } from "../../handles/handles";
import { FilterEnum } from "../../enums/filter-enum";
import { ProductModel } from "../../models/product";

interface ProductState {
    listProduct: ProductModel[],
    pagingModel: PaginateModel,
    selectedModel: ProductModel,
    selectedFilter: IdNameModel,
    isTableLoading: boolean,
    editModalShow: boolean,
    editModalTitle: string,
    productGroups: IdNameModel[],
    searchModel: PageFilterModel,
    lastSearchModel: PageFilterModel
}
const filterTitle0 = 'Tất cả ngành hàng';
export class Products extends React.Component<RouteComponentProps<{}>, ProductState> {

    constructor(props: any) {
        super(props)
        let selectedFilter = new IdNameModel();
        selectedFilter.id = 0;
        selectedFilter.name = filterTitle0;
        this.state = {
            listProduct: [],
            pagingModel: new PaginateModel(),
            selectedModel: new ProductModel(),
            selectedFilter: selectedFilter,
            isTableLoading: true,
            editModalShow: false,
            editModalTitle: '',
            productGroups: [],
            searchModel: new PageFilterModel(),
            lastSearchModel: new PageFilterModel()
        };
    }
    async componentWillMount() {
        var productGroups = await CacheAPI.ProductGroup();
        this.setState({ productGroups: productGroups.data });
        await this.onPageChange(1, true);
    }

    async loadData(page: number, newSearch: boolean) {
        let searchModel = this.state.lastSearchModel;
        searchModel.page = page;
        if (newSearch) {
            searchModel = this.state.searchModel;
            searchModel.page = 1;
        }
        let request = await ProductAPICaller.GetList(searchModel);
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
            if (!result || !result.data) {
                this.setState({ searchModel: ObjectHandle.Clone(this.state.lastSearchModel) });
                return;
            }
            var paging = new PaginateModel();
            paging.currentPage = result.data.currentPage;
            paging.totalItems = result.data.totalItems;
            this.setState({ listProduct: result.data.items, pagingModel: paging, lastSearchModel: ObjectHandle.Clone(this.state.searchModel) });
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
    onOpenEdit(model: ProductModel) {
        if (model.id > 0) {
            this.setState({ editModalShow: true, editModalTitle: 'Chỉnh sửa sản phẩm', selectedModel: model });
        }
        else
            this.setState({ editModalShow: true, editModalTitle: 'Tạo mới sản phẩm', selectedModel: new ProductModel() });
    }
    onCloseEdit() {
        this.setState({ editModalShow: false });
    }

    onSearchKeyChange(e) {
        let searchModel = this.state.searchModel;
        searchModel.key = e.target.value;
        this.setState({ searchModel: searchModel });
    }

    onSearchKeyPress(e) {
        if (e.charCode == 13) {
            this.onPageChange(1, true);
        }
    }

    handleFilter(filter: IdNameModel) {
        if (filter == null || filter == undefined) return;
        let searchModel = this.state.searchModel;
        searchModel.filters[0].key = FilterEnum.farmRegion;
        searchModel.filters[0].value = filter.id;
        this.setState({ selectedFilter: filter, searchModel: searchModel });
        this.onPageChange(1, true);
    }

    render() {
        let dataTable = this.renderTable(this.state.listProduct);
        let renderPaging = this.state.listProduct.length > 0 ? this.renderPaging() : null;
        let lastedSearchKey = StringHandle.IsNullOrEmpty(this.state.lastSearchModel.key) ? "Tất cả" : this.state.lastSearchModel.key;
        return (
            <div className="content-wapper">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><NavLink to="/">Trang chủ</NavLink></li>
                    <li className="breadcrumb-item active" aria-current="page">Sản phẩm</li>
                </ol>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className="col-sm-8 mg-bt-15">
                            <div className="input-group">
                                <div className="input-group-btn search-panel">
                                    <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                        <span id="search_concept">{this.state.selectedFilter.name}</span> <span className="caret"></span>
                                    </button>
                                    <ul className="dropdown-menu" role="menu">
                                        <li className="cursor-pointer"><a onClick={this.handleFilter.bind(this, { id: 0, name: filterTitle0 })}>{filterTitle0}</a></li>
                                        {this.state.productGroups.map(opt => {
                                            return (
                                                <li className="cursor-pointer" key={opt.id}>
                                                    <a onClick={this.handleFilter.bind(this, opt)}>{opt.name}</a>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                                <input type="text" className="form-control" name="search" placeholder="Tìm kiếm..." value={this.state.searchModel.key} onChange={this.onSearchKeyChange.bind(this)} onKeyPress={this.onSearchKeyPress.bind(this)} />
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
                        {
                            this.state.lastSearchModel == undefined ? null :
                                <div className="col-sm-12">
                                    <div className="alert alert-info text-center">
                                        Có {this.state.pagingModel.totalItems} kết quả cho <strong>{lastedSearchKey}</strong> thuộc <strong>{this.state.lastSearchModel.filters[0].value}</strong>
                                    </div>
                                </div>
                        }
                        <div className="col-sm-12">
                            <div className="table-responsive p-relative">
                                {dataTable}
                                {this.state.isTableLoading && <div className="icon-loading"></div>}
                            </div>
                        </div>
                        {renderPaging}
                    </div>
                </div>

                <ProductEdit
                    isShow={this.state.editModalShow}
                    onCloseModal={this.onCloseEdit.bind(this)}
                    title={this.state.editModalTitle}
                    isEdit={this.state.selectedModel.id > 0}
                    model={this.state.selectedModel}
                    onFormAfterSubmit={this.onFormAfterSubmit.bind(this)}
                    productGroups={this.state.productGroups}
                />
            </div>
        );
    }

    private renderTable(products: ProductModel[]) {
        return (
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Mã</th>
                        <th>Sản phẩm</th>
                        <th>Ngành hàng</th>
                        <th>Nhóm hàng</th>
                        <th>Đơn vị tính</th>
                        <th>Thuế</th>
                        <th className="th-sm-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.length == 0 ?
                            <tr><td colSpan={7}>Không có dữ liệu!</td></tr>
                            :
                            products.map(product =>
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.productGroupId}</td>
                                    <td>{product.productSubgroupId}</td>
                                    <td>{product.defaultUnitId}</td>
                                    <td>{product.taxPercentId}</td>
                                    <td className="text-right">
                                        <ButtonGroup>
                                            <Button bsStyle="default" className="btn-sm" onClick={() => this.onOpenEdit(product)}>
                                                <Glyphicon glyph="edit" /></Button>
                                            <Button bsStyle="warning" className="btn-sm" onClick={() => this.onDelete(product.id)}>
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
