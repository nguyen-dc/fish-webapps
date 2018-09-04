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
import { ImportStockModel } from "../../models/import-stock";
import { StockIssueDocketModel } from "../../models/stock-issue-docket";
import { StockIssueDocketDetailModel } from "../../models/stock_issue_docket_detail";
import { ExpenditureDocketModel } from "../../models/expenditure-docket";
import { IdNameModel } from "../../models/shared";
import { ProductSimpleSearch } from "../product/product-simple-search";
import { SupplierSimpleSearch } from "../supplier/supplier-simple-search";
import { SupplierModel } from "../../models/supplier";
import { StockReceiveDocketModel } from "../../models/stock-receive-docket";
import { ImportStockSupplierModel } from "../../models/import-stock-supplier";
import { ExpenditureDocketDetailModel } from "../../models/expenditure-docket-detait";
import { StockReceiveDocketDetailModel } from "../../models/stock_receive_docket_detail";
import { Button, Glyphicon } from "react-bootstrap";

interface ImportStock2States {
    model: ImportStockModel,
    receiveDocket: StockReceiveDocketModel;
    suppliers: ImportStockSupplierModel[];
    paySlipDetails: ExpenditureDocketDetailModel[];
    warehouses: IdNameModel[],
    stockReceiveDocketTypes: IdNameModel[],
    paySlipTypes: IdNameModel[],
    errorList: {},
}
export class ImportStock2s extends React.Component<RouteComponentProps<{}>, ImportStock2States> {
    constructor(props: any) {
        super(props)
        this.state = {
            model: new ImportStockModel(),
            receiveDocket: new StockReceiveDocketModel(),
            suppliers: [] as ImportStockSupplierModel[],
            paySlipDetails: [] as ExpenditureDocketDetailModel[],
            warehouses: [],
            stockReceiveDocketTypes: [],
            paySlipTypes: [],
            errorList: {},
        }
    }

