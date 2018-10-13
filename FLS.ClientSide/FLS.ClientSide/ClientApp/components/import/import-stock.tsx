import * as React from "react";
import { NavLink } from "react-router-dom";
import { RouteComponentProps } from 'react-router';
import { LabeledSelect, LabeledInput, LabeledTextArea } from "../shared/input/labeled-input";
import * as Moment from 'moment';
import { CacheAPI } from "../../api-callers/cache";
import { _HDateTime, _HArray, _HNumber, _HString } from "../../handles/handles";
import { ProductModel } from "../../models/product";
import PropTypes from 'prop-types';
import { ImportStockModel, CostsModel } from "../../models/import-stock";
import { IdNameModel } from "../../models/shared";
import { ProductSimpleSearch } from "../product/product-simple-search";
import { SupplierSimpleSearch } from "../supplier/supplier-simple-search";
import { SupplierModel } from "../../models/supplier";
import { StockReceiveDocketModel } from "../../models/stock-receive-docket";
import { ImportStockSupplierModel } from "../../models/import-stock-supplier";
import { ExpenditureDocketDetailModel } from "../../models/expenditure-docket-detait";
import { StockReceiveDocketDetailModel } from "../../models/stock_receive_docket_detail";
import { Button, Glyphicon } from "react-bootstrap";
import LabeledSingleDatePicker from "../shared/date-time/labeled-single-date-picker";
import { ImportAPICaller } from "../../api-callers/import";
import { FormatedInput } from "../shared/input/formated-input";

interface ImportStockStates {
    receiveDocket: StockReceiveDocketModel;
    suppliers: ImportStockSupplierModel[];
    paySlipDetails: ExpenditureDocketDetailModel[];
    warehouses: IdNameModel[],
    stockReceiveDocketTypes: IdNameModel[],
    paySlipTypes: IdNameModel[],
    errorList: {},
    costs: CostsModel
}
export class ImportStocks extends React.Component<RouteComponentProps<{}>, ImportStockStates> {
    constructor(props: any) {
        super(props)
        this.state = {
            receiveDocket: new StockReceiveDocketModel(),
            suppliers: [] as ImportStockSupplierModel[],
            paySlipDetails: [] as ExpenditureDocketDetailModel[],
            warehouses: [],
            stockReceiveDocketTypes: [],
            paySlipTypes: [],
            errorList: {},
            costs: new CostsModel()
        }
    }
    async componentDidMount() {
        var warehouses = await CacheAPI.Warehouse();
        var stockReceiveDocketTypes = await CacheAPI.StockReceiveDocketType();
        var paySlipTypes = await CacheAPI.PayslipType();
        this.setState({ warehouses: warehouses.data, stockReceiveDocketTypes: stockReceiveDocketTypes.data, paySlipTypes: paySlipTypes.data });
    }
    static contextTypes = {
        ShowGlobalMessage: PropTypes.func,
        ShowGlobalMessageList: PropTypes.func,
    }
    onDocketFieldChange(model: any) {
        const nextState = {
            ...this.state,
            receiveDocket: {
                ...this.state.receiveDocket,
                [model.name]: model.value,
            }
        };
        this.setState(nextState);
    }
    onProductFieldChange(model: any) {
        //
    }
    onChooseSupplier(supplier: SupplierModel) {
        let { suppliers } = this.state;
        let model = new ImportStockSupplierModel();
        let index = suppliers.findIndex(d => d.supplierBranchId == supplier.id);
        if (index >= 0) {
            model = suppliers[index];
            suppliers[index] = model;
        } else {
            model.supplierBranchId = supplier.id;
            model.supplierBranchName = supplier.name;
            suppliers.unshift(model);
        }
        this.setState({ suppliers: suppliers });
    }
    onRemoveSupplier(supplierId: number) {
        let { suppliers } = this.state;
        let index = suppliers.findIndex(s => s.supplierBranchId == supplierId);
        suppliers.splice(index, 1);
        this.setState({ suppliers: suppliers });
    }
    onChooseProduct(product: ProductModel, supplierId: number) {
        let { suppliers } = this.state;
        let supplier = new ImportStockSupplierModel();
        let supplierIndex = suppliers.findIndex(s => s.supplierBranchId == supplierId);
        if (supplierIndex >= 0)
            supplier = suppliers[supplierIndex];

        let detail = new StockReceiveDocketDetailModel();
        detail.unitPrice = 0;
        let index = supplier.receiveDocketDetails.findIndex(d => d.productId == product.id);
        if (index >= 0) {
            detail = supplier.receiveDocketDetails[index];
            detail.quantity = Number(detail.quantity) + 1;
            detail.amount = detail.quantity * detail.unitPrice;
            detail.vat = ((detail.quantity * detail.unitPrice) * detail.vatPercent) / 100;
            detail.totalAmount = (detail.quantity * detail.unitPrice) + detail.vat;
            supplier.receiveDocketDetails[index] = detail;
        } else {
            detail.productId = product.id;
            detail.productName = product.name;
            detail.productUnitId = product.defaultUnitId;
            detail.quantity = 1;
            detail.vatPercent = product.taxPercentId;
            supplier.receiveDocketDetails.push(detail);
        }
        suppliers[supplierIndex] = supplier;
        this.setState({ suppliers: suppliers });
    }
    onRemoveProduct(supplierId: number, productId: number) {
        let { suppliers } = this.state;
        let index = suppliers.findIndex(s => s.supplierBranchId == supplierId);
        let supplier = suppliers[index];
        let productIndex = supplier.receiveDocketDetails.findIndex(p => p.productId == productId);
        supplier.receiveDocketDetails.splice(productIndex, 1);
        suppliers[index] = supplier;
        this.setState({ suppliers: suppliers });
    }
    onImportStockSupplierChange(evt, _supplierId: number) {
        let suppliers = this.state.suppliers;
        var index = suppliers.findIndex(n => n.supplierBranchId == _supplierId);
        suppliers[index][evt.name] = evt.value;
        this.setState({ suppliers: suppliers });
    }
    onSupplierBillDateChange(evt, _supplierId) {
        let date = evt.value as Moment.Moment;
        let suppliers = this.state.suppliers;
        var index = suppliers.findIndex(n => n.supplierBranchId == _supplierId);
        suppliers[index][evt.name] = date;
        this.setState({ suppliers: suppliers });
    }
    onReceiveDocketDateChange(evt) {
        let date = evt.value as Moment.Moment;
        let receiveDocket = this.state.receiveDocket;
        receiveDocket[evt.name] = date;
        this.setState({ receiveDocket: receiveDocket });
    }

