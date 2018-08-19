import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { RouteComponentProps } from 'react-router';
import { LabeledSingleDatePicker } from "../shared/date-time/labeled-single-date-picker";
import * as Moment from 'moment';
import { ProductSearch } from "../product/product-search";
import { ProductModel } from "../../models/product";
import { Button, Glyphicon } from "react-bootstrap";
import { ArrayHandle } from "../../handles/handles";
import { ProductTable } from "../product/product-table";
import { CacheAPI } from "../../api-callers/cache";
import { LabeledSelect, LabeledInput, LabeledCheckBox } from "../shared/input/labeled-input";
import { WarehouseModel } from "../../models/warehouse";
import { StockReceiveDocketTypeModel } from "../../models/stock-receive-docket-type";
import { StockReceiveDocketModel } from "../../models/stock-receive-docket";

interface IImportStockState {
    products: ProductModel[],
    model: StockReceiveDocketModel,
    isShow: boolean,
    errorList: {},
    warehouses: WarehouseModel[],
    stockReceiveDocketTypes: StockReceiveDocketTypeModel[],
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
            stockReceiveDocketTypes: []
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
                <ul className="nav nav-tabs mg-bt-15">
                    <li className="active"><a data-toggle="tab" href="#info">Thông tin phiếu nhập</a></li>
                    <li><a data-toggle="tab" href="#expend">Chi phí nhập</a></li>
                </ul>
                <div className="tab-content">
                    <div id="info" className="tab-pane fade in active">
                        <div className="row">
                            <div className="col-md-4">
                                <LabeledInput
                                    name={'name'}
                                    value={'name'}
                                    title={'Mã phiếu nhập'}
                                    placeHolder={'Mã phiếu nhập'}
                                    error={this.state.errorList['name']}
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
                                <LabeledSingleDatePicker
                                    name={'fromDate'}
                                    title={'Từ ngày'}
                                    date={Moment()} />
                            </div>
                            <div className="col-md-4">
                                <LabeledCheckBox
                                    name={'hasScale'}
                                    value={true}
                                    text={'Thực nhập'}
                                    error={this.state.errorList['hasScale']}
                                    valueChange={this.onFieldValueChange.bind(this)} />

                                <div className="form-group-custom mg-bt-15">
                                    <label className="control-label min-w-140 float-left" htmlFor="firstName">Ghi chú:</label>
                                    <div>
                                        <textarea type="text" className="form-control" name="name" defaultValue="" placeholder="Ghi chú" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <ProductSearch onReturn={this.onSelectedProducts.bind(this)} wrapperClass={'text-right'}/>
                        </div>
                        {
                            !this.state.products || this.state.products.length == 0 ? null :
                                <div className="row">
                                    <div className="table-responsive p-relative">
                                        <ProductTable products={this.state.products} onRemoveProduct={this.onRemoveProduct.bind(this)} />
                                    </div>
                                </div>
                        }
                    </div>
                    <div id="expend" className="tab-pane fade">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group-custom mg-bt-15">
                                    <label className="control-label min-w-140 float-left" htmlFor="firstName">Chi phí:</label>
                                    <select className="form-control" id="sel1">
                                        <option>Chi phí 1</option>
                                        <option>Chi phí 2</option>
                                        <option>Chi phí 3</option>
                                        <option>Chi phí 4</option>
                                    </select>
                                </div>
                                <div className="form-group-custom mg-bt-15">
                                    <label className="control-label min-w-140 float-left" htmlFor="firstName">Nội dung:</label>
                                    <input type="text" className="form-control" placeholder="Nội dung" />
                                </div>
                                <div className="form-group-custom mg-bt-15">
                                    <label className="control-label min-w-140 float-left" htmlFor="firstName">Số tiền:</label>
                                    <input type="text" className="form-control" placeholder="Số tiền" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group-custom mg-bt-15">
                                    <label className="control-label min-w-140 float-left" htmlFor="firstName">Ghi chú:</label>
                                    <div>
                                        <textarea rowSpan={5} type="text" className="form-control" placeholder="Ghi chú" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className="form-group-custom mg-bt-15">
                                <label className="control-label min-w-140 float-left" htmlFor="firstName"></label>
                                <div>
                                    <button className="btn btn-primary">Thêm</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className="table-responsive p-relative">
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Nội dung chi phí</th>
                                            <th>Số tiền (đã gồm VAT)</th>
                                            <th>Ghi chú</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Tiền ghe</td>
                                            <td>1.000.000</td>
                                            <td></td>
                                            <td><a className="cursor-pointer">Xóa</a></td>
                                        </tr>
                                        <tr>
                                            <td>Tiền bốc xếp</td>
                                            <td>1.000.000</td>
                                            <td></td>
                                            <td><a className="cursor-pointer">Xóa</a></td>
                                        </tr>
                                        <tr>
                                            <td>Tiền ghe</td>
                                            <td>1.000.000</td>
                                            <td></td>
                                            <td><a className="cursor-pointer">Xóa</a></td>
                                        </tr>
                                        <tr>
                                            <td>Tiền bốc xếp</td>
                                            <td>1.000.000</td>
                                            <td></td>
                                            <td><a className="cursor-pointer">Xóa</a></td>
                                        </tr>
                                        <tr>
                                            <td>Tiền ghe</td>
                                            <td>1.000.000</td>
                                            <td></td>
                                            <td><a className="cursor-pointer">Xóa</a></td>
                                        </tr>
                                        <tr>
                                            <td>Tiền bốc xếp</td>
                                            <td>1.000.000</td>
                                            <td></td>
                                            <td><a className="cursor-pointer">Xóa</a></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <div className="form-group-custom mg-bt-15">
                            <label className="control-label min-w-140 float-left" htmlFor="firstName">Tiền phiếu nhập:</label>
                            <div>
                                <input type="text" id="rg-from" name="rg-from" defaultValue="18.000.000" className="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group-custom mg-bt-15">
                            <label className="control-label min-w-140 float-left" htmlFor="firstName">Chi phí:</label>
                            <div>
                                <input type="text" id="rg-from" name="rg-from" defaultValue="18.000.000" className="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group-custom mg-bt-15">
                            <label className="control-label min-w-140 float-left">Tổng tiền:</label>
                            <div>
                                <input type="text" id="rg-from" name="rg-from" defaultValue="89.000.000" className="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="text-right">
                            <button className="btn btn-default mg-r-15">Hủy</button>
                            <button className="btn btn-primary">Cập nhật</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}