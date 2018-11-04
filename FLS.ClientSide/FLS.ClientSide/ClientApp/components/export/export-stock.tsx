import * as React from "react";
import { NavLink } from "react-router-dom";
import { RouteComponentProps } from 'react-router';
import { LabeledSelect, LabeledInput, LabeledTextArea } from "../shared/input/labeled-input";
import * as Moment from 'moment';
import { CacheAPI } from "../../api-callers/cache";
import { _HDateTime, _HArray, _HNumber, _HObject } from "../../handles/handles";
import PropTypes from 'prop-types';
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
import { SummaryText } from "../shared/view-only";

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
        ShowGlobalMessage: PropTypes.func,
        ShowGlobalMessageList: PropTypes.func,
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
            detail.quantity = Number(detail.quantity) + 1;
            detail.amount = detail.quantity * detail.unitPrice;
            detail.vat = ((detail.quantity * detail.unitPrice) * detail.vatPercent) / 100;
            detail.totalAmount = (detail.quantity * detail.unitPrice) + detail.vat;
            docketDetails[index] = detail;

        } else {
            detail.productId = product.id;
            detail.productName = product.name;
            detail.productUnitId = product.defaultUnitId;
            detail.quantity = 1;
            detail.unitPrice = 0;
            detail.vat = 0;
            detail.vatPercent = product.taxPercent;
            docketDetails.push(detail);
        }
        this.setState({ docketDetails: docketDetails });
    }
    onRemoveProduct(productId: number) {
        let { docketDetails } = this.state;
        let choseProducts = docketDetails.filter(i => i.productId !== productId);
        this.setState({ docketDetails: choseProducts });
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
    }
    onChangeRowInput(event, index) {
        let products = this.state.docketDetails;
            let detail = products[index];
            detail[event.name] = event.value;

            if (event.name == "totalAmount") {
                detail.unitPrice = (event.value / _HNumber.Sum(100, detail.vatPercent) * 100 / detail.quantity);
                detail.vat = ((detail.quantity * detail.unitPrice) * detail.vatPercent) / 100;
            }
            else {
                detail.vat = ((detail.quantity * detail.unitPrice) * detail.vatPercent) / 100;
                detail.totalAmount = (detail.unitPrice * detail.quantity) + detail.vat;
        }
        products[index] = detail;
        this.setState({ docketDetails: products });
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
        if (!response.hasError && response.data) {
            this.props.history.push('/quanlyxuat/' + response.data);
        }
        else
            this.context.ShowGlobalMessageList('error', response.errors);
    }
    sumTotalAmount(docketDetails: StockIssueDocketDetailModel[]) {
        let totalAmount = 0;
        totalAmount = _HArray.Sum(docketDetails, 'totalAmount');
        this.setState({ totalAmount: totalAmount });
    }
    validateExport() {
        let { receipt, docketDetails, issueDocket } = this.state;
        if (!issueDocket.stockIssueDocketTypeId) {
            this.context.ShowGlobalMessage('error', 'Xin chọn loại phiếu xuất');
            return false;
        }
        if (!issueDocket.warehouseId) {
            this.context.ShowGlobalMessage('error', 'Xin chọn kho xuất');
            return false;
        }
        if (!docketDetails || docketDetails.length == 0) {
            this.context.ShowGlobalMessage('error', 'Xin chọn sản phẩm cần xuất');
            return false;
        }
        if (docketDetails.length > 0) {
            let filter = docketDetails.find(n => Number(n.amount) < 0);
            if (filter != null) {
                this.context.ShowGlobalMessage('error', 'Giá sản phẩm phải lớn hơn hoặc bằng 0');
                return false;
            }
            let filter1 = docketDetails.find(n => Number(n.quantity) < 0);
            if (filter1 != null) {
                this.context.ShowGlobalMessage('error', 'Số lượng sản phẩm không đúng');
                return false;
            }
        }
        return true;
    }
    renderTabInfo() {
        let { issueDocket, warehouses, stockIssueDocketTypes } = this.state;
        return (
            <div id="info" className="panel panel-info">
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
                                                <span onClick={() => this.onRemoveCustomer()} className="glyphicon glyphicon-remove cursor-pointer" aria-hidden="true"></span>
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
                                    stayPop={false} />
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
                            <th>Số lượng</th>
                            <th>Đơn giá</th>
                            <th>%VAT</th>
                            <th>VAT</th>
                            <th>Thành tiền</th>
                            <th className='th-sm-1'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            docketDetails.map((detail, idx) => {
                                return <tr key={'prdt-' + detail.productId}>
                                    <td>{detail.productName}</td>
                                    <td>
                                        <FormatedInput
                                            type="number"
                                            className="form-control max-w-100"
                                            min={1}
                                            name='quantity'
                                            value={detail.quantity}
                                            onValueChange={(e) => this.onChangeRowInput(e, idx)}
                                        />
                                    </td>
                                    <td>
                                        <FormatedInput
                                            type="currency"
                                            className="form-control"
                                            min={0}
                                            name='unitPrice'
                                            value={detail.unitPrice}
                                            onValueChange={(e) => this.onChangeRowInput(e, idx)}
                                        />
                                    </td>
                                    <td>
                                        {detail.vatPercent ? detail.vatPercent : 0} %
                                    </td>
                                    <td>
                                        {_HNumber.FormatCurrency(detail.vat ? detail.vat : 0)}
                                    </td>
                                    <td>
                                        <FormatedInput
                                            type="currency"
                                            className="form-control"
                                            min={0}
                                            name='totalAmount'
                                            value={detail.totalAmount}
                                            onValueChange={(e) => this.onChangeRowInput(e, idx)}
                                        /></td>
                                    <td>
                                        <Button bsStyle='default' className='btn-sm'
                                            onClick={this.onRemoveProduct.bind(this, detail.productId)}>
                                            <Glyphicon glyph='minus' />
                                        </Button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={5} className="text-right">Tổng tiền:</td>
                            <td colSpan={2}><strong>{_HNumber.FormatCurrency(this.state.totalAmount)}</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
    renderReview() {
        let productQuantity = 0;
        let productTotalAmount = 0;

        let { docketDetails } = this.state;
        productQuantity += docketDetails.reduce((d, l) => d + (Number(l.quantity)), 0);
        productTotalAmount += docketDetails.reduce((d, l) => d + (l.unitPrice * l.quantity + l.vat), 0);

        let totalAmount = productTotalAmount;
        return <div className="col-md-6 col-sm-8 col-xs-12 pull-right">
            <SummaryText title='Số lượng sản phẩm:' value={_HNumber.FormatNumber(productQuantity)} />
            <SummaryText title='Tổng tiền sản phẩm:' value={_HNumber.FormatCurrency(productTotalAmount)} />
            <SummaryText title='Tổng tiền trên phiếu:' value={_HNumber.FormatCurrency(totalAmount)} />
            <button className="btn btn-primary pull-right" onClick={() => this.onCreateExportStock()}>Tạo phiếu</button>
        </div>
    }
    render() {
        return (
            // <UnderConstructor /> ||
            <div className="content-wapper">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><NavLink to="/">Trang chủ</NavLink></li>
                        <li className="breadcrumb-item"><NavLink to="/quanlyxuat">Quản lý xuất</NavLink></li>
                        <li className="breadcrumb-item active" aria-current="page">Xuất bán hàng hóa thông thường</li>
                    </ol>
                </nav>
                <div>
                    {this.renderTabInfo()}
                    {this.renderCustomer()}
                </div>
                {this.renderReview()}
            </div>
        );
    }
}