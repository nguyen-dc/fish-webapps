import * as React from "react";
import { Link } from "react-router-dom";
import { RouteComponentProps } from 'react-router';
import { ProductEdit } from "./product-edit";
import { Button } from "react-bootstrap";
import { Content } from "react-bootstrap/lib/Tab";
import * as ReactDOM from "react-dom";
import Pagination from "react-js-pagination";
import { PaginateModel } from "../../models/shared";
import { ProductModel } from "../../models/product";
const urlCreate = 'api/products/add';
const urlUpdate = 'api/products/modify';

interface ProductState {
    products: ProductModel[];
    modalShow: boolean;
    isLoadingTable: boolean;
    search: string;
    filterTitle: string;
    filterValue: string | number;
    //model modal
    title: string;
    product: ProductModel;
    isEdit: boolean;
    formErrors: {};
    productSubGroups: any;
    productGroups: any;
    productUnits: any;
    taxPercents: any;
    pagingModel: PaginateModel;
}

export class Products extends React.Component<RouteComponentProps<{}>, ProductState> {
    constructor(props: any) {
        super(props)

        this.state = {
            products: [],
            isLoadingTable: true,
            modalShow: false,
            search: '',
            filterTitle: 'Tất cả',
            filterValue: 0,
            title: 'Thêm mới nhóm hàng',
            product: new ProductModel(),
            isEdit: false,
            formErrors: {},
            productGroups: [],
            productSubGroups: [],
            productUnits: [],
            taxPercents: [],
            pagingModel: new PaginateModel()
        };
    }

    async handlePageChange(event: any) {
        this.setState({ isLoadingTable: true });
        var result = await this._getData(event);

        var paging = new PaginateModel();
        paging.currentPage = event;
        paging.totalItems = 100;

        this.setState({ products: result, isLoadingTable: false, pagingModel: paging });
    }

    async componentDidUpdate(prevProps, prevState) {
        var filterValue = prevState.filterValue;
        if (filterValue !== this.state.filterValue) {
            await this._loadData(1);
        }
    }

    async componentWillMount() {
        var result = await this._getData(this.state.pagingModel.currentPage);
        var paging = new PaginateModel();
        paging.currentPage = result.data.currentPage;
        paging.totalItems = result.data.totalItem;
        this.setState({ products: result.data.items, isLoadingTable: false, pagingModel: paging });
        await this._getCacheData();
    }

    private async _getCacheData() {
        var productGroups = await this._getProductGroup();
        var productSubGroups = await this._getProductSubGroup();
        var productUnits = await this._getProductUnit();
        //var taxPercents = await this._getTaxPercents();
        this.setState(
            {
                productGroups: productGroups.data != null ? productGroups.data : [],
                productSubGroups: productSubGroups.data != null ? productSubGroups.data : [],
                productUnits: productUnits.data != null ? productUnits.data : [],
                //taxPercents: taxPercents.data != null ? taxPercents.data:[]
            });
    }

