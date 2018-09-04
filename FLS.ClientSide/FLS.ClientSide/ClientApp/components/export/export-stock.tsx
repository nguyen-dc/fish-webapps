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
import LabeledSingleDatePicker from "../shared/date-time/labeled-single-date-picker";
import { Glyphicon, Button } from "react-bootstrap";

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
        this.setState({ receipt: receipt });
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
    onRemoveProduct(productId: number) {
        let { docketDetails } = this.state;
        let choseProducts = docketDetails.filter(i => i.productId !== productId);
        this.setState({ docketDetails: choseProducts });
    }
    onChangeQuantity(productId: number) {
       
    }

    renderTabInfo() {
        return (
            <div id="info" className="tab-pane fade in active">
                <div className="panel panel-info">
                    <div className="panel-body">
                        <div className="col-md-4">
                            <LabeledSelect
                                name={'input'}
                                value={0}
                                title={'Loại phiếu xuất'}
                                placeHolder={'Loại phiếu xuất'}
                                valueKey={'id'}
                                nameKey={'name'}
                                options={this.state.stockIssueDocketTypes} />
                        </div>
                        <div className="col-md-4">
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
                            <LabeledSingleDatePicker
                                name={'fromDate'}
                                title={'Ngày tạo phiếu'}
                                date={Moment()} />
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
            <div className="row">
                <div className="col-sm-4">
                    <div className="panel panel-info">
                        <div className="panel-body">
                            <div className="col-sm-12">
                                <CustomerSimpleSearch onChooseCustomer={(customer) => this.onChooseCustomer(customer)} />
                                {receipt.partnerId ?
                                    (
                                        <div className="row">
                                            <div className='col-sm-12 mg-bt-15 mg-t-15 line-customer'>Khách hàng đã chọn: <strong>{receipt.partnerName}</strong></div>
                                            <div className='col-sm-12'>
                                                <LabeledInput
                                                    name={'name'}
                                                    value={''}
                                                    title={'Mẫu số hóa đơn'}
                                                    placeHolder={'Mẫu số hóa đơn'}
                                                    error={this.state.errorList['name']}
                                                    valueChange={this.onDocketFieldChange.bind(this)} />
                                            </div>
                                            <div className='col-sm-12'>
                                                <LabeledInput
                                                    name={'name'}
                                                    value={''}
                                                    title={'Số hiệu hóa đơn'}
                                                    placeHolder={'Số hiệu hóa đơn'}
                                                    error={this.state.errorList['name']}
                                                    valueChange={this.onDocketFieldChange.bind(this)} />
                                            </div>
                                            <div className='col-sm-12'>
                                                <LabeledInput
                                                    name={'name'}
                                                    value={''}
                                                    title={'Số hóa đơn'}
                                                    placeHolder={'Số hóa đơn'}
                                                    error={this.state.errorList['name']}
                                                    valueChange={this.onDocketFieldChange.bind(this)} />
                                            </div>
                                            <div className='col-sm-12'>
                                                <LabeledSingleDatePicker
                                                    name={'fromDate'}
                                                    title={'Ngày hóa đơn'}
                                                    date={Moment()} />
                                            </div>
                                        </div>
                                    ) : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-8">
                    <div className="panel panel-info">
                        <div className="panel-body">
                            <div className="col-sm-12">
                                <ProductSimpleSearch onChooseProduct={(product) => this.onChooseProduct(product)} />
                                {
                                    docketDetails && docketDetails.length > 0 ?
                                        <div className='mg-bt-15'>
                                            {this.renderProductsTable()}
                                        </div> : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

    renderProductsTable() {
        let { docketDetails } = this.state;
        return (
            <div className="table-responsive p-relative mg-t-15">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Tên sản phẩm</th>
                            <th>Đơn giá</th>
                            <th>Số lượng</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            docketDetails.map((detail, idx) => {
                                return <tr key={idx}>
                                    <td>{detail.productName}</td>
                                    <td><input className="form-control" value={''} placeholder="Đơn giá" onChange={() => this.onChangeQuantity(detail.productId)} /></td>
                                    <td><input className="form-control" value={1} onChange={() => this.onChangeQuantity(detail.productId)} /></td>
                                    <td className="text-right">
                                        <Button bsStyle="default" className="btn-sm" onClick={() => this.onRemoveProduct(detail.productId)}>
                                            <Glyphicon glyph="minus" /></Button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td className="text-right"><strong>Tổng tiền:</strong> </td>
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