    onChangeRowInput(event, supplierId, index) {
        let suppliers = this.state.suppliers;
        var indexSupplier = suppliers.findIndex(n => n.supplierBranchId == supplierId);
        if (indexSupplier > -1 && index >= 0) {
            let products = suppliers[indexSupplier].receiveDocketDetails;
            let detail = products[index];
            detail[event.name] = event.value;
            
            if (event.name == "totalAmount") {
                detail.unitPrice = (event.value / detail.quantity);
                detail.vat = ((detail.quantity * detail.unitPrice) * detail.vatPercent) / 100;
            }
            else
            {
                detail.vat = ((detail.quantity * detail.unitPrice) * detail.vatPercent) / 100;
                detail.totalAmount = (detail.unitPrice * detail.quantity) + detail.vat;
            }
            products[index] = detail;
            this.setState({ suppliers: suppliers });
        }
    }
    onPaySlipFieldChange(model: any) {
        const nextState = {
            ...this.state,
            costs: {
                ...this.state.costs,
                [model.name]: model.value,
            }
        };
        this.setState(nextState);
    }
    addPaySlip() {
        let { costs } = this.state;
        if (costs.paySlipTypeId > 0 || !_HString.IsNullOrEmpty(costs.description)) {
            if (costs.amount < 0) {
                this.context.ShowGlobalMessage('error', 'Chi phí phải lớn hơn hoặc bằng 0');
                return;
            }
            var model = new ExpenditureDocketDetailModel();
            model.amount = costs.amount;
            model.totalAmount = costs.amount;
            model.expenditureTypeId = costs.paySlipTypeId;
            model.title = costs.description;
            var paySlipType = this.state.paySlipTypes.find(n => n.id == costs.paySlipTypeId);
            if (paySlipType) {
                model.expenditureTypeName = paySlipType.name;
            }
            //---------------------------------
            let { paySlipDetails } = this.state;
            paySlipDetails.unshift(model);

            this.setState({ paySlipDetails: paySlipDetails, costs: new CostsModel() });
        }
        else {
            this.context.ShowGlobalMessage('error', 'Chọn loại chi phí hoặc nhập nội dung chi phí');
        }
    }
    onRemovePaySlip(index: number) {
        let { paySlipDetails } = this.state;
        this.setState({ paySlipDetails: paySlipDetails.filter(m => m != paySlipDetails[index])});
    }
    validateImport() {
        let { receiveDocket, suppliers, paySlipDetails } = this.state;
        if (!receiveDocket.warehouseId) {
            this.context.ShowGlobalMessage('error', 'Xin chọn kho nhập');
            return false;
        }
        if (!suppliers || suppliers.length == 0) {
            this.context.ShowGlobalMessage('error', 'Xin chọn Nhà cung cấp hoặc sản phẩm cần nhập');
            return false;
        }
        return true;
    }
    async onCreateImportStock() {
        if (!this.validateImport())
            return;
        let { receiveDocket, paySlipDetails, suppliers } = this.state;
        var model = new ImportStockModel();
        model.receiveDocket = receiveDocket;
        model.suppliers = suppliers;
        model.paySlipDetails = paySlipDetails;
        model.receiveDocket.isActuallyReceived = true;
        let response = await ImportAPICaller.Create(model);
        if (!response.hasError && response.data) {
            this.props.history.push(this.props.location.pathname + '/' + response.data);
        }
        else
            this.context.ShowGlobalMessageList('error', response.errors);
    }
    renderSuppliers() {
        let { suppliers } = this.state;
        return suppliers.map((supplier, idx) => {
            return <div key={'splr-' + supplier.supplierBranchId}>
                <div className="panel panel-default panne-color">
                    <div className="panel-heading">
                        <div className="display-flex justify-content-between align-items-center">
                            <span><strong>{supplier.supplierBranchName}</strong></span>
                            <span onClick={() => this.onRemoveSupplier(supplier.supplierBranchId)} className="glyphicon glyphicon-trash cursor-pointer" aria-hidden="true"></span>
                        </div>
                    </div>
                    <div className="panel-body">
                        <div className="col-md-4">
                            <div className="panel panel-default mg-bt-15">
                                <div className="panel-heading">
                                    Thông tin hóa đơn
                                </div>
                                <div className="panel-body">
                                    <div className='col-sm-12'>
                                        <LabeledInput
                                            name={'billTemplateCode'}
                                            value={supplier.billTemplateCode}
                                            title={'Mẫu số hóa đơn'}
                                            placeHolder={'Mẫu số hóa đơn'}
                                            error={this.state.errorList['billTemplateCode']}
                                            valueChange={(e) => this.onImportStockSupplierChange(e, supplier.supplierBranchId)} />
                                    </div>
                                    <div className='col-sm-12'>
                                        <LabeledInput
                                            name={'billSerial'}
                                            value={supplier.billSerial}
                                            title={'Số hiệu hóa đơn'}
                                            placeHolder={'Số hiệu hóa đơn'}
                                            error={this.state.errorList['billSerial']}
                                            valueChange={(e) => this.onImportStockSupplierChange(e, supplier.supplierBranchId)} />
                                    </div>
                                    <div className='col-sm-12'>
                                        <LabeledInput
                                            name={'billCode'}
                                            value={supplier.billCode}
                                            title={'Số hóa đơn'}
                                            placeHolder={'Số hóa đơn'}
                                            error={this.state.errorList['billCode']}
                                            valueChange={(e) => this.onImportStockSupplierChange(e, supplier.supplierBranchId)} />
                                    </div>
                                    <div className='col-sm-12'>
                                        <LabeledSingleDatePicker
                                            name={'billDate'}
                                            title={'Ngày hóa đơn'}
                                            date={Moment()}
                                            dateChange={(e) => this.onSupplierBillDateChange(e, supplier.supplierBranchId)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="panel panel-default mg-0">
                                <div className="panel-heading">Sản phẩm</div>
                                <div className="panel-body">
                                    <div className='col-sm-12 mg-bt-15'>
                                        <ProductSimpleSearch onChooseProduct={(product) => this.onChooseProduct(product, supplier.supplierBranchId)} />
                                    </div>
                                    {
                                        supplier.receiveDocketDetails && supplier.receiveDocketDetails.length > 0 ?
                                            <div className='col-sm-12'>
                                                {this.renderProductsTable(supplier.supplierBranchId, supplier.receiveDocketDetails)}
                                            </div> : <div className='col-sm-12 text-center'>
                                                Chưa có sản phẩm nào được chọn
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        })
    }
    renderProductsTable(supplierId: number, docketDetails: StockReceiveDocketDetailModel[]) {
        let totalPrice = docketDetails.reduce((d, l) => d + (l.unitPrice * l.quantity + l.vat) , 0);
        return (
            <div className="table-responsive p-relative">
                <table className="table table-striped table-hover mg-0">
                    <thead>
                        <tr>
                            <th>Tên sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Đơn giá</th>
                            <th>% VAT</th>
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
                                            onValueChange={(e) => this.onChangeRowInput(e, supplierId, idx)}
                                        />
                                    </td>
                                    <td>
                                        <FormatedInput
                                            type="currency"
                                            className="form-control"
                                            min={0}
                                            name='unitPrice'
                                            value={detail.unitPrice}
                                            onValueChange={(e) => this.onChangeRowInput(e, supplierId, idx)}
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
                                            onValueChange={(e) => this.onChangeRowInput(e, supplierId, idx)}
                                        /></td>
                                    <td>
                                        <Button bsStyle='default' className='btn-sm'
                                            onClick={this.onRemoveProduct.bind(this, supplierId, detail.productId)}>
                                            <Glyphicon glyph='minus' />
                                        </Button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={5} className="text-right"><strong>Tổng tiền:</strong> </td>
                            <td colSpan={2}><strong>{_HNumber.FormatCurrency(totalPrice)}</strong></td>
                        </tr>

                    </tfoot>
                </table>
            </div>
        );
    }
    renderTabInfo() {
        return (
            <div id="info" className="tab-pane fade in active">
                <div className="panel panel-info">
                    <div className="panel-body">
                        <div className="col-md-4">
                            <LabeledSelect
                                name={'stockReceiveDocketTypeId'}
                                value={this.state.receiveDocket.stockReceiveDocketTypeId}
                                title={'Loại phiếu nhập'}
                                placeHolder={'Loại phiếu nhập'}
                                valueKey={'id'}
                                nameKey={'name'}
                                valueChange={this.onDocketFieldChange.bind(this)}
                                options={this.state.stockReceiveDocketTypes} />
                        </div>
                        <div className="col-md-4">
                            <LabeledSelect
                                name={'warehouseId'}
                                value={this.state.receiveDocket.warehouseId}
                                title={'Kho nhập'}
                                placeHolder={'Kho nhập'}
                                valueKey={'id'}
                                nameKey={'name'}
                                valueChange={this.onDocketFieldChange.bind(this)}
                                options={this.state.warehouses} />
                        </div>
                        <div className="col-md-4">
                            <LabeledSingleDatePicker
                                name={'receiveDate'}
                                title={'Ngày tạo phiếu'}
                                date={Moment()}
                                dateChange={(e) => this.onReceiveDocketDateChange(e)} />
                        </div>
                        <div className="col-md-12">
                            <LabeledTextArea
                                rows={1}
                                name={'description'}
                                value={this.state.receiveDocket.description}
                                title={'Ghi chú'}
                                placeHolder={'Ghi chú'}
                                error={this.state.errorList['description']}
                                valueChange={this.onDocketFieldChange.bind(this)} />
                        </div>
                    </div>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading">Nhà cung cấp</div>
                    <div className="panel-body">
                        <div className='col-sm-12'>
                            <SupplierSimpleSearch onChooseSupplier={(supplier) => this.onChooseSupplier(supplier)} />
                        </div>
                    </div>
                </div>
                {this.renderSuppliers()}
            </div>
        );
    }
    renderTabExpend() {
        let { paySlipTypes, paySlipDetails } = this.state;
        return <div id="expend" className="tab-pane fade">
            <div className="panel panel-info">
                <div className="panel-body">
                    <div className="mg-bt-15">
                        <div className="col-md-4">
                            <LabeledSelect
                                name={'paySlipTypeId'}
                                value={this.state.costs.paySlipTypeId}
                                title={'Loại chi phí'}
                                placeHolder={'Loại chi phí'}
                                valueKey={'id'}
                                nameKey={'name'}
                                valueChange={this.onPaySlipFieldChange.bind(this)}
                                options={paySlipTypes}
                            />
                        </div>
                        <div className="col-md-4">
                            <LabeledInput
                                name={'description'}
                                value={this.state.costs.description}
                                title={'Nội dung'}
                                placeHolder={'Nội dung'}
                                error={this.state.errorList['description']}
                                valueChange={this.onPaySlipFieldChange.bind(this)}
                            />
                        </div>
                        <div className="col-md-4">
                            <LabeledInput
                                inputType='currency'
                                name={'amount'}
                                value={this.state.costs.amount}
                                title={'Số tiền'}
                                placeHolder={'Số tiền'}
                                error={this.state.errorList['amount']}
                                valueChange={this.onPaySlipFieldChange.bind(this)}
                            />
                        </div>
                        <div className="col-sm-12">
                            <div className="text-right">
                                <button className="btn btn-primary" onClick={this.addPaySlip.bind(this)}>Thêm</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="table-responsive p-relative">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>Chi phí</th>
                                        <th>Nội dung chi phí</th>
                                        <th>Số tiền (đã gồm VAT)</th>
                                        <th className="th-sm-1"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paySlipDetails.length > 0 ?
                                        paySlipDetails.map((m, index) => {
                                            return <tr key={index}>
                                                <td>{m.expenditureTypeName}</td>
                                                <td>{m.title}</td>
                                                <td>{_HNumber.FormatCurrency(m.totalAmount)}</td>
                                                <td><Button bsStyle="default" className="btn-sm" onClick={(e) => this.onRemovePaySlip(index)}><Glyphicon glyph="minus" /></Button></td>
                                            </tr>
                                        }) : <tr>
                                            <td className="text-center" colSpan={4}>Chưa có chi phí nào</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
    renderReview() {
        let productQuantity = 0;
        let productTotalAmount = 0;
        let expendQuantity = 0;
        let expendTotalAmount = 0;

        let { suppliers, paySlipDetails } = this.state;
        suppliers.forEach((item) => {
            productQuantity += item.receiveDocketDetails.reduce((d, l) => d + (Number(l.quantity)), 0);
            productTotalAmount += item.receiveDocketDetails.reduce((d, l) => d + (l.unitPrice * l.quantity + l.vat), 0);
        });

        expendQuantity = paySlipDetails.length;
        paySlipDetails.forEach((item) => {
            expendTotalAmount += Number(item.amount);
        });
       
        let totalAmount = productTotalAmount + expendTotalAmount;
        return <div className="mg-bt-15">
            <div className="row total-review">
                <div className="col-sm-3">
                    <div className="row">
                        <div className="col-xs-6">
                            <span>Số lượng sản phẩm: </span>
                        </div>
                        <div className="col-xs-6 text-right">
                            <span><strong>{_HNumber.FormatNumber(productQuantity)}</strong></span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-6">
                            <span>Tổng tiền sản phẩm:</span>
                        </div>
                        <div className="col-xs-6 text-right">
                            <span><strong>{_HNumber.FormatCurrency(productTotalAmount)}</strong></span>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="row">
                        <div className="col-xs-6">
                            <span>Chi phí đi kèm:</span>
                        </div>
                        <div className="col-xs-6 text-right">
                            <span><strong>{_HNumber.FormatNumber(expendQuantity)}</strong></span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-6">
                            <span>Tổng chi phí đi kèm:</span>
                        </div>
                        <div className="col-xs-6 text-right">
                            <span><strong>{_HNumber.FormatCurrency(expendTotalAmount)}</strong></span>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="row">
                        <div className="col-xs-6">
                            <span>Tổng tiền trên phiếu:</span>
                        </div>
                        <div className="col-xs-6 text-right">
                            <span><strong>{_HNumber.FormatCurrency(totalAmount)}</strong></span>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="row">
                        <div className="col-xs-12 text-right">
                            <button className="btn btn-default mg-r-15">Hủy</button>
                            <button className="btn btn-primary" onClick={() => this.onCreateImportStock()}>Tạo phiếu</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
    render() {
        return (
            //<UnderConstructor /> ||
            <div className="content-wapper">
                <div className="row">
                    <div className="col-sm-12">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><NavLink to="/">Trang chủ</NavLink></li>
                                <li className="breadcrumb-item"><NavLink to="/quanlynhap">Quản lý nhập</NavLink></li>
                                <li className="breadcrumb-item active" aria-current="page">Nhập mua hàng hóa thông thường</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <ul className="nav nav-tabs">
                    <li className="active"><a data-toggle="tab" href="#info">Thông tin phiếu nhập</a></li>
                    <li><a data-toggle="tab" href="#expend">Chi phí nhập</a></li>
                </ul>
                <div className="tab-content">
                    {this.renderTabInfo()}
                    {this.renderTabExpend()}
                </div>
                {this.renderReview()}
            </div>
        );
    }
}