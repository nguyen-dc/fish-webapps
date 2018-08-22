﻿import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { RouteComponentProps } from 'react-router';
import { LabeledSingleDatePicker } from "../shared/date-time/labeled-single-date-picker";
import * as Moment from 'moment';
import { ProductSearch } from "../product/product-search";
import { ProductModel } from "../../models/product";
import { Button, Glyphicon } from "react-bootstrap";
import { ArrayHandle, DateTimeHandle } from "../../handles/handles";
import { ProductTable } from "../product/product-table";
import { CacheAPI } from "../../api-callers/cache";
import { LabeledSelect, LabeledInput, LabeledCheckBox, LabeledTextArea } from "../shared/input/labeled-input";
import { WarehouseModel } from "../../models/warehouse";
import { StockReceiveDocketTypeModel } from "../../models/stock-receive-docket-type";
import { StockReceiveDocketModel } from "../../models/stock-receive-docket";
import { EmptyRowMessage } from "../shared/view-only";

interface IImportStockState {
    products: ProductModel[],
    model: StockReceiveDocketModel,
    isShow: boolean,
    errorList: {},
    warehouses: WarehouseModel[],
    stockReceiveDocketTypes: StockReceiveDocketTypeModel[],
    datetime: any,
}
export class ImportStocks extends React.Component<RouteComponentProps<{}>, IImportStockState> {
    constructor(props: any) {
        super(props)
        this.state = {
            products: [],
            model: new StockReceiveDocketModel(),
            isShow: props.isShow,
            errorList: {},
            warehouses: [],
            stockReceiveDocketTypes: [],
            datetime: DateTimeHandle.DateFormat(Moment().toDate())
        }
    }
    private onSelectedProducts(products: ProductModel[]) {
        let stateProducts = this.state.products;
        let newList = ArrayHandle.ConcatAndDeDuplicate('id', stateProducts, products);
        this.setState({ products: newList });
    }
    private onRemoveProduct(item: ProductModel) {
        let products = this.state.products;
        var index = products.indexOf(item);
        products.splice(index, 1);
        this.setState({ products: products })
    }
    async componentWillMount() {
        var warehouses = await CacheAPI.Warehouse();
        var stockReceiveDocketTypes = await CacheAPI.StockReceiveDocketType();
        this.setState({ warehouses: warehouses.data, stockReceiveDocketTypes: stockReceiveDocketTypes.data });
    }
    onFieldValueChange(model: any) {
        const nextState = {
            ...this.state,
            model: {
                ...this.state.model,
                [model.name]: model.value,
            }
        };
        this.setState(nextState);
    }
    renderTabInfo() {
        return <div id="info" className="tab-pane fade in active">
            <div className="panel panel-default">
                <div className="panel-body">
                    <div className="col-md-4">
                        <LabeledInput
                            name={'name'}
                            value={''}
                            title={'Mã phiếu nhập'}
                            placeHolder={'Mã phiếu nhập'}
                            error={this.state.errorList['name']}
                            readOnly={true}
                            valueChange={this.onFieldValueChange.bind(this)} />
                        <LabeledSelect
                            name={'input'}
                            value={0}
                            title={'Loại phiếu nhập'}
                            placeHolder={'Loại phiếu nhập'}
                            valueKey={'id'}
                            nameKey={'name'}
                            options={this.state.stockReceiveDocketTypes} />
                    </div>
                    <div className="col-md-4">
                        <LabeledSelect
                            name={'warehouses'}
                            value={0}
                            title={'Kho nhập'}
                            placeHolder={'Kho nhập'}
                            valueKey={'id'}
                            nameKey={'name'}
                            options={this.state.warehouses} />
                        <LabeledTextArea
                            rows={1}
                            name={'Description'}
                            value={this.state.model.Description}
                            title={'Ghi chú'}
                            placeHolder={'Ghi chú'}
                            error={this.state.errorList['Description']}
                            valueChange={this.onFieldValueChange.bind(this)} />
                    </div>
                    <div className="col-md-4">
                        <LabeledCheckBox
                            name={'hasScale'}
                            value={true}
                            text={'Thực nhập'}
                            error={this.state.errorList['hasScale']}
                            valueChange={this.onFieldValueChange.bind(this)} />
                        <LabeledInput
                            name={'name'}
                            value={this.state.datetime}
                            title={'Ngày nhập'}
                            error={this.state.errorList['name']}
                            readOnly={true}
                            valueChange={this.onFieldValueChange.bind(this)} />
                    </div>
                </div>
            </div>
            <div className="panel panel-default">
                <div className="panel-heading">
                    {/*<ProductSearch onReturn={this.onSelectedProducts.bind(this)} wrapperClass={'text-right'} />*/}
                    <ProductSearch onReturn={this.onSelectedProducts.bind(this)} />
                </div>
                <div className="panel-body">
                    {
                        !this.state.products || this.state.products.length == 0 ?
                            <EmptyRowMessage message={'Chưa chọn sản phẩm nhập'} /> :
                            <div className="table-responsive p-relative">
                                <ProductTable products={this.state.products} onRemoveProduct={this.onRemoveProduct.bind(this)} />
                            </div>
                    }
                </div>
            </div>
        </div>
    }
    renderTabExpend() {
        return <div id="expend" className="tab-pane fade">
            <div className="panel panel-default">
                <div className="panel-body">
                    <div className="mg-bt-15">
                        <div className="col-md-3">
                            <div className="form-group-custom mg-bt-15">
                                <label className="control-label min-w-140 float-left" htmlFor="firstName">Chi phí:</label>
                                <select className="form-control" id="sel1">
                                    <option>Chi phí 1</option>
                                    <option>Chi phí 2</option>
                                    <option>Chi phí 3</option>
                                    <option>Chi phí 4</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group-custom mg-bt-15">
                                <label className="control-label min-w-140 float-left" htmlFor="firstName">Nội dung:</label>
                                <input type="text" className="form-control" placeholder="Nội dung" />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group-custom mg-bt-15">
                                <label className="control-label min-w-140 float-left" htmlFor="firstName">Số tiền:</label>
                                <input type="text" className="form-control" placeholder="Số tiền" />
                            </div>
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