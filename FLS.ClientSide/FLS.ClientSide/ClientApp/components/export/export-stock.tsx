import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { RouteComponentProps } from 'react-router';
import { LabeledSelect, LabeledInput } from "../shared/input/labeled-input";
import * as Moment from 'moment';
import { CacheAPI } from "../../api-callers/cache";
import { DateTimeHandle, ArrayHandle } from "../../handles/handles";
import { ProductSearch } from "../product/product-search";
import { EmptyRowMessage } from "../shared/view-only";
import { ProductTable } from "../product/product-table";
import { ProductModel } from "../../models/product";
import { ExportStockModel } from "../../models/export-stock";
import { StockIssueDocketModel } from "../../models/stock-issue-docket";
import { StockIssueDocketDetailModel } from "../../models/stock_issue_docket_detail";
import { ExpenditureDocketModel } from "../../models/expenditure-docket";
import { IdNameModel } from "../../models/shared";
import { ProductSimpleSearch } from "../product/product-simple-search";
import { CustomerSimpleSearch } from "../customer/customer-simple-search";
import { CustomerModel } from "../../models/customer";

interface ExportStockStates {
    model: ExportStockModel,
    issueDocket: StockIssueDocketModel,
    docketDetails: StockIssueDocketDetailModel[],
    receipt: ExpenditureDocketModel,
    warehouses: IdNameModel[],
    stockIssueDocketTypes: IdNameModel[],
    errorList: {},
}
export class ExportStocks extends React.Component<RouteComponentProps<{}>, ExportStockStates> {
    constructor(props: any) {
        super(props)
        this.state = {
            model: new ExportStockModel(),
            issueDocket: new StockIssueDocketModel(),
            docketDetails: [] as StockIssueDocketDetailModel[],
            receipt: new ExpenditureDocketModel(),
            errorList: {},
            warehouses: [],
            stockIssueDocketTypes: [],
        }
    }

    async componentWillMount() {
        var warehouses = await CacheAPI.Warehouse();
        var stockIssueDocketTypes = await CacheAPI.StockIssueDocketType();
        this.setState({ warehouses: warehouses.data, stockIssueDocketTypes: stockIssueDocketTypes.data });
    }