    private async _getData(page: number) {
        try {
            let request = await fetch('api/products', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Page: page,
                    PageSize: 10,
                    Key: this.state.search
                })
            });
            return await request.json();
        }
        catch (err) {
            console.log(`Error: ${err.stack}`);
        }
    }

    private async _getProductGroup() {
        try {
            let request = await fetch('api/cache/product-groups');
            return await request.json();
        }
        catch (err) {
            console.log(`Error: ${err.stack}`);
        }
    }

    private async _getProductSubGroup() {
        try {
            let request = await fetch('api/cache/product-subgroups');
            return await request.json();
        }
        catch (err) {
            console.log(`Error: ${err.stack}`);
        }
    }

    private async _getProductUnit() {
        try {
            let request = await fetch('api/cache/product-units');
            return await request.json();
        }
        catch (err) {
            console.log(`Error: ${err.stack}`);
        }
    }

    private async _getTaxPercents() {
        try {
            let request = await fetch('api/cache/tax-percents');
            return await request.json();
        }
        catch (err) {
            console.log(`Error: ${err.stack}`);
        }
    }

    //modal
    private async _create() {
        console.log(this.state.product);
        var myHeaders = new Headers({
            "Content-Type": "application/json"
        });
        var result = await fetch(urlCreate, {
            method: "POST",
            body: JSON.stringify(this.state.product),
            headers: myHeaders
        });
    }

    private async _edit() {
        var myHeaders = new Headers({
            "Content-Type": "application/json"
        });
        var result = await fetch(urlUpdate, {
            method: "POST",
            body: JSON.stringify(this.state.product),
            headers: myHeaders
        });
    }

    private onFieldValueChange(fieldName: string, value: string) {
        const nextState = {
            ...this.state,
            productSubGroup: {
                ...this.state.product,
                [fieldName]: value,
            }
        };
        this.setState(nextState);
    }

    private handleFormSubmit = (e) => {
        e.preventDefault();
        var errors = this._validate();
        if (Object.keys(errors).length > 0) {
            this.setState({
                formErrors: errors
            });
            return;
        }
        this.setState({ formErrors: {} });

        if (this.state.isEdit)
            this._edit();
        else
            this._create();
    }

    private _validate() {
        var errors = {};
        if (this.state.product.name == "") {
            errors['name'] = 'Tên sản phẩm không được bỏ trống';
        }

        return errors;
    }

    private async _getDataEdit(id: number) {
        try {
            let request = await fetch('api/products/' + id);
            return await request.json();
        }
        catch (err) {
            console.log(`Error: ${err.stack}`);
        }
    }

    private async _loadData(page: number) {
        var result = await this._getData(page);
        var paging = new PaginateModel();
        paging.currentPage = page;
        paging.totalItems = 100;
        this.setState({ products: result.data.items, isLoadingTable: false, pagingModel: paging });
    }

    async handleOpenEdit(id: number) {
        if (id) {
            var result = await this._getDataEdit(id);
            this.setState({ modalShow: true, title: 'Chỉnh sửa ' + result.name, product: result, isEdit: true, formErrors: {} });
        }
    }

    handleSearch(event) {
        this.setState({ search: event.target.value });
    }

    async handleButtonSearch(event) {
        await this._loadData(1);
    }

    handleFilter(val) {
        if (val) {
            var text = this.state.productGroups.find(item => item.id == val);
            if (text != null) {
                this.setState({ filterTitle: text.name, filterValue: val });
            }
        }
        else {
            this.setState({ filterTitle: 'Tất cả', filterValue: 0 });
        }
    }

    handleOpen() {
        this.setState({ modalShow: true, formErrors: {}, isEdit: false });
    }

    handleClose() {
        this.setState({ modalShow: false, product: {} as ProductModel, formErrors: {} });
    }

    render() {
        let dataTable = this.renderTable(this.state.products);
        return (
            <div className="content-wapper">
                <div className="row">
                    <div className="col-xs-8 mg-bt-15">
                        <div className="input-group">
                            <div className="input-group-btn search-panel">
                                <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                    <span id="search_concept">{this.state.filterTitle}</span> <span className="caret"></span>
                                </button>
                                <ul className="dropdown-menu" role="menu">
                                    <li className="cursor-pointer"><a onClick={this.handleFilter.bind(this, 0)}>Tất cả</a></li>
                                    {this.state.productGroups.map(opt => {
                                        return (
                                            <li className="cursor-pointer" key={opt.id}><a onClick={this.handleFilter.bind(this, opt.id)}>{opt.name}</a></li>
                                        );
                                    })}

                                </ul>
                            </div>
                            <input type="hidden" name="search_param" value="all" id="search_param" />
                            <input type="text" className="form-control" name="search" placeholder="Tìm kiếm..." value={this.state.search} onChange={this.handleSearch.bind(this)} />
                            <span className="input-group-btn">
                                <button className="btn btn-default" type="button" onClick={this.handleButtonSearch.bind(this)}><span className="glyphicon glyphicon-search"></span></button>
                            </span>
                        </div>
                    </div>
                    <div className="col-xs-4">
                        <div className="text-right">
                            <button className="btn btn-default mg-r-15">Import</button>
                            <Button
                                bsStyle="primary"
                                onClick={this.handleOpen.bind(this)}
                            >Thêm</Button>
                        </div>
                    </div>
                </div>
                {this.state.search && !this.state.isLoadingTable ?
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="alert alert-info text-center">
                                Kết quả tìm kiếm cho <strong>{this.state.search}</strong>
                            </div>
                        </div>
                    </div>
                    : null
                }

                <div className="table-responsive p-relative">
                    {dataTable}
                    {this.state.isLoadingTable ? <div className="icon-loading"></div> : null}
                </div>
                <div className="row">
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
                <ProductEdit
                    isShow={this.state.modalShow}
                    handleClose={this.handleClose.bind(this)}
                    handleFormSubmit={this.handleFormSubmit.bind(this)}
                    onFieldValueChange={this.onFieldValueChange.bind(this)}
                    title={this.state.title}
                    product={this.state.product}
                    formErrors={this.state.formErrors}
                    isEdit={this.state.isEdit}
                    productGroups={this.state.productGroups}
                    productSubgroups={this.state.productSubGroups}
                    productUnits={this.state.productUnits}
                    taxPercents={this.state.taxPercents}
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
                        <th>Nhóm hàng</th>
                        <th>Ngành hàng</th>
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
                                    <td>{product.name}</td>
                                    <td>{product.name}</td>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td><a className="cursor-pointer" onClick={() => this.handleOpenEdit(product.id)}>Sửa</a></td>
                                </tr>
                            )
                    }
                </tbody>
            </table>
        );
    }
}