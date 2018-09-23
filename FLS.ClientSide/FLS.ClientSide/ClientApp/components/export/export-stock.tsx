import * as React from "react";
import { NavLink } from "react-router-dom";
import { RouteComponentProps } from 'react-router';
import { LabeledSelect, LabeledInput, LabeledTextArea } from "../shared/input/labeled-input";
import * as Moment from 'moment';
import { CacheAPI } from "../../api-callers/cache";
import { _HDateTime, _HArray, _HNumber, _HObject } from "../../handles/handles";
import { ProductModel } from "../../models/product";
import { ExportStockModel } from "../../models/export-stock";
import { StockIssueDocketModel } from "../../models/stock-issue-docket";
import { StockIssueDocketDetailModel } from "../../models/stock_issue_docket_detail";
import { ExpenditureDocketModel } from "../../models/expenditure-docket";
import { IdNameModel, ApiResponse } from "../../models/shared";
import { ProductSimpleSearch } from "../product/product-simple-search";
import { CustomerSimpleSearch } from "../customer/customer-simple-search";
import { CustomerModel } from "../../models/customer";
import LabeledSingleDatePicker from "../shared/date-time/labeled-single-date-picker";
import { Glyphicon, Button } from "react-bootstrap";
import { FormatedInput } from "../shared/input/formated-input";
import { ExportAPICaller } from "../../api-callers/export";

interface ExportStockStates {
    issueDocket: StockIssueDocketModel,
    docketDetails: StockIssueDocketDetailModel[],
    receipt: ExpenditureDocketModel,
    warehouses: IdNameModel[],
    stockIssueDocketTypes: IdNameModel[],
    errorList: {},
    totalAmount: number
}
export class ExportStocks extends React.Component<RouteComponentProps<{}>, ExportStockStates> {
    constructor(props: any) {
        super(props)
        this.state = {
            //model: new ExportStockModel(),
            issueDocket: new StockIssueDocketModel(),
            docketDetails: [] as StockIssueDocketDetailModel[],
            receipt: new ExpenditureDocketModel(),
            errorList: {},
            warehouses: [],
            stockIssueDocketTypes: [],
            totalAmount: 0
        }
    }