    onDocketFieldChange(model: any) {
        const nextState = {
            ...this.state,
            issueDocket: {
                ...this.state.issueDocket,
                [model.name]: model.value,
            }
        };
        this.setState(nextState);
    }
    onChooseCustomer(customer: CustomerModel) {
        let { receipt } = this.state;
        receipt.partnerId = customer.id;
        receipt.partnerName = customer.name;
        this.setState({ receipt: receipt});
    }
    onChooseProduct(product: ProductModel) {
        let { docketDetails } = this.state;
        let detail = new StockIssueDocketDetailModel();
        let index = docketDetails.findIndex(d => d.productId == product.id);
        if (index >= 0) {
            detail = docketDetails[index];
            detail.quantity = detail.quantity + 1;
            docketDetails[index] = detail;
        } else {
            detail.productId = product.id;
            detail.productName = product.name;
            detail.productUnitId = product.defaultUnitId;
            detail.quantity = 1;
            docketDetails.push(detail);
        }
        this.setState({ docketDetails: docketDetails });
    }
    renderTabInfo() {
        return (
            <div id="info" className="tab-pane fade in active">
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className="col-md-4">
                            <LabeledInput
                                name={'name'}
                                value={''}
                                title={'Mã phiếu xuất'}
                                placeHolder={'Mã phiếu xuất'}
                                error={this.state.errorList['name']}
                                readOnly={true}
                                valueChange={this.onDocketFieldChange.bind(this)} />
                            <LabeledSelect
                                name={'input'}
                                value={0}
                                title={'Loại phiếu xuất'}
                                placeHolder={'Loại phiếu xuất'}
                                valueKey={'id'}
                                nameKey={'name'}
                                options={this.state.stockIssueDocketTypes} />
                            <LabeledSelect
                                name={'warehouses'}
                                value={0}
                                title={'Kho xuất'}
                                placeHolder={'Kho xuất'}
                                valueKey={'id'}
                                nameKey={'name'}
                                options={this.state.warehouses} />
                        </div>
                        <div className="col-md-4">
                            <div className="form-group-custom mg-bt-15">
                                <label className="control-label  min-w-140 float-left" htmlFor="firstName">Khách hàng:</label>
                                <div>
                                    <input type="text" className="form-control" name="name" value="" placeholder="Khách hàng" />
                                </div>
                            </div>
                            <div className="form-group-custom mg-bt-15">
                                <label className="control-label  min-w-140 float-left" htmlFor="firstName">Địa chỉ:</label>
                                <div>
                                    <input type="text" className="form-control" name="name" value="" placeholder="Địa chỉ" />
                                </div>
                            </div>
                            <div className="form-group-custom mg-bt-15">
                                <label className="control-label  min-w-140 float-left" htmlFor="firstName">Số điện thoại:</label>
                                <div>
                                    <input type="text" className="form-control" name="name" value="" placeholder="Số điện thoại" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group-custom mg-bt-15">
                                <label className="control-label  min-w-140 float-left" htmlFor="firstName">Số hóa đơn:</label>
                                <div>
                                    <input type="text" className="form-control" name="name" value="" placeholder="Số hóa đơn" />
                                </div>
                            </div>
                            <div className="form-group-custom mg-bt-15">
                                <label className="control-label  min-w-140 float-left" htmlFor="firstName">Ngày hóa đơn:</label>
                                <div>
                                    <input type="text" className="form-control" name="name" value="" placeholder="Ngày hóa đơn" />
                                </div>
                            </div>
                            <LabeledInput
                                name={'datetime'}
                                value={'Ngày tạo phiếu'}
                                title={'Ngày tạo phiếu'}
                                placeHolder={'Ngày tạo phiếu'}
                                error={this.state.errorList['datetime']}
                                readOnly={true}
                                valueChange={this.onDocketFieldChange.bind(this)} />
                        </div>
                        <div className="col-sm-12">
                            <div className="form-group-custom mg-bt-15">
                                <label className="control-label  min-w-140 float-left" htmlFor="firstName">Ghi chú:</label>
                                <div>
                                    <input type="text" className="form-control" name="name" value="" placeholder="Ghi chú" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
    renderCustomer() {
        let { receipt, docketDetails } = this.state;
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <div className='row'>
                        <div className='col-sm-12 mg-bt-15'>
                            <CustomerSimpleSearch onChooseCustomer={(customer) => this.onChooseCustomer(customer)} />
                        </div>
                        { receipt.partnerId ? 
                            [<div className='col-sm-3 mg-bt-15'>{receipt.partnerName}</div>,
                            <div className='col-sm-3 mg-bt-15'>
                                <input
                                    className="form-control"
                                    type='input'
                                    placeholder='Mẫu số hóa đơn'
                                />
                            </div>,
                            <div className='col-sm-3 mg-bt-15'>
                                <input
                                    className="form-control"
                                    type='input'
                                    placeholder='Số hiệu hóa đơn'
                                />
                            </div>,
                            <div className='col-sm-3 mg-bt-15'>
                                <input
                                    className="form-control"
                                    type='input'
                                    placeholder='Số hóa đơn'
                                />
                            </div>
                            ] : null}
                    </div>
                </div>
                <div className="panel-body">
                    <div className='row'>
                        <div className='col-sm-12 mg-bt-15'>
                            <ProductSimpleSearch popPlacement={'top'} onChooseProduct={(product) => this.onChooseProduct(product)} />
                        </div>
                        {
                            docketDetails && docketDetails.length > 0 ?
                                <div className='col-sm-12 mg-bt-15'>
                                    {this.renderProductsTable()}
                                </div>: null
                        }
                    </div>
                </div>
            </div>
        )
    }

    renderProductsTable() {
        let { docketDetails } = this.state;
        return (
            <div className="table-responsive p-relative">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Tên sản phẩm</th>
                            <th>Số lượng</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            docketDetails.map((detail, idx) => {
                                return <tr>
                                    <td>{detail.productName}</td>
                                    <td>{detail.quantity}</td>
                                    <td><a className="cursor-pointer">Xóa</a></td>
                                </tr>
                            })
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={7} className="text-right"><strong>Tổng tiền:</strong> </td>
                            <td colSpan={2}><strong>34.800.000</strong></td>
                        </tr>

                    </tfoot>
                </table>
            </div>
        );
    }
    render() {
        return (
            <div className="content-wapper">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><NavLink to="/">Trang chủ</NavLink></li>
                        <li className="breadcrumb-item"><NavLink to="/quanlyxuat">Quản lý xuất</NavLink></li>
                        <li className="breadcrumb-item active" aria-current="page">Xuất bán hàng hóa thông thường</li>
                    </ol>
                </nav>
                {this.renderTabInfo()}
                {this.renderCustomer()}

                <div className="footer_total">
                    <div className="text-right">
                        <div className="text-right">
                            <button className="btn btn-danger mg-r-15">Hủy</button>
                            <button className="btn btn-primary">Cập nhật</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}