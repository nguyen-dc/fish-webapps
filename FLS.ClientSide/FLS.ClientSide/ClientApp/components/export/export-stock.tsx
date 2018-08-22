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

export class ExportStocks extends React.Component<RouteComponentProps<{}>, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            products: [],
            model: null,
            isShow: props.isShow,
            errorList: {},
            warehouses: [],
            stockIssueDocketTypes: [],
            datetime: DateTimeHandle.DateFormat(Moment().toDate())
        }
    }

    async componentWillMount() {
        var warehouses = await CacheAPI.Warehouse();
        var stockIssueDocketTypes = await CacheAPI.StockIssueDocketType();
        this.setState({ warehouses: warehouses.data, stockReceiveDocketTypes: stockIssueDocketTypes.data });
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
        return (
            <div id="info" className="tab-pane fade in active">
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className="col-md-4">
                            <LabeledInput
                                name={'name'}
                                value={''}
                                title={'Mã phiếu xuất'}
                                placeHolder={'Mã phiếu xuất'}
                                error={this.state.errorList['name']}
                                readOnly={true}
                                valueChange={this.onFieldValueChange.bind(this)} />
                            <LabeledSelect
                                name={'input'}
                                value={0}
                                title={'Loại phiếu xuất'}
                                placeHolder={'Loại phiếu xuất'}
                                valueKey={'id'}
                                nameKey={'name'}
                                options={this.state.stockIssueDocketType} />
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
                                value={this.state.datetime}
                                title={'Ngày tạo phiếu'}
                                placeHolder={'Ngày tạo phiếu'}
                                error={this.state.errorList['datetime']}
                                readOnly={true}
                                valueChange={this.onFieldValueChange.bind(this)} />
                        </div>
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

            );
    }

    renderTable() {
        return (
            <div className="table-responsive p-relative">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Mã sản phẩm</th>
                            <th>Tên sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Đơn vị tính</th>
                            <th>VAT</th>
                            <th>Đơn giá</th>
                            <th>Tiền VAT</th>
                            <th>Tổng tiền</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Công ty thức ăn thủy sản</td>
                            <td>1000</td>
                            <td>Cá giống 1</td>
                            <td>24</td>
                            <td>11.5</td>
                            <td>4545465</td>
                            <td>0</td>
                            <td>27.000</td>
                            <td><a className="cursor-pointer">Xóa</a></td>
                        </tr>
                        <tr>
                            <td>Công ty thức ăn thủy sản</td>
                            <td>1000</td>
                            <td>Cá giống 1</td>
                            <td>24</td>
                            <td>11.5</td>
                            <td>4545465</td>
                            <td>0</td>
                            <td>27.000</td>
                            <td><a className="cursor-pointer">Xóa</a></td>
                        </tr>
                        <tr>
                            <td>Công ty thức ăn thủy sản</td>
                            <td>1000</td>
                            <td>Cá giống 1</td>
                            <td>24</td>
                            <td>11.5</td>
                            <td>4545465</td>
                            <td>0</td>
                            <td>27.000</td>
                            <td><a className="cursor-pointer">Xóa</a></td>
                        </tr>
                        <tr>
                            <td>Công ty thức ăn thủy sản</td>
                            <td>1000</td>
                            <td>Cá giống 1</td>
                            <td>24</td>
                            <td>11.5</td>
                            <td>4545465</td>
                            <td>0</td>
                            <td>27.000</td>
                            <td><a className="cursor-pointer">Xóa</a></td>
                        </tr>
                        <tr>
                            <td>Công ty thức ăn thủy sản</td>
                            <td>1000</td>
                            <td>Cá giống 1</td>
                            <td>24</td>
                            <td>11.5</td>
                            <td>4545465</td>
                            <td>0</td>
                            <td>27.000</td>
                            <td><a className="cursor-pointer">Xóa</a></td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={7} className="text-right"><strong>Tổng tiền:</strong> </td>
                            <td colSpan={2}><strong>34.800.000</strong></td>
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
                {this.renderTable()}

                <div className="footer_total">
                    <div className="text-right">
                        <div className="text-right">
                            <button className="btn btn-danger mg-r-15">Hủy</button>
                            <button className="btn btn-primary">Cập nhật</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}