    async componentDidMount() {
        var warehouses = await CacheAPI.Warehouse();
        var stockIssueDocketTypes = await CacheAPI.StockIssueDocketType();
        this.setState({ warehouses: warehouses.data, stockIssueDocketTypes: stockIssueDocketTypes.data });
    }
    static contextTypes = {
        ShowGlobalMessage: React.PropTypes.func,
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
    onDocketFieldDateChange(model: any) {
        let date = model.value as Moment.Moment;
        const nextState = {
            ...this.state,
            issueDocket: {
                ...this.state.issueDocket,
                [model.name]: date.toDate(),
            }
        };
        this.setState(nextState);
    }
    onReceiptFieldChange(model: any) {
        const nextState = {
            ...this.state,
            receipt: {
                ...this.state.receipt,
                [model.name]: model.value,
            }
        };
        this.setState(nextState);
    }
    onFieldDateChange(model: any) {
        let date = model.value as Moment.Moment;
        const nextState = {
            ...this.state,
            receipt: {
                ...this.state.receipt,
                [model.name]: date.toDate(),
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
            detail.quantity = _HNumber.Sum(detail.quantity, 1);
            detail.totalAmount = detail.quantity * detail.amount;
            docketDetails[index] = detail;

        } else {
            detail.productId = product.id;
            detail.productName = product.name;
            detail.productUnitId = product.defaultUnitId;
            detail.quantity = 1;
            detail.amount = 0;
            detail.totalAmount = 0;
            docketDetails.push(detail);
        }
        this.setState({ docketDetails: docketDetails });
        this.sumTotalAmount(docketDetails);
    }
    onRemoveProduct(productId: number) {
        let { docketDetails } = this.state;
        let choseProducts = docketDetails.filter(i => i.productId !== productId);
        this.setState({ docketDetails: choseProducts });
        this.sumTotalAmount(choseProducts);
    }
    onChangeDetail(model, index) {
        let { docketDetails } = this.state;
        if (index >= 0) {
            let detail = docketDetails[index];
            detail[model.name] = model.value;
            detail.totalAmount = detail.amount * detail.quantity;
            docketDetails[index] = detail;
        } 
        this.setState({ docketDetails: docketDetails });
        this.sumTotalAmount(docketDetails);
    }
    onRemoveCustomer() {
        let { receipt } = this.state;
        receipt.partnerId = 0;
        receipt.partnerName = "";
        this.setState({ receipt: receipt });
    }
    async onCreateExportStock() {
        if (!this.validateExport())
            return;
        let { receipt, docketDetails, issueDocket } = this.state;
        var model = new ExportStockModel();
        model.receipt = receipt;
        model.docketDetails = docketDetails;
        model.issueDocket = issueDocket;
        let response = await ExportAPICaller.Create(model);
        if (response.ok) {
            let result = await response.json() as ApiResponse;
            if (result.isSuccess && result.data) {
                this.props.history.push(this.props.location.pathname + '/' + result.data);
            }
            /// else thông báo lỗi
        }
    }
    sumTotalAmount(docketDetails: StockIssueDocketDetailModel[]) {
        let totalAmount = 0;
        totalAmount = _HArray.Sum(docketDetails, 'totalAmount');
        this.setState({ totalAmount: totalAmount });
    }
    validateExport() {
        let { receipt, docketDetails, issueDocket } = this.state;
        if (!issueDocket.warehouseId) {
            this.context.ShowGlobalMessage('error', 'Xin chọn kho xuất');
            return false;
        }
        return true;
    }
    renderTabInfo() {
        let { issueDocket, warehouses, stockIssueDocketTypes } = this.state;
        return (
            <div id="info" className="tab-pane fade in active">
                <div className="panel panel-info">
                    <div className="panel-body">
                        <div className="col-md-4">
                            <LabeledSelect
                                name={'stockIssueDocketTypeId'}
                                value={issueDocket.stockIssueDocketTypeId}
                                title={'Loại phiếu xuất'}
                                placeHolder={'Loại phiếu xuất'}
                                valueKey={'id'}
                                nameKey={'name'}
                                options={stockIssueDocketTypes}
                                valueChange={this.onDocketFieldChange.bind(this)} />
                        </div>
                        <div className="col-md-4">
                            <LabeledSelect
                                name={'warehouseId'}
                                value={issueDocket.warehouseId}
                                title={'Kho xuất'}
                                placeHolder={'Kho xuất'}
                                valueKey={'id'}
                                nameKey={'name'}
                                options={warehouses}
                                valueChange={this.onDocketFieldChange.bind(this)} />
                        </div>
                        <div className="col-md-4">
                            <LabeledSingleDatePicker
                                name={'expendDate'}
                                title={'Ngày tạo phiếu'}
                                date={Moment()}
                                dateChange={this.onReceiptFieldChange.bind(this)} />
                        </div>
                        <div className="col-sm-12">
                            <LabeledTextArea
                                rows={1}
                                name={'description'}
                                value={issueDocket.description}
                                title={'Ghi chú'}
                                placeHolder={'Ghi chú'}
                                valueChange={this.onDocketFieldChange.bind(this)} />
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
                <div className="col-md-4">
                    <div className="panel panel-info">
                        <div className="panel-body">
                            <div className="col-sm-12">
                                <CustomerSimpleSearch onChooseCustomer={(customer) => this.onChooseCustomer(customer)} />
                                {receipt.partnerId ?
                                    (
                                        <div className="row">
                                            <div className='col-sm-12 mg-bt-15 mg-t-15 line-customer display-flex justify-content-between'>
                                                <span>
                                                    Khách hàng đã chọn: <strong>{receipt.partnerName}</strong>
                                                </span>
                                                <span onClick={() => this.onRemoveCustomer()} className="glyphicon glyphicon-trash cursor-pointer" aria-hidden="true"></span>
                                            </div>
                                            <div className='col-sm-12'>
                                                <LabeledInput
                                                    name={'billTemplateCode'}
                                                    value={this.state.receipt.billTemplateCode}
                                                    title={'Mẫu số hóa đơn'}
                                                    placeHolder={'Mẫu số hóa đơn'}
                                                    error={this.state.errorList['billTemplateCode']}
                                                    valueChange={this.onReceiptFieldChange.bind(this)} />
                                            </div>
                                            <div className='col-sm-12'>
                                                <LabeledInput
                                                    name={'billSerial'}
                                                    value={this.state.receipt.billSerial}
                                                    title={'Số hiệu hóa đơn'}
                                                    placeHolder={'Số hiệu hóa đơn'}
                                                    error={this.state.errorList['billSerial']}
                                                    valueChange={this.onReceiptFieldChange.bind(this)} />
                                            </div>
                                            <div className='col-sm-12'>
                                                <LabeledInput
                                                    name={'billCode'}
                                                    value={this.state.receipt.billCode}
                                                    title={'Số hóa đơn'}
                                                    placeHolder={'Số hóa đơn'}
                                                    error={this.state.errorList['billCode']}
                                                    valueChange={this.onReceiptFieldChange.bind(this)} />
                                            </div>
                                            <div className='col-sm-12'>
                                                <LabeledSingleDatePicker
                                                    name={'billDate'}
                                                    title={'Ngày hóa đơn'}
                                                    date={Moment()}
                                                    dateChange={this.onFieldDateChange.bind(this)} />
                                            </div>
                                        </div>
                                    ) : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="panel panel-info">
                        <div className="panel-body">
                            <div className="col-sm-12">
                                <ProductSimpleSearch
                                    onChooseProduct={(product) => this.onChooseProduct(product)}
                                    stayPop={true} />
                                {
                                    docketDetails && docketDetails.length > 0 ?
                                        <div>
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
                <table className="table table-striped table-hover mg-0">
                    <thead>
                        <tr>
                            <th>Tên sản phẩm</th>
                            <th>Đơn vị tính</th>
                            <th>Đơn giá</th>
                            <th>Số lượng</th>
                            <th>Thành tiền</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            docketDetails.map((detail, idx) => {
                                return <tr key={idx}>
                                    <td>{detail.productName}</td>
                                    <td>{detail.productUnitId}</td>
                                    <td>
                                        <FormatedInput
                                            type="currency"
                                            className="form-control"
                                            min={0}
                                            name='unitPrice'
                                            value={detail.unitPrice}
                                            onValueChange={(m) => this.onChangeDetail(m, idx)}
                                        />
                                    </td>
                                    <td>
                                        <FormatedInput
                                            type="number"
                                            className="form-control max-w-100"
                                            min={1}
                                            name='quantity'
                                            value={detail.quantity}
                                            onValueChange={(m) => this.onChangeDetail(m, idx)}
                                        />
                                    </td>
                                    <td>{_HNumber.FormatCurrency(detail.totalAmount)}</td>
                                    <td className="text-right">
                                        <Button bsStyle="default" className="btn-sm" onClick={() => this.onRemoveProduct(detail.productId)}>
                                            <Glyphicon glyph="glyphicon glyphicon-trash cursor-pointer" /></Button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={4} className="text-right">Tổng tiền:</td>
                            <td colSpan={2}><strong>{_HNumber.FormatCurrency(this.state.totalAmount)}</strong></td>
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
                            <button className="btn btn-primary" onClick={() => this.onCreateExportStock()}>Tạo phiếu</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}