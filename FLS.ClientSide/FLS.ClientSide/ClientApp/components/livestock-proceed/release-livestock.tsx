import * as React from "react";
import { NavLink } from "react-router-dom";
import { RouteComponentProps } from 'react-router';
import { LabeledSelect, LabeledInput, LabeledTextArea } from "../shared/input/labeled-input";
import * as Moment from 'moment';
import { CacheAPI } from "../../api-callers/cache";
import { _HDateTime, _HArray, _HNumber, _HString } from "../../handles/handles";
import { ProductModel } from "../../models/product";
import PropTypes from 'prop-types';
import { ReleaseLivestockModel, ReleaseLivestockDocketModel, CostsModel, ReleaseStockSupplierModel } from "../../models/import-stock";
import { IdNameModel } from "../../models/shared";
import { ProductSimpleSearch } from "../product/product-simple-search";
import { SupplierSimpleSearch } from "../supplier/supplier-simple-search";
import { SupplierModel } from "../../models/supplier";
import { ExpenditureDocketDetailModel } from "../../models/expenditure-docket-detait";
import { Button, Glyphicon } from "react-bootstrap";
import LabeledSingleDatePicker from "../shared/date-time/labeled-single-date-picker";
import { SummaryText } from "../shared/view-only";
import { LivestockProceedAPICaller } from "../../api-callers/livestock-proceed";
import { UnderConstructor } from "../shared/under-constructor";
import { ReleaseLivestockSupplier } from "./release-livestock/release-livestock-supplier";

