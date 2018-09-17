import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { RouteComponentProps } from 'react-router';
import { ProductSubGroupEdit } from "./product-subgroup-edit";
import { Button, ButtonGroup, Glyphicon } from "react-bootstrap";
import { Content } from "react-bootstrap/lib/Tab";
import * as ReactDOM from "react-dom";
import Pagination from "react-js-pagination";
import { PaginateModel, IdNameModel, PageFilterModel } from "../../models/shared";
import { ProductSubGroupModel } from "../../models/product-subgroup";
import Notifications, { notify } from 'react-notify-toast';
import { _HString, _HObject } from "../../handles/handles";
import { CacheAPI } from "../../api-callers/cache";
import { FilterEnum } from "../../enums/filter-enum";
import { ProductSubGroupAPICaller } from "../../api-callers/product-subgroup";
let apiUrl = 'api/product-subgroups/';

interface productSubGroupsState {
    listProductSubGroup: ProductSubGroupModel[],
    pagingModel: PaginateModel,
    selectedModel: ProductSubGroupModel,
    selectedFilter: IdNameModel,
    isTableLoading: boolean,
    editModalShow: boolean,
    editModalTitle: string,
    productGroups: IdNameModel[],
    searchModel: PageFilterModel,
    lastSearchModel: PageFilterModel
}
const filterTitle0 = 'Tất cả ngành hàng';
export class ProductSubGroups extends React.Component<RouteComponentProps<{}>, productSubGroupsState> {
    constructor(props: any) {
        super(props)
        
        let selectedFilter = new IdNameModel();
        selectedFilter.id = 0;
        selectedFilter.name = filterTitle0;
        this.state = {
            listProductSubGroup: [],
            pagingModel: new PaginateModel(),
            selectedModel: new ProductSubGroupModel(),
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
        let request = await ProductSubGroupAPICaller.GetList(searchModel);
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
                this.setState({ searchModel: _HObject.Clone(this.state.lastSearchModel) });
                return;
            }
            var paging = new PaginateModel();
            paging.currentPage = result.data.currentPage;
            paging.totalItems = result.data.totalItems;
            this.setState({ listProductSubGroup: result.data.items, pagingModel: paging, lastSearchModel: _HObject.Clone(this.state.searchModel) });
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
    onOpenEdit(model: ProductSubGroupModel) {
        if (model.id > 0) {
            this.setState({ editModalShow: true, editModalTitle: 'Chỉnh sửa nhóm hàng', selectedModel: model });
        }
        else
            this.setState({ editModalShow: true, editModalTitle: 'Thêm mới nhóm hàng', selectedModel: new ProductSubGroupModel() });
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
    
    //private async _getData(page: number) {
    //    try {
    //        var apiFetch = apiUrl;
    //        if (this.state.filterValue) {
    //            apiFetch = "api/product-groups/" + this.state.filterValue + "/subgroups";
    //        }
    //        let request = await fetch(apiFetch, {
    //            method: 'post',
    //            headers: {
    //                'Accept': 'application/json',
    //                'Content-Type': 'application/json'
    //            },
    //            body: JSON.stringify({
    //                Page: page,
    //                PageSize: this.state.pagingModel.pageSize,
    //                Key: this.state.search,
    //            })
    //        });
    //        return await request.json();
    //    }
    //    catch (err) {
    //        console.log(`Error: ${err.stack}`);
    //    }
    //}

    render() {
        let dataTable = this.renderTable(this.state.listProductSubGroup);
        let renderPaging = this.state.listProductSubGroup.length > 0 ? this.renderPaging() : null;
        let lastedSearchKey = _HString.IsNullOrEmpty(this.state.lastSearchModel.key) ? "Tất cả" : this.state.lastSearchModel.key;
        return (
            <div className="content-wapper">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><NavLink to="/">Trang chủ</NavLink></li>
                    <li className="breadcrumb-item active" aria-current="page">nhóm hàng</li>
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
                <ProductSubGroupEdit
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
    
    private renderTable(groups: ProductSubGroupModel[]) {
        return (
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Mã</th>
                        <th>Tên nhóm hàng</th>
                        <th>Ngành hàng</th>
                        <th>Ghi chú</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        groups.length == 0 ?
                            <tr><td colSpan={4}>Không có dữ liệu!</td></tr>
                            :
                            groups.map(group =>
                                <tr key={group.id}>
                                    <td>{group.id}</td>
                                    <td>{group.name}</td>
                                    <td>{group.productGroupId}</td>
                                    <td>{group.description}</td>
                                    <td className="text-right">
                                        <ButtonGroup>
                                            <Button bsStyle="default" className="btn-sm" onClick={() => this.onOpenEdit(group)}>
                                                <Glyphicon glyph="edit" /></Button>
                                            <Button bsStyle="warning" className="btn-sm" onClick={() => this.onDelete(group.id)}>
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

