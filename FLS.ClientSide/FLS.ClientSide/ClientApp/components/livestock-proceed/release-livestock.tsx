import * as React from "react";
import { NavLink } from "react-router-dom";
import { RouteComponentProps } from 'react-router';
import { LabeledSelect, LabeledInput, LabeledTextArea } from "../shared/input/labeled-input";
import * as Moment from 'moment';
import { CacheAPI } from "../../api-callers/cache";
import { _HDateTime, _HArray, _HNumber, _HString } from "../../handles/handles";
import { ProductModel } from "../../models/product";
import PropTypes from 'prop-types';
import { ReleaseLivestockModel, ReleaseLivestockDocketModel, CostsModel } from "../../models/import-stock";
import { IdNameModel } from "../../models/shared";
import { ProductSimpleSearch } from "../product/product-simple-search";
import { SupplierSimpleSearch } from "../supplier/supplier-simple-search";
import { SupplierModel } from "../../models/supplier";
import { ImportStockSupplierModel } from "../../models/import-stock-supplier";
import { ExpenditureDocketDetailModel } from "../../models/expenditure-docket-detait";
import { Button, Glyphicon } from "react-bootstrap";
import LabeledSingleDatePicker from "../shared/date-time/labeled-single-date-picker";
import { FormatedInput } from "../shared/input/formated-input";
import { SummaryText } from "../shared/view-only";
import { StockReceiveDocketDetailModel } from "../../models/stock_receive_docket_detail";
import { LivestockProceedAPICaller } from "../../api-callers/livestock-proceed";

interface ReleaseLivestockStates {
    releaseDocket: ReleaseLivestockDocketModel;
    suppliers: ImportStockSupplierModel[];
    paySlipDetails: ExpenditureDocketDetailModel[];
    fishPonds: IdNameModel[],
    paySlipTypes: IdNameModel[],
    errorList: {},
    costs: CostsModel,
    paySlipLines: paySlipLineModel[],
}

class paySlipLineModel {
    paySlipTypeId: number = 0;
    description: string = '';
    amount: number = 0;
}

export class ReleaseLivestocks extends React.Component<RouteComponentProps<{}>, ReleaseLivestockStates> {
    constructor(props: any) {
        super(props)
        this.state = {
            releaseDocket: new ReleaseLivestockDocketModel(),
            suppliers: [] as ImportStockSupplierModel[],
            paySlipDetails: [] as ExpenditureDocketDetailModel[],
            fishPonds: [],
            paySlipTypes: [],
            errorList: {},
            costs: new CostsModel(),
            paySlipLines: [],
        }
    }
    itemRefs = {};
    async componentDidMount() {
        var fishPonds = await CacheAPI.FishPond();
        var paySlipTypes = await CacheAPI.PayslipType();
        this.setState({ fishPonds: fishPonds.data, paySlipTypes: paySlipTypes.data });
    }
    static contextTypes = {
        ShowGlobalMessage: PropTypes.func,
        ShowGlobalMessageList: PropTypes.func,
    }
    onDocketFieldChange(model: any) {
        const nextState = {
            ...this.state,
            releaseDocket: {
                ...this.state.releaseDocket,
                [model.name]: model.value,
            }
        };
        this.setState(nextState);
    }
    onChooseSupplier(supplier: SupplierModel) {
        let { suppliers } = this.state;
        let model = new ImportStockSupplierModel();
        let index = suppliers.findIndex(d => d.supplierBranchId == supplier.id);
        if (index >= 0) {
            this.itemRefs[supplier.id].scrollIntoView();
            return;
        } else {
            model.supplierBranchId = supplier.id;
            model.supplierBranchName = supplier.name;
            suppliers.push(model);
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
            detail.vatPercent = product.taxPercent;
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
    onReleaseLivestockSupplierChange(evt, _supplierId: number) {
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
        let releaseDocket = this.state.releaseDocket;
        releaseDocket[evt.name] = date;
        this.setState({ releaseDocket });
    }
    onChangeRowInput(event, supplierId, index) {
        let suppliers = this.state.suppliers;
        var indexSupplier = suppliers.findIndex(n => n.supplierBranchId == supplierId);
        if (indexSupplier > -1 && index >= 0) {
            let products = suppliers[indexSupplier].receiveDocketDetails;
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
            this.setState({ suppliers: suppliers });
        }
    }
    onPaySlipRowChange(model, index) {
        var { paySlipLines } = this.state;
        var payslip = paySlipLines[index];
        if (payslip) {
            if (model.name !== "description")
                payslip[model.name] = parseInt(model.value);
            else
                payslip[model.name] = model.value;

            this.setState({ paySlipLines: paySlipLines });
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
    addLinePaySlip() {
        var { paySlipLines } = this.state;
        paySlipLines.push(new paySlipLineModel());
        this.setState({ paySlipLines: paySlipLines });
    }
    removeLinePaySlip(index: number) {
        let { paySlipLines } = this.state;
        this.setState({ paySlipLines: paySlipLines.filter(m => m != paySlipLines[index]) });
    }
    validateImport(): boolean {
        let { releaseDocket, suppliers, paySlipLines } = this.state;
        if (!releaseDocket.fishPondWarehouseId) {
            this.context.ShowGlobalMessage('error', 'Xin chọn ao');
            return false;
        }
        if (!suppliers || suppliers.length == 0) {
            this.context.ShowGlobalMessage('error', 'Xin chọn Nhà cung cấp và con giống cần nhập');
            return false;
        }
        else {
            let iserror: boolean;
            suppliers.map((s) => {
                if (s.supplierBranchId != null && (!s.receiveDocketDetails || s.receiveDocketDetails.length == 0)) {
                    this.context.ShowGlobalMessage('error', `Chưa nhập con giống cho nhà cung cấp ${s.supplierBranchName}`);
                    iserror = true;
                    return;
                }
                let filter = s.receiveDocketDetails.find(n => Number(n.unitPrice) < 0);
                if (filter != null) {
                    this.context.ShowGlobalMessage('error', 'Giá con giống phải lớn hơn hoặc bằng 0');
                    iserror = true;
                    return;
                }
                let filter1 = s.receiveDocketDetails.find(n => Number(n.quantity) < 0);
                if (filter1 != null) {
                    this.context.ShowGlobalMessage('error', 'Số lượng con giống không đúng');
                    iserror = true;
                    return;
                }
            })
            if (iserror == true) return false;
        }
        if (paySlipLines.length > 0) {
            let filter = paySlipLines.find(n => Number(n.amount) < 0);
            if (filter != null) {
                this.context.ShowGlobalMessage('error', 'Chi phí phải lớn hơn hoặc bằng 0');
                return false;
            }
            let filter1 = paySlipLines.find(n => !n.paySlipTypeId && _HString.IsNullOrEmpty(n.description));
            if (filter1 != null) {
                this.context.ShowGlobalMessage('error', 'Chọn loại chi phí hoặc nhập nội dung chi phí');
                return false;
            }
        }
        return true;
    }
    async onCreateReleaseLivestock() {
        if (!this.validateImport())
            return;
        let { releaseDocket, suppliers, paySlipLines, paySlipTypes } = this.state;

        let paySlipDetails = [] as ExpenditureDocketDetailModel[];
        // payslip
        if (paySlipLines.length > 0) {
            paySlipLines.forEach(function (item) {
                var model = new ExpenditureDocketDetailModel();
                model.amount = item.amount;
                model.totalAmount = item.amount;
                model.expenditureTypeId = item.paySlipTypeId;
                model.title = item.description;
                var paySlipType = paySlipTypes.find(n => n.id == item.paySlipTypeId);
                if (paySlipType) {
                    model.expenditureTypeName = paySlipType.name;
                }
                paySlipDetails.push(model);
            });
        }

        var model = new ReleaseLivestockModel();
        model.livestockDocket = releaseDocket;
        model.suppliers = suppliers;
        model.paySlipDetails = paySlipDetails;
        model.livestockDocket.isActuallyReceived = true;
        let response = await LivestockProceedAPICaller.Release(model);
        if (!response.hasError && response.data) {
            this.props.history.push('/');
        }
        else
            this.context.ShowGlobalMessageList('error', response.errors);
    }
    renderSuppliers() {
        let { suppliers } = this.state;
        return suppliers.map((supplier) => {
            return <div key={supplier.supplierBranchId} ref={el => (this.itemRefs[supplier.supplierBranchId] = el)}>
                <div className="panel panel-info panne-color">
                    <div className="panel-heading">
                        <div className="display-flex justify-content-between align-items-center">
                            <span><strong>{supplier.supplierBranchName}</strong></span>
                            <span onClick={() => this.onRemoveSupplier(supplier.supplierBranchId)} className="glyphicon glyphicon-remove cursor-pointer" aria-hidden="true"></span>
                        </div>
                    </div>
                    <div className="panel-body">
                        <div className="col-md-12">
                            <div className='text-right mg-bt-15'>
                                <Button
                                    data-toggle="collapse"
                                    href={'#collapse-' + supplier.supplierBranchId}
                                    aria-expanded="false"
                                    bsStyle="link">
                                    Thêm thông tin hóa đơn <Glyphicon glyph='list-alt'></Glyphicon>
                                </Button>
                            </div>
                            <div id={'collapse-' + supplier.supplierBranchId} className="collapse panel panel-default mg-bt-15">
                                <div className="panel-body">
                                    <div className='col-sm-12 col-md-6 col-lg-3'>
                                        <LabeledInput
                                            name={'billTemplateCode'}
                                            value={supplier.billTemplateCode}
                                            title={'Mẫu số hóa đơn'}
                                            placeHolder={'Mẫu số hóa đơn'}
                                            error={this.state.errorList['billTemplateCode']}
                                            valueChange={(e) => this.onReleaseLivestockSupplierChange(e, supplier.supplierBranchId)} />
                                    </div>
                                    <div className='col-sm-12 col-md-6 col-lg-3'>
                                        <LabeledInput
                                            name={'billSerial'}
                                            value={supplier.billSerial}
                                            title={'Số hiệu hóa đơn'}
                                            placeHolder={'Số hiệu hóa đơn'}
                                            error={this.state.errorList['billSerial']}
                                            valueChange={(e) => this.onReleaseLivestockSupplierChange(e, supplier.supplierBranchId)} />
                                    </div>
                                    <div className='col-sm-12 col-md-6 col-lg-3'>
                                        <LabeledInput
                                            name={'billCode'}
                                            value={supplier.billCode}
                                            title={'Số hóa đơn'}
                                            placeHolder={'Số hóa đơn'}
                                            error={this.state.errorList['billCode']}
                                            valueChange={(e) => this.onReleaseLivestockSupplierChange(e, supplier.supplierBranchId)} />
                                    </div>
                                    <div className='col-sm-12 col-md-6 col-lg-3'>
                                        <LabeledSingleDatePicker
                                            name={'billDate'}
                                            title={'Ngày hóa đơn'}
                                            date={Moment()}
                                            dateChange={(e) => this.onSupplierBillDateChange(e, supplier.supplierBranchId)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="panel panel-default mg-0">
                                <div className="panel-heading">Sản phẩm</div>
                                <div className="panel-body">
                                    <div className='col-sm-12 mg-bt-15'>
                                        <ProductSimpleSearch
                                            onChooseProduct={(product) => this.onChooseProduct(product, supplier.supplierBranchId)}
                                            type='livestock' />
                                    </div>
                                    {
                                        supplier.receiveDocketDetails && supplier.receiveDocketDetails.length > 0 ?
                                            <div className='col-sm-12'>
                                                {this.renderProductsTable(supplier.supplierBranchId, supplier.receiveDocketDetails)}
                                            </div> : <div className='col-sm-12 text-center'>
                                                Chưa có con giống nào được chọn
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
        let totalPrice = docketDetails.reduce((d, l) => d + (l.unitPrice * l.quantity + l.vat), 0);
        return (
            <div className="table-responsive p-relative">
                <table className="table table-striped table-hover mg-0">
                    <thead>
                        <tr>
                            <th>Tên con giống</th>
                            <th>Kích cỡ giống</th>
                            <th>Số lượng (con)</th>
                            <th>Tổng trọng lượng (kg)</th>
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
                                            min={0}
                                            name='livestockSize'
                                            value={detail.livestockSize}
                                            onValueChange={(e) => this.onChangeRowInput(e, supplierId, idx)}
                                        />
                                    </td>
                                    <td>
                                        <FormatedInput
                                            type="number"
                                            className="form-control max-w-100"
                                            min={1}
                                            name='livestockQuantity'
                                            value={detail.livestockQuantity}
                                            onValueChange={(e) => this.onChangeRowInput(e, supplierId, idx)}
                                        />
                                    </td>
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
                                            />
                                    </td>
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
                            <td colSpan={7} className="text-right"><strong>Tổng tiền:</strong> </td>
                            <td colSpan={2}><strong>{_HNumber.FormatCurrency(totalPrice)}</strong></td>
                        </tr>

                    </tfoot>
                </table>
            </div>
        );
    }
    renderExpend() {
        let { paySlipTypes, paySlipLines } = this.state;
        return <div className="panel panel-info">
            <div className="panel-body">
                <div className="text-right">
                    <button className="btn btn-link" onClick={this.addLinePaySlip.bind(this)}>
                        Thêm chi phí <Glyphicon glyph='plus-sign'></Glyphicon>
                    </button>
                </div>
                {paySlipLines && paySlipLines.length > 0 ?
                    <div className="col-sm-12">
                        <div className="table-responsive p-relative">
                            <table className="table table-striped table-hover paysliptable">
                                <thead>
                                    <tr>
                                        <th>Chi phí</th>
                                        <th>Nội dung chi phí</th>
                                        <th>Số tiền (đã gồm VAT)</th>
                                        <th className="th-sm-1"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paySlipLines.map((m, index) => {
                                        return <tr key={index}>
                                            <td> <LabeledSelect
                                                name={'paySlipTypeId'}
                                                value={m.paySlipTypeId}
                                                inputType={'number'}
                                                placeHolder={'Loại chi phí'}
                                                valueKey={'id'}
                                                nameKey={'name'}
                                                valueChange={(e) => this.onPaySlipRowChange(e, index)}
                                                options={paySlipTypes}
                                            /></td>
                                            <td> <LabeledInput
                                                name={'description'}
                                                value={m.description}
                                                inputType={'text'}
                                                placeHolder={'Nội dung'}
                                                error={this.state.errorList['description']}
                                                valueChange={(e) => this.onPaySlipRowChange(e, index)}
                                            /></td>
                                            <td> <LabeledInput
                                                inputType='currency'
                                                name={'amount'}
                                                value={m.amount}
                                                placeHolder={'Số tiền'}
                                                error={this.state.errorList['amount']}
                                                valueChange={(e) => this.onPaySlipRowChange(e, index)}
                                            /></td>
                                            <td><Button bsStyle="default" className="btn-sm" onClick={(e) => this.removeLinePaySlip(index)}><Glyphicon glyph="minus" /></Button></td>
                                        </tr>
                                    })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div> : null
                }
            </div>
        </div>
    }
    renderInfo() {
        return (
            <div id="info" className="tab-pane fade in active">
                <div className="panel panel-info">
                    <div className="panel-body">
                        <div className="col-md-4">
                            <LabeledSelect
                                name={'fishPondWarehouseId'}
                                value={this.state.releaseDocket.fishPondWarehouseId}
                                title={'Ao nuôi'}
                                placeHolder={'Ao nuôi'}
                                valueKey={'belongId'}
                                nameKey={'name'}
                                valueChange={this.onDocketFieldChange.bind(this)}
                                options={this.state.fishPonds} />
                        </div>
                        <div className="col-md-4">
                            <LabeledSingleDatePicker
                                name={'receiveDate'}
                                title={'Ngày tạo phiếu'}
                                date={Moment()}
                                dateChange={(e) => this.onReceiveDocketDateChange(e)} />
                        </div>
                        <div className="col-md-4">
                            <LabeledTextArea
                                rows={1}
                                name={'description'}
                                value={this.state.releaseDocket.description}
                                title={'Ghi chú'}
                                placeHolder={'Ghi chú'}
                                error={this.state.errorList['description']}
                                valueChange={this.onDocketFieldChange.bind(this)} />
                        </div>
                    </div>
                </div>
                {this.renderSuppliers()}
                <div className="panel panel-info">
                    <div className="panel-body">
                        <div className='col-sm-12'>
                            <SupplierSimpleSearch onChooseSupplier={(supplier) => this.onChooseSupplier(supplier)} />
                        </div>
                    </div>
                </div>
                {this.renderExpend()}
            </div>
        );
    }
    renderReview() {
        let productQuantity = 0;
        let productTotalAmount = 0;
        let expendQuantity = 0;
        let expendTotalAmount = 0;

        let { suppliers, paySlipLines } = this.state;
        suppliers.forEach((item) => {
            productQuantity += item.receiveDocketDetails.reduce((d, l) => d + (Number(l.quantity)), 0);
            productTotalAmount += item.receiveDocketDetails.reduce((d, l) => d + (l.unitPrice * l.quantity + l.vat), 0);
        });
        expendQuantity = paySlipLines.length;
        paySlipLines.forEach((item) => {
            expendTotalAmount += Number(item.amount);
        });

        let totalAmount = productTotalAmount + expendTotalAmount;
        return <div className="col-md-6 col-sm-8 col-xs-12 pull-right">
            <SummaryText title='Số lượng con giống:' value={_HNumber.FormatNumber(productQuantity)} />
            <SummaryText title='Tổng tiền con giống:' value={_HNumber.FormatCurrency(productTotalAmount)} />
            <SummaryText title='Chi phí đi kèm:' value={_HNumber.FormatNumber(expendQuantity)} />
            <SummaryText title='Tổng chi phí đi kèm:' value={_HNumber.FormatCurrency(expendTotalAmount)} />
            <SummaryText title='Tổng tiền trên phiếu:' value={_HNumber.FormatCurrency(totalAmount)} />
            <button className="btn btn-primary pull-right" onClick={() => this.onCreateReleaseLivestock()}>Tạo phiếu</button>
        </div>
    }
    render() {
        return (
            <div className="content-wapper">
                <div className="row">
                    <div className="col-sm-12">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><NavLink to="/">Trang chủ</NavLink></li>
                                <li className="breadcrumb-item"><NavLink to="/quanlynhap">Quản lý nhập</NavLink></li>
                                <li className="breadcrumb-item active" aria-current="page">Nhập thả cá</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                {this.renderInfo()}
                {this.renderReview()}
            </div>
        );
    }
}