interface ReleaseLivestockStates {
    releaseDocket: ReleaseLivestockDocketModel;
    suppliers: ReleaseStockSupplierModel[];
    livestock: ProductModel;
    paySlipDetails: ExpenditureDocketDetailModel[];
    fishPonds: IdNameModel[],
    paySlipTypes: IdNameModel[],
    errorList: {},
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
            suppliers: [] as ReleaseStockSupplierModel[],
            livestock: null,
            paySlipDetails: [] as ExpenditureDocketDetailModel[],
            fishPonds: [],
            paySlipTypes: [],
            errorList: {},
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
        let model = new ReleaseStockSupplierModel();
        let index = suppliers.findIndex(d => d.supplierBranchId == supplier.id);
        if (index >= 0) {
            this.itemRefs[supplier.id].scrollIntoView();
            return;
        } else {
            model.supplierBranchId = supplier.id;
            model.supplierBranchName = supplier.name;
            model.massAmount = 0;
            model.pricePerKg = 0;
            model.totalAmount = 0;
            model.quantity = 0;
            model.vat = 0;
            model.size = 0;
            suppliers.push(model);
            this.setState({ suppliers: suppliers });
        }
    }
    onReceiveDocketDateChange(evt) {
        let date = evt.value as Moment.Moment;
        let releaseDocket = this.state.releaseDocket;
        releaseDocket[evt.name] = date;
        this.setState({ releaseDocket });
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
        let { releaseDocket, livestock, suppliers, paySlipLines } = this.state;
        if (!releaseDocket.fishPondWarehouseId) {
            this.context.ShowGlobalMessage('error', 'Xin chọn ao');
            return false;
        }
        if (!livestock) {
            this.context.ShowGlobalMessage('error', 'Xin chọn Con giống');
            return false;
        }
        if (!suppliers || suppliers.length == 0) {
            this.context.ShowGlobalMessage('error', 'Xin chọn Nhà cung cấp cần nhập');
            return false;
        }
        let sFilter = suppliers.find(s => s.massAmount <= 0);
        if (sFilter) {
            this.context.ShowGlobalMessage('error', 'Trọng lượng không đúng');
            return false;
        }
        sFilter = suppliers.find(s => s.pricePerKg <= 0);
        if (sFilter) {
            this.context.ShowGlobalMessage('error', 'Đơn giá không đúng');
            return false;
        }
        sFilter = suppliers.find(s => s.quantity <= 0);
        if (sFilter) {
            this.context.ShowGlobalMessage('error', 'Số lượng con giống không đúng');
            return false;
        }
        sFilter = suppliers.find(s => s.size <= 0);
        if (sFilter) {
            this.context.ShowGlobalMessage('error', 'Kích cỡ con giống không đúng');
            return false;
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
        //    if (!this.validateImport())
        //        return;
        //    let { releaseDocket, suppliers, paySlipLines, paySlipTypes } = this.state;

        //    let paySlipDetails = [] as ExpenditureDocketDetailModel[];
        //    // payslip
        //    if (paySlipLines.length > 0) {
        //        paySlipLines.forEach(function (item) {
        //            var model = new ExpenditureDocketDetailModel();
        //            model.amount = item.amount;
        //            model.totalAmount = item.amount;
        //            model.expenditureTypeId = item.paySlipTypeId;
        //            model.title = item.description;
        //            var paySlipType = paySlipTypes.find(n => n.id == item.paySlipTypeId);
        //            if (paySlipType) {
        //                model.expenditureTypeName = paySlipType.name;
        //            }
        //            paySlipDetails.push(model);
        //        });
        //    }

        //    var model = new ReleaseLivestockModel();
        //    model.livestockDocket = releaseDocket;
        //    model.suppliers = suppliers;
        //    model.paySlipDetails = paySlipDetails;
        //    model.livestockDocket.isActuallyReceived = true;
        //    let response = await LivestockProceedAPICaller.Release(model);
        //    if (!response.hasError && response.data) {
        //        this.props.history.push('/quanlynhap/' + response.data);
        //    }
        //    else
        //        this.context.ShowGlobalMessageList('error', response.errors);
    }
    renderSuppliers() {
        let { suppliers, livestock } = this.state;
        return suppliers && suppliers.length > 0 ?
            <div className='col-sm-12'>
                <div className="table-responsive p-relative">
                    <table className="table table-striped table-hover mg-0">
                        <thead>
                            <tr>
                                <th>Nhà cung cấp</th>
                                <th>Kích cỡ</th>
                                <th>Trọng lượng</th>
                                <th>Đơn giá</th>
                                <th>VAT</th>
                                <th>Thành tiền</th>
                                <th>Số lượng</th>
                                <th className='th-sm-1'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {suppliers.map((supplier) => {
                                return <ReleaseLivestockSupplier
                                    key={'lvstck-spplr-' + supplier.supplierBranchId}
                                    taxPercent={livestock ? livestock.taxPercent : 0}
                                    supplier={supplier}
                                    onChange={() => this.setState(this.state)}
                                    onRemove={() => this.setState({ suppliers: suppliers.filter(s => s.supplierBranchId != supplier.supplierBranchId) })} />
                            })}
                        </tbody>
                    </table>
                </div>
            </div> :
            <div className='col-sm-12 text-center'>
                Chưa có nhà cung cấp nào được chọn
        </div>
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
                                                valueChange={(e) => { m.paySlipTypeId = Number(e.value); this.setState(this.state); }}
                                                options={paySlipTypes}
                                            /></td>
                                            <td> <LabeledInput
                                                name={'description'}
                                                value={m.description}
                                                inputType={'text'}
                                                placeHolder={'Nội dung'}
                                                error={this.state.errorList['description']}
                                                valueChange={(e) => { m.description = e.value; this.setState(this.state); }}
                                            /></td>
                                            <td> <LabeledInput
                                                inputType='currency'
                                                name={'amount'}
                                                value={m.amount}
                                                placeHolder={'Số tiền'}
                                                error={this.state.errorList['amount']}
                                                valueChange={(e) => { m.amount = Number(e.value); this.setState(this.state); }}
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
        let livestock = this.state.livestock;
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
                <div className="panel panel-info">
                    <div className="panel-body">
                        <div className='col-sm-12 mg-bt-15'>
                            <ProductSimpleSearch
                                onChooseProduct={(product) => this.setState({ livestock: product })}
                                type='livestock' />
                        </div>
                        {livestock ?
                            <div className='col-sm-12'>
                                <div className="table-responsive p-relative">
                                    <table className="table table-striped table-hover mg-0">
                                        <thead>
                                            <tr>
                                                <th>Tên con giống</th>
                                                <th>%VAT</th>
                                                <th className='th-sm-1'></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr key={'prdt-' + livestock.id}>
                                                <td>{livestock.name}</td>
                                                <td>
                                                    {livestock.taxPercent ? livestock.taxPercent : 0} %
                                                </td>
                                                <td>
                                                    <Button bsStyle='default' className='btn-sm'
                                                        onClick={() => this.setState({ livestock: null })}>
                                                        <Glyphicon glyph='minus' />
                                                    </Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div> :
                            <div className='col-sm-12 text-center'>
                                Chưa có con giống nào được chọn
                            </div>
                        }
                    </div>
                </div>
                <div className="panel panel-info">
                    <div className="panel-body">
                        <div className='col-sm-12 mg-bt-15'>
                            <SupplierSimpleSearch onChooseSupplier={(supplier) => this.onChooseSupplier(supplier)} />
                        </div>
                        {this.renderSuppliers()}
                    </div>
                </div>
                {this.renderExpend()}
            </div>
        );
    }
    renderReview() {
        let { suppliers, paySlipLines, livestock } = this.state;
        let livestockQuantity = suppliers.reduce((d, l) => d + (Number(l.quantity)), 0);
        let livestockMassAmount = suppliers.reduce((d, l) => d + (Number(l.massAmount)), 0);
        let productTotalAmount = suppliers.reduce((d, l) => d + (l.pricePerKg * l.massAmount), 0);
        if (livestock)
            productTotalAmount = productTotalAmount * (100 + livestock.taxPercent) / 100;

        let expendQuantity = 0;
        let expendTotalAmount = 0;
        expendQuantity = paySlipLines.length;
        paySlipLines.forEach((item) => {
            expendTotalAmount += Number(item.amount);
        });

        let totalAmount = productTotalAmount + expendTotalAmount;


        return <div className="col-md-6 col-sm-8 col-xs-12 pull-right">
            <SummaryText title='Tổng trọng lượng con giống:' value={_HNumber.FormatNumber(livestockMassAmount)} />
            <SummaryText title='Tổng số lượng con giống:' value={_HNumber.FormatNumber(livestockQuantity)} />
            <SummaryText title='Tổng tiền con giống:' value={_HNumber.FormatCurrency(productTotalAmount)} />
            <SummaryText title='Chi phí đi kèm:' value={_HNumber.FormatNumber(expendQuantity)} />
            <SummaryText title='Tổng chi phí đi kèm:' value={_HNumber.FormatCurrency(expendTotalAmount)} />
            <SummaryText title='Tổng tiền trên phiếu:' value={_HNumber.FormatCurrency(totalAmount)} />
            <button className="btn btn-primary pull-right" onClick={() => this.onCreateReleaseLivestock()}>Tạo phiếu</button>
        </div>
    }
    render() {
        return (
            //<UnderConstructor/> ||
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