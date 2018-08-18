import * as React from "react";
import { Link } from "react-router-dom";
import { RouteComponentProps } from 'react-router';
import { ProductSubGroupEdit } from "./product-subgroup-edit";
import { Button } from "react-bootstrap";
import { Content } from "react-bootstrap/lib/Tab";
import * as ReactDOM from "react-dom";
import Pagination from "react-js-pagination";
import { PaginateModel } from "../../models/shared";
import { ProductSubGroupModel } from "../../models/product-subgroup";
import Notifications, { notify } from 'react-notify-toast';
let apiUrl = 'api/product-subgroups/';

interface productSubGroupsState {
    groups: ProductSubGroupModel[];
    modalShow: boolean;
    isLoadingTable: boolean;
    isShowAlertSeach: boolean;
    search: string;
    filterTitle: string;
    filterValue: string | number;
    //model modal
    title: string;
    productGroups: any;
    productSubGroup: ProductSubGroupModel;
    isEdit: boolean;
    formErrors: {};
    pagingModel: PaginateModel;
}

export class ProductSubGroups extends React.Component<RouteComponentProps<{}>, productSubGroupsState> {
    constructor(props: any) {
        super(props)
        
        this.state = {
            groups: [],
            isLoadingTable: true,
            isShowAlertSeach: false,
            modalShow: false,
            search: '',
            filterTitle: 'Tất cả',
            filterValue: 0,
            title: 'Thêm mới nhóm hàng',
            productSubGroup: new ProductSubGroupModel(),
            isEdit: false,
            formErrors: {},
            productGroups: [],
            pagingModel: new PaginateModel()
        };
    }

    async handlePageChange(event: any) {
        this.setState({ isLoadingTable: true });
        await this._handleLoadData(event);
    }

    async componentDidUpdate(prevProps, prevState) {
        var filterValue = prevState.filterValue;
        if (filterValue !== this.state.filterValue) {
            await this._handleLoadData(1);
        }
    }

    async componentWillMount() {
        await this._handleLoadData(this.state.pagingModel.currentPage);
        await this._loadDataCache();
    }

    private async _handleLoadData(page: number) {
        var result = await this._getData(page);
        var paging = new PaginateModel();
        paging.currentPage = result.data.currentPage;
        paging.totalItems = result.data.totalItems;
        this.setState({ groups: result.data.items, isLoadingTable: false, pagingModel: paging });
    }

    private async _loadDataCache() {
        var productGroups = await this._getProductGroup();
        this.setState({ productGroups: productGroups.data });
    }

    private async _getData(page: number) {
        try {
            var apiFetch = apiUrl;
            if (this.state.filterValue) {
                apiFetch = "api/product-groups/" + this.state.filterValue + "/subgroups";
            }
            let request = await fetch(apiFetch, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Page: page,
                    PageSize: this.state.pagingModel.pageSize,
                    Key: this.state.search,
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

    //modal
    private async _create() {
        var myHeaders = new Headers({
            "Content-Type": "application/json"
        });
        var request = await fetch(apiUrl+'add', {
            method: "POST",
            body: JSON.stringify(this.state.productSubGroup),
            headers: myHeaders
        });
        var result = await request.json();
        if (result.isSuccess) {
            this.setState({ modalShow: false });
            notify.show("Tạo mới thành công!", "success", 1000);
            await this._handleLoadData(1);
        }
        else {
            notify.show(result.message,"error",1000);
        }
    }

    private async _edit() {
        var myHeaders = new Headers({
            "Content-Type": "application/json"
        });
        var request = await fetch(apiUrl + this.state.productSubGroup.id + '/modify', {
            method: "PUT",
            body: JSON.stringify(this.state.productSubGroup),
            headers: myHeaders
        });
        var result = await request.json();
        if (result.isSuccess) {
            this.setState({ modalShow: false });
            notify.show('Cập nhật thành công!', "success", 1000);
            await this._handleLoadData(1);
        }
        else {
            notify.show(result.message, "error", 1000);
        }
    }

    private onFieldValueChange(fieldName: string, value: string) {
        const nextState = {
            ...this.state,
            productSubGroup: {
                ...this.state.productSubGroup,
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
        if (this.state.productSubGroup.name == "") {
            errors['name'] = 'Tên nhóm hàng không được bỏ trống';
        }

        return errors;
    }

    private async _getDataEdit(id: number) {
        try {
            let request = await fetch(apiUrl + id);
            return await request.json();
        }
        catch (err) {
            console.log(`Error: ${err.stack}`);
        }
    }

    async handleOpenEdit(id: number) {
        if (id) {
            var result = await this._getDataEdit(id);
            this.setState({ modalShow: true, title: 'Chỉnh sửa ' + result.data.name, productSubGroup: result.data, isEdit: true, formErrors: {} });
        }
    }

    handleSearch(event) {
        this.setState({ search: event.target.value});
    }

    async handleButtonSearch(event) {
        await this._handleLoadData(1);
        this.setState({ isShowAlertSeach: true });
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
        this.setState({ modalShow: false, productSubGroup: {} as ProductSubGroupModel, formErrors: {} });
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
                        <div className="col-md-12">
                                <div className="alert alert-success text-center">
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
                <ProductSubGroupEdit
                    isShow={this.state.modalShow}
                    handleClose={this.handleClose.bind(this)}
                    handleFormSubmit={this.handleFormSubmit.bind(this)}
                    onFieldValueChange={this.onFieldValueChange.bind(this)}
                    title={this.state.title}
                    productSubGroup={this.state.productSubGroup}
                    formErrors={this.state.formErrors}
                    isEdit={this.state.isEdit}
                    options={this.state.productGroups}
                />
            </div>
        );
    }

    private renderTable(groups: ProductSubGroupModel[]) {
        return (
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Mã</th>
                        <th>Tên nhóm hàng</th>
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