    async componentWillMount() {
        var warehouses = await CacheAPI.Warehouse();
        var stockReceiveDocketTypes = await CacheAPI.StockReceiveDocketType();
        var paySlipTypes = await CacheAPI.PayslipType();
        this.setState({ warehouses: warehouses.data, paySlipTypes: paySlipTypes.data });
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
            suppliers.push(model);
        }
        this.setState({ suppliers: suppliers });
    }
    onChooseProduct(product: ProductModel, suplierId: number) {
        //let { docketDetails } = this.state;
        //let detail = new StockIssueDocketDetailModel();
        //let index = docketDetails.findIndex(d => d.productId == product.id);
        //if (index >= 0) {
        //    detail = docketDetails[index];
        //    detail.quantity = detail.quantity + 1;
        //    docketDetails[index] = detail;
        //} else {
        //    detail.productId = product.id;
        //    detail.productName = product.name;
        //    detail.productUnitId = product.defaultUnitId;
        //    detail.quantity = 1;
        //    docketDetails.push(detail);
        //}
        //this.setState({ docketDetails: docketDetails });
    }
    renderSuppliers() {
        let { suppliers } = this.state;
        return suppliers.map((supplier, idx) => {
            return <div className="panel panel-default" key={'splr-' + supplier.supplierBranchId}>
                <div className="panel-heading">
                    <div className='row'>
                        <div className='col-sm-3 mg-bt-15'>{supplier.supplierBranchName}</div>
                        <div className='col-sm-3 mg-bt-15'>
                            <input
                                className="form-control"
                                type='input'
                                placeholder='Mẫu số hóa đơn'
                            />
                        </div>
                        <div className='col-sm-3 mg-bt-15'>
                            <input
                                className="form-control"
                                type='input'
                                placeholder='Số hiệu hóa đơn'
                            />
                        </div>
                        <div className='col-sm-3 mg-bt-15'>
                            <input
                                className="form-control"
                                type='input'
                                placeholder='Số hóa đơn'
                            />
                        </div>
                    </div>
                </div>
                <div className="panel-body">
                    <div className='row'>
                        <div className='col-sm-12 mg-bt-15'>
                            <ProductSimpleSearch popPlacement={'top'} onChooseProduct={(product) => this.onChooseProduct(product, supplier.supplierBranchId)} />
                        </div>
                        {
                            supplier.receiveDocketDetails && supplier.receiveDocketDetails.length > 0 ?
                                <div className='col-sm-12 mg-bt-15'>
                                    {this.renderProductsTable(supplier.receiveDocketDetails)}
                                </div> : null
                        }
                    </div>
                </div>
            </div>
        })
    }
    renderProductsTable(docketDetails: StockReceiveDocketDetailModel[]) {
        let totalPrice = docketDetails.reduce((d, l) => d + (l.unitPrice * l.quantity), 0);
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
                                return <tr key={'prdt-' + detail.id}>
                                    <td>{detail.productName}</td>
                                    <td>{detail.quantity}</td>
                                    <td><a className="cursor-pointer">Xóa</a></td>
                                </tr>
                            })
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td className="text-right"><strong>Tổng tiền:</strong> </td>
                            <td colSpan={2}><strong>{totalPrice}</strong></td>
                        </tr>

                    </tfoot>
                </table>
            </div>
        );
    }
    renderTabInfo() {
        return (
            <div id="info" className="tab-pane fade in active">
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className='row'>
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
                                    options={this.state.stockReceiveDocketTypes} />
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
                        </div>
                        <div className='row'>
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
                {this.renderSuppliers()}
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className='row'>
                            <div className='col-sm-12 mg-bt-15'>
                                <SupplierSimpleSearch onChooseSupplier={(supplier) => this.onChooseSupplier(supplier)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    renderTabExpend() {
        let { paySlipTypes } = this.state;
        return <div id="expend" className="tab-pane fade">
            <div className="panel panel-default">
                <div className="panel-body">
                    <div className="mg-bt-15">
                        <div className="col-md-3">
                            <LabeledSelect
                                name={'expenditureTypeId'}
                                value={''}
                                title={'Loại chi phí'}
                                placeHolder={'Loại chi phí'}
                                valueKey={'id'}
                                nameKey={'name'}
                                // valueChange={this.onPaySlipFieldChange.bind(this)}
                                options={paySlipTypes}
                            />
                        </div>
                        <div className="col-md-4">
                            <LabeledInput
                                name={'title'}
                                value={''}
                                title={'Nội dung'}
                                placeHolder={'Nội dung'}
                                error={this.state.errorList['title']}
                            // valueChange={this.onPaySlipFieldChange.bind(this)}
                            />
                        </div>
                        <div className="col-md-4">
                            <LabeledInput
                                name={'amount'}
                                value={''}
                                title={'Số tiền'}
                                placeHolder={'Số tiền'}
                                error={this.state.errorList['amount']}
                            // valueChange={this.onPaySlipFieldChange.bind(this)}
                            />
                        </div>
                        <div className="col-sm-1">
                            <div className="text-right">
                                <button className="btn btn-primary">Thêm</button>
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
                                    <tr>
                                        <td>Chi phí 1</td>
                                        <td>Tiền ghe</td>
                                        <td>1.000.000</td>
                                        <td><Button bsStyle="default" className="btn-sm"><Glyphicon glyph="minus" /></Button></td>
                                    </tr>
                                    <tr>
                                        <td>Chi phí 1</td>
                                        <td>Tiền bốc xếp</td>
                                        <td>1.000.000</td>
                                        <td><Button bsStyle="default" className="btn-sm"><Glyphicon glyph="minus" /></Button></td>
                                    </tr>
                                    <tr>
                                        <td>Chi phí 1</td>
                                        <td>Tiền ghe</td>
                                        <td>1.000.000</td>
                                        <td><Button bsStyle="default" className="btn-sm"><Glyphicon glyph="minus" /></Button></td>
                                    </tr>
                                    <tr>
                                        <td>Chi phí 1</td>
                                        <td>Tiền bốc xếp</td>
                                        <td>1.000.000</td>
                                        <td><Button bsStyle="default" className="btn-sm"><Glyphicon glyph="minus" /></Button></td>
                                    </tr>
                                    <tr>
                                        <td>Chi phí 1</td>
                                        <td>Tiền ghe</td>
                                        <td>1.000.000</td>
                                        <td><Button bsStyle="default" className="btn-sm"><Glyphicon glyph="minus" /></Button></td>
                                    </tr>
                                    <tr>
                                        <td>Chi phí 1</td>
                                        <td>Tiền bốc xếp</td>
                                        <td>1.000.000</td>
                                        <td><Button bsStyle="default" className="btn-sm"><Glyphicon glyph="minus" /></Button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
    renderReview() {
        let productQuantity = 4;
        let productTotalAmount = 12000000;
        let expendQuantity = 3;
        let expendTotalAmount = 320000;
        let totalAmount = productTotalAmount + expendTotalAmount;
        return <div className="panel panel-default">
            <div className="row panel-body">
                <div className="col-sm-4">
                    <div className="row">
                        <div className="col-xs-8">
                            <label className="form-control border-0" htmlFor="firstName">Số lượng sản phẩm </label>
                        </div>
                        <div className="col-xs-4 text-right">
                            <label className="form-control border-0" htmlFor="firstName">{productQuantity}</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-8">
                            <label className="form-control border-0" htmlFor="firstName">Tổng tiền</label>
                        </div>
                        <div className="col-xs-4 text-right">
                            <label className="form-control border-0" htmlFor="firstName">{productTotalAmount}</label>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="row">
                        <div className="col-xs-8">
                            <label className="form-control border-0" htmlFor="firstName">Chi phí đi kèm</label>
                        </div>
                        <div className="col-xs-4 text-right">
                            <label className="form-control border-0" htmlFor="firstName">{expendQuantity}</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-8">
                            <label className="form-control border-0" htmlFor="firstName">Tổng chi phí</label>
                        </div>
                        <div className="col-xs-4 text-right">
                            <label className="form-control border-0" htmlFor="firstName">{expendTotalAmount}</label>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="row">
                        <div className="col-xs-8">
                            <label className="form-control border-0" htmlFor="firstName">Tổng tiền trên phiếu</label>
                        </div>
                        <div className="col-xs-4 text-right">
                            <label className="form-control border-0" htmlFor="firstName">{totalAmount}</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 text-right">
                            <button className="btn btn-default mg-r-15">Hủy</button>
                            <button className="btn btn-primary mg-r-15">Tạo phiếu</button>
                        </div>
                    </div>
                </div>
            </div>
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