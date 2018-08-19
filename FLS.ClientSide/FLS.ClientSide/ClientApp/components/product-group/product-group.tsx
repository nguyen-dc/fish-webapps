import * as React from "react";
import { Link } from "react-router-dom";
import { RouteComponentProps } from 'react-router';
import { ProductGroupEdit } from "./product-group-edit";
import { Button } from "react-bootstrap";
import { Content } from "react-bootstrap/lib/Tab";
import * as ReactDOM from "react-dom";
import Pagination from "react-js-pagination";
import { PaginateModel } from "../../models/shared";
import { ProductGroupModel } from "../../models/product-group";
const urlCreate = 'api/product-groups/add';
const urlUpdate = 'api/product-groups/modify';

interface ProductGroupsState {
    groups: ProductGroupModel[];
    modalShow: boolean;
    isLoadingTable: boolean;
    isShowAlertSeach: boolean;
    search: string;
    //model modal
    title: string;
    productGroup: ProductGroupModel;
    pagingModel: PaginateModel;
    isEdit: boolean;
    formErrors: {};
}

export class ProductGroups extends React.Component<RouteComponentProps<{}>, ProductGroupsState> {
    constructor(props: any) {
        super(props)

        this.state = {
            groups: [],
            isLoadingTable: true,
            isShowAlertSeach: false,
            modalShow: false,
            search: '',
            title:'Thêm mới ngành hàng',
            productGroup: new ProductGroupModel(),
            pagingModel: new PaginateModel(),
            isEdit: false,
            formErrors: {},
        };
    }

    async handlePageChange(event: any) {
        this.setState({ isLoadingTable: true });
        await this._handleLoadData(event);
    }

    async componentWillMount() {
        await this._handleLoadData(this.state.pagingModel.currentPage);
    }

    private async _handleLoadData(page: number) {
        var result = await this._getData(page);
        var paging = new PaginateModel();
        paging.currentPage = result.data.currentPage;
        paging.totalItems = result.data.totalItems;
        this.setState({ groups: result.data.items, isLoadingTable: false, pagingModel: paging });
    }

    private async _getData(page: number) {
        try {
            let request = await fetch('api/product-groups', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Page: page,
                    PageSize: this.state.pagingModel.pageSize,
                    Key: this.state.search
                })
            });
            return await request.json();
        }
        catch (err) {
            console.log(`Error: ${err.stack}`);
        }
    }

    //modal
    private async _create() {
        console.log(this.state.productGroup);
        var myHeaders = new Headers({
            "Content-Type": "application/json"
        });
        var result = await fetch(urlCreate, {
            method: "POST",
            body: JSON.stringify(this.state.productGroup),
            headers: myHeaders
        });
    }

    private async _edit() {
        var myHeaders = new Headers({
            "Content-Type": "application/json"
        });
        var result = await fetch(urlUpdate, {
            method: "POST",
            body: JSON.stringify(this.state.productGroup),
            headers: myHeaders
        });
    }

    private onFieldValueChange(fieldName: string, value: string) {
        const nextState = {
            ...this.state,
            productGroup: {
                ...this.state.productGroup,
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
        if (this.state.productGroup.name == "") {
            errors['name'] = 'Tên nhóm sản phẩm không được bỏ trống';
        }
        return errors;
    }

    private async _getDataEdit(id: number) {
        try {
            let request = await fetch('api/product-groups/' + id);
            return await request.json();
        }
        catch (err) {
            console.log(`Error: ${err.stack}`);
        }
    }

    async handleOpenEdit(id: number) {
        if (id) {
            var result = await this._getDataEdit(id);
            this.setState({ modalShow: true, title: 'Chỉnh sửa ' + result.data.name, productGroup: result.data, isEdit: true, formErrors: {} });
        }
    }
    handleOpen() {
        this.setState({ modalShow: true, formErrors: {} });
    }
    handleClose() {
        this.setState({ modalShow: false, productGroup: {} as ProductGroupModel, formErrors: {} });
    }
    handleSearch(event) {
        this.setState({ search: event.target.value });
    }
    async handleButtonSearch(event) {
        await this._handleLoadData(1);
        this.setState({ isShowAlertSeach: true });
    }

    render() {
        let dataTable = this.renderTable(this.state.groups);
        let renderPaging = this.state.groups.length > 0 ? this.renderPaging() : null;

        return (
            <div className="content-wapper">
                <div className="row">
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
                {
                    this.state.search && this.state.isShowAlertSeach ?
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="alert alert-info text-center">
                                    Có {this.state.pagingModel.totalItems} kết quả cho <strong>{this.state.search}</strong>
                                </div>
                            </div>
                        </div> : null
                }
                <div className="table-responsive p-relative">
                    {dataTable}
                    {this.state.isLoadingTable ? <div className="icon-loading"></div> : null}
                </div>
                <div className="row">
                    {renderPaging}
                </div>
                <ProductGroupEdit
                    isShow={this.state.modalShow}
                    handleClose={this.handleClose.bind(this)}
                    handleFormSubmit={this.handleFormSubmit.bind(this)}
                    onFieldValueChange={this.onFieldValueChange.bind(this)}
                    title={this.state.title}
                    productGroup={this.state.productGroup}
                    formErrors={this.state.formErrors} 
                    isEdit={this.state.isEdit} />
            </div>
        );
    }

    private renderTable(groups: ProductGroupModel[]) {
        return (
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Mã</th>
                        <th>Tên ngành hàng</th>
                        <th>Ghi chú</th>
                        <th className="th-sm-2"></th>
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
                                    <td>{group.description}</td>
                                    <td><a className="cursor-pointer" onClick={() => this.handleOpenEdit(group.id)}>Sửa</a></td>
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

