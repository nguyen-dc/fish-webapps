import * as React from "react";
import { NavLink } from "react-router-dom";
import { RouteComponentProps } from 'react-router';
import { LabeledSelect, LabeledInput, LabeledTextArea } from "../shared/input/labeled-input";
import * as Moment from 'moment';
import { CacheAPI } from "../../api-callers/cache";
import { _HDateTime, _HArray, _HNumber, _HString } from "../../handles/handles";
import { ProductModel } from "../../models/product";
import { ImportStockModel, CostsModel } from "../../models/import-stock";
import { IdNameModel, ApiResponse } from "../../models/shared";
import { ProductSimpleSearch } from "../product/product-simple-search";
import { SupplierSimpleSearch } from "../supplier/supplier-simple-search";
import { SupplierModel } from "../../models/supplier";
import { StockReceiveDocketModel } from "../../models/stock-receive-docket";
import { ImportStockSupplierModel } from "../../models/import-stock-supplier";
import { ExpenditureDocketDetailModel } from "../../models/expenditure-docket-detait";
import { StockReceiveDocketDetailModel } from "../../models/stock_receive_docket_detail";
import { Button, Glyphicon } from "react-bootstrap";
import LabeledSingleDatePicker from "../shared/date-time/labeled-single-date-picker";
import { ExportAPICaller } from "../../api-callers";
import { ImportAPICaller } from "../../api-callers/import";
import { FormatedInput } from "../shared/input/formated-input";
import { UnderConstructor } from "../shared/under-constructor";

interface ImportStockStates {
    receiveDocket: StockReceiveDocketModel;
    suppliers: ImportStockSupplierModel[];
    paySlipDetails: ExpenditureDocketDetailModel[];
}
export class ImportDetail extends React.Component<RouteComponentProps<any>, ImportStockStates> {
    constructor(props: any) {
        super(props)
        this.state = {
            receiveDocket: new StockReceiveDocketModel(),
            suppliers: [] as ImportStockSupplierModel[],
            paySlipDetails: [] as ExpenditureDocketDetailModel[],
        }
    }
    static contextTypes = {
        ShowGlobalMessage: React.PropTypes.func,
        ShowGlobalMessageList: React.PropTypes.func,
    }
    async componentDidMount() {
        var params = this.props.match.params;
        if (!_HString.IsNullOrEmpty(params.docketId)) {
            let detail = await ImportAPICaller.Detail(Number(params.docketId));
            if (detail.hasError) {
                this.context.ShowGlobalMessageList('error', detail.errors);
            }
            else {
                this.setState({ receiveDocket: detail.data.receiveDocket, suppliers: detail.data.receiveDocket, paySlipDetails: detail.data.paySlipDetails });
            }
            if (detail.hasWarning) {
                this.context.ShowGlobalMessageList('warning', detail.warnings);
            }
        }
    }
    
    renderSuppliers() {
        let { suppliers } = this.state;
        return suppliers.map((supplier, idx) => {
            return <div key={'splr-' + supplier.supplierBranchId}>
                <div className="panel panel-default panne-color">
                    <div className="panel-heading">
                        <div className="display-flex justify-content-between align-items-center">
                            <span><strong>{supplier.supplierBranchName}</strong></span>
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
                                        <div className='form-group-custom mg-bt-15'>
                                            <label className="control-label min-w-140 float-left">Mẫu số hóa đơn</label>
                                            <div>
                                                {supplier.billTemplateCode}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-sm-12'>
                                        <div className='form-group-custom mg-bt-15'>
                                            <label className="control-label min-w-140 float-left">Số hiệu hóa đơn</label>
                                            <div>
                                                {supplier.billSerial}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-sm-12'>
                                        <div className='form-group-custom mg-bt-15'>
                                            <label className="control-label min-w-140 float-left">Số hóa đơn</label>
                                            <div>
                                                {supplier.billCode}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-sm-12'>
                                        <div className='form-group-custom mg-bt-15'>
                                            <label className="control-label min-w-140 float-left">Ngày hóa đơn</label>
                                            <div>
                                                {supplier.billDate}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="panel panel-default mg-0">
                                <div className="panel-heading">Sản phẩm</div>
                                <div className="panel-body">
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
        let totalPrice = docketDetails.reduce((d, l) => d + (l.unitPrice * l.quantity + l.vat), 0);
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
                        </tr>
                    </thead>
                    <tbody>
                        {
                            docketDetails.map((detail, idx) => {
                                return <tr key={'prdt-' + detail.productId}>
                                    <td>{detail.productName}</td>
                                    <td>
                                        {detail.quantity}
                                    </td>
                                    <td>
                                        {_HNumber.FormatCurrency(detail.unitPrice)}
                                    </td>
                                    <td>
                                        {detail.vatPercent ? detail.vatPercent : 0} %
                                    </td>
                                    <td>
                                        {_HNumber.FormatCurrency(detail.vat ? detail.vat : 0)}
                                    </td>
                                    <td>
                                        {_HNumber.FormatCurrency(detail.totalAmount)}
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
        let model = this.state.receiveDocket;
        console.log()
        return (
            <div id="info" className="tab-pane fade in active">
                <div className="panel panel-info">
                    <div className="panel-body">
                        <div className="col-md-4">
                            <div className='form-group-custom mg-bt-15'>
                                <label className="control-label min-w-140 float-left">Loại phiếu nhập</label>
                                <div>
                                    {model.stockReceiveDocketTypeId}
                                </div>
                            </div>

                        </div>
                        <div className="col-md-4">
                            <div className='form-group-custom mg-bt-15'>
                                <label className="control-label min-w-140 float-left">Kho nhập</label>
                                <div>
                                    {model.warehouseId}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className='form-group-custom mg-bt-15'>
                                <label className="control-label min-w-140 float-left">Ngày tạo phiếu</label>
                                <div>
                                    {model.receiveDate}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className='form-group-custom mg-bt-15'>
                                <label className="control-label min-w-140 float-left">Ghi chú</label>
                                <div>
                                    {model.description}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading">Nhà cung cấp</div>
                    <div className="panel-body">
                        <div className='col-sm-12'>
                            Nhà cung cấp
                        </div>
                    </div>
                </div>
                {this.renderSuppliers()}
            </div>
        );
    }
    renderTabExpend() {
        let { paySlipDetails } = this.state;
        return <div id="expend" className="tab-pane fade">
            <div className="panel panel-info">
                <div className="panel-body">
                    <div className="col-sm-12">
                        <div className="table-responsive p-relative">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>Chi phí</th>
                                        <th>Nội dung chi phí</th>
                                        <th>Số tiền (đã gồm VAT)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paySlipDetails.length > 0 ?
                                        paySlipDetails.map((m, index) => {
                                            return <tr key={index}>
                                                <td>{m.expenditureTypeName}</td>
                                                <td>{m.title}</td>
                                                <td>{_HNumber.FormatCurrency(m.totalAmount)}</td>
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
                                <li className="breadcrumb-item active" aria-current="page">Chi tiết</li>
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