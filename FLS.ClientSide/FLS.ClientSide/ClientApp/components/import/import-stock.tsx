import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { RouteComponentProps } from 'react-router';
import { LabeledSingleDatePicker } from "../shared/date-time/labeled-single-date-picker";
import * as Moment from 'moment';
import { ProductSearch } from "../product/product-search";
import { ProductModel } from "../../models/product";
import { Button, Glyphicon, OverlayTrigger, Popover } from "react-bootstrap";
import { ArrayHandle, DateTimeHandle } from "../../handles/handles";
import { ProductTable } from "../product/product-table";
import { CacheAPI } from "../../api-callers/cache";
import { LabeledSelect, LabeledInput, LabeledCheckBox, LabeledTextArea } from "../shared/input/labeled-input";
import { WarehouseModel } from "../../models/warehouse";
import { StockReceiveDocketTypeModel } from "../../models/stock-receive-docket-type";
import { StockReceiveDocketModel } from "../../models/stock-receive-docket";
import { EmptyRowMessage } from "../shared/view-only";
import { ExpenditureDocketDetailModel } from "../../models/expenditure-docket-detait";
import { StockReceiveDocketDetailModel } from "../../models/stock_receive_docket_detail";

interface IImportStockState {
    receiveDocket: StockReceiveDocketModel;
    receiveDocketDetail: StockReceiveDocketDetailModel;
    paySlipDetail: ExpenditureDocketDetailModel;
    products: ProductModel[],
    isShow: boolean,
    warehouses: WarehouseModel[],
    stockReceiveDocketTypes: StockReceiveDocketTypeModel[],
    expenditureTypes: any,
    errorList: {},
}
export class ImportStocks extends React.Component<RouteComponentProps<{}>, IImportStockState> {
    constructor(props: any) {
        super(props)
        this.state = {
            receiveDocket: new StockReceiveDocketModel(),
            receiveDocketDetail: new StockReceiveDocketDetailModel(),
            paySlipDetail: new ExpenditureDocketDetailModel(),
            products: [],
            isShow: props.isShow,
            errorList: {},
            warehouses: [],
            stockReceiveDocketTypes: [],
            expenditureTypes:[]
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
        var expenditureTypes = await CacheAPI.ExpenditureType();
        this.setState({ warehouses: warehouses.data, stockReceiveDocketTypes: stockReceiveDocketTypes.data, expenditureTypes: expenditureTypes.data });
    }
    onChangeReceiveDocket(model: any) {
        const nextState = {
            ...this.state,
            model: {
                ...this.state.receiveDocket,
                [model.name]: model.value,
            }
        };
        this.setState(nextState);
    }
    onChangeReceiveDocketDetail(model: any) {
        const nextState = {
            ...this.state,
            model: {
                ...this.state.receiveDocketDetail,
                [model.name]: model.value,
            }
        };
        this.setState(nextState);
    }
    onChangePaySlipDetail(model: any) {
        const nextState = {
            ...this.state,
            model: {
                ...this.state.paySlipDetail,
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
                            name={'id'}
                            value={this.state.receiveDocket.id}
                            title={'Mã phiếu nhập'}
                            placeHolder={'Mã phiếu nhập'}
                            error={this.state.errorList['id']}
                            readOnly={true}
                            valueChange={this.onChangeReceiveDocket.bind(this)} />
                        <LabeledSelect
                            name={'stock_receive_docket_type_id'}
                            value={this.state.receiveDocket.stockReceiveDocketTypeId}
                            title={'Loại phiếu nhập'}
                            placeHolder={'Loại phiếu nhập'}
                            valueKey={'id'}
                            nameKey={'stock_receive_docket_type_id'}
                            options={this.state.stockReceiveDocketTypes} />
                        <LabeledInput
                            name={'docketNumber'}
                            value={this.state.receiveDocket.docketNumber}
                            title={'Số hóa đơn'}
                            placeHolder={'Số hóa đơn'}
                            error={this.state.errorList['docketNumber']}
                            valueChange={this.onChangeReceiveDocket.bind(this)} />
                    </div>
                    <div className="col-md-4">
                        <LabeledSelect
                            name={'warehouseId'}
                            value={this.state.receiveDocket.warehouseId}
                            title={'Kho nhập'}
                            placeHolder={'Kho nhập'}
                            valueKey={'id'}
                            nameKey={'name'}
                            options={this.state.warehouses} />
                        <LabeledTextArea
                            rows={1}
                            name={'description'}
                            value={this.state.receiveDocket.description}
                            title={'Chi tiết'}
                            placeHolder={'Chi tiết'}
                            error={this.state.errorList['description']}
                            valueChange={this.onChangeReceiveDocket.bind(this)} />
                        <LabeledInput
                            name={'name'}
                            value={''}
                            title={'Mẫu số'}
                            placeHolder={'Mẫu số'}
                            error={this.state.errorList['name']}
                            valueChange={this.onChangeReceiveDocket.bind(this)} />
                    </div>
                    <div className="col-md-4">
                        <LabeledInput
                            name={'executedDate'}
                            value={this.state.receiveDocket.executedDate}
                            title={'Ngày nhập'}
                            error={this.state.errorList['executedDate']}
                            readOnly={true}
                            valueChange={this.onChangeReceiveDocket.bind(this)} />
                        <LabeledCheckBox
                            name={'isActuallyReceived'}
                            value={this.state.receiveDocket.isActuallyReceived}
                            text={'Thực nhập'}
                            error={this.state.errorList['is_actually_received']}
                            valueChange={this.onChangeReceiveDocket.bind(this)} />
                        <LabeledInput
                            name={'name'}
                            value={''}
                            title={'Ký hiệu'}
                            placeHolder={'Ký hiệu'}
                            error={this.state.errorList['name']}
                            valueChange={this.onChangeReceiveDocket.bind(this)} />
                    </div>

                   
                </div>
            </div>
            <div className="panel panel-default">
                <div className="panel-heading">
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
                           <LabeledSelect
                                name={'expenditureTypeId'}
                                value={this.state.paySlipDetail.expenditureTypeId}
                                title={'Loại chi phí'}
                                placeHolder={'Loại chi phí'}
                                valueKey={'id'}
                                nameKey={'name'}
                                valueChange={this.onChangePaySlipDetail.bind(this)}
                                options={this.state.expenditureTypes} />
                        </div>
                        <div className="col-md-4">
                            <LabeledInput
                                name={'title'}
                                value={this.state.paySlipDetail.title}
                                title={'Nội dung'}
                                placeHolder={'Nội dung'}
                                error={this.state.errorList['title']}
                                valueChange={this.onChangePaySlipDetail.bind(this)} />
                        </div>
                        <div className="col-md-4">
                            <LabeledInput
                                name={'amount'}
                                value={this.state.paySlipDetail.amount}
                                title={'Số tiền'}
                                placeHolder={'Số tiền'}
                                error={this.state.errorList['amount']}
                                valueChange={this.onChangePaySlipDetail.bind(this)} />
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