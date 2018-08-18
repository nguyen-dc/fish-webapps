import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { RouteComponentProps } from 'react-router';
import { LabeledSingleDatePicker } from "../shared/date-time/labeled-single-date-picker";
import * as Moment from 'moment';
import { ProductSearch } from "../product/product-search";
import { ProductModel } from "../../models/product";
import { Button, Glyphicon } from "react-bootstrap";
import { ArrayHandle } from "../../handles/array-handle";
import { ProductTable } from "../product/product-table";

interface IImportStockState {
    products: ProductModel[],
}
export class ImportStocks extends React.Component<RouteComponentProps<{}>, IImportStockState> {
    constructor(props: any) {
        super(props)
        this.state = {
            products: [],
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
    render() {
        return (
            <div className="content-wapper">
                <div className="row">
                    <div className="col-md-12">
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
                    <li className="active"><a data-toggle="tab" href="#home">Thông tin phiếu nhập</a></li>
                    <li><a data-toggle="tab" href="#menu1">Chi phí nhập</a></li>
                </ul>

                <div className="tab-content">
                    <div id="home" className="tab-pane fade in active">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group-custom mg-bt-15">
                                    <label className="control-label min-w-140 float-left" htmlFor="firstName">Mã phiếu nhập:</label>
                                    <div>
                                        <input type="text" className="form-control" name="name" value="" placeholder="Mã phiếu nhập" />
                                    </div>
                                </div>
                                <div className="form-group-custom mg-bt-15">
                                    <label className="control-label min-w-140 float-left" htmlFor="firstName">Loại phiếu nhập:</label>
                                    <div>
                                        <input type="text" className="form-control" name="name" value="" placeholder="Loại phiếu nhập" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group-custom mg-bt-15">
                                    <label className="control-label min-w-140 float-left" htmlFor="firstName">Kho nhập:</label>
                                    <div>
                                        <select className="form-control" id="sel1">
                                            <option>Ao số 1</option>
                                            <option>Ao số 2</option>
                                            <option>Ao số 3</option>
                                            <option>Ao số 4</option>
                                        </select>
                                    </div>
                                </div>
                                <LabeledSingleDatePicker
                                    name={'fromDate'}
                                    title={'Từ ngày'}
                                    date={Moment()} />
                            </div>
                            <div className="col-md-4">
                            <div className="form-group-custom mg-bt-15">
                                    <label className="control-label min-w-140 float-left" htmlFor="firstName"></label>
                                    <div>
                                        <label className="checkbox-inline mg-r-15">
                                            <input type="checkbox" name="name" value="" />
                                            Thực nhập
                                        </label>
                                    </div>
                                </div>
                                <div className="form-group-custom mg-bt-15">
                                    <label className="control-label min-w-140 float-left" htmlFor="firstName">Ghi chú:</label>
                                    <div>
                                        <textarea type="text" className="form-control" name="name" value="" placeholder="Ghi chú" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <ProductSearch onReturn={this.onSelectedProducts.bind(this)} />
                        </div>
                        {
                            !this.state.products || this.state.products.length == 0 ? null :
                                <div className="table-responsive p-relative">
                                    <ProductTable products={this.state.products} onRemoveProduct={this.onRemoveProduct.bind(this)} />
                                </div>
                        }
                    </div>
                    <div id="menu1" className="tab-pane fade">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group-custom mg-bt-15">
                                    <label className="control-label min-w-140 float-left" htmlFor="firstName">Chi phí:</label>
                                    <div>
                                        <select className="form-control" id="sel1">
                                            <option>Chi phí 1</option>
                                            <option>Chi phí 2</option>
                                            <option>Chi phí 3</option>
                                            <option>Chi phí 4</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group-custom mg-bt-15">
                                    <label className="control-label min-w-140 float-left" htmlFor="firstName">Nội dung:</label>
                                    <div>
                                        <input type="text" className="form-control" name="name" value="" placeholder="Nội dung" />
                                    </div>
                                </div>
                                <div className="form-group-custom mg-bt-15">
                                    <label className="control-label min-w-140 float-left" htmlFor="firstName">Số tiền:</label>
                                    <div>
                                        <input type="text" className="form-control" name="name" value="" placeholder="Số tiền" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group-custom mg-bt-15">
                                    <label className="control-label min-w-140 float-left" htmlFor="firstName">Ghi chú:</label>
                                    <div>
                                        <textarea rowSpan={5} type="text" className="form-control" name="name" value="" placeholder="Ghi chú" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group-custom mg-bt-15">
                                    <label className="control-label min-w-140 float-left" htmlFor="firstName"></label>
                                    <div>
                                        <button className="btn btn-primary">Thêm</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="table-responsive p-relative">
                                    <table className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>Nội dung chi phí</th>
                                                <th>Số tiền</th>
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
                    <div>
                        <div className="row">
                            <div className="col-md-3">
                                <div className="form-group-custom mg-bt-15">
                                    <label className="control-label min-w-140 float-left" htmlFor="firstName">Tiền phiếu nhập:</label>
                                    <div>
                                        <input type="text" id="rg-from" name="rg-from" value="18.000.000" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group-custom mg-bt-15">
                                    <label className="control-label min-w-140 float-left" htmlFor="firstName">Chi phí:</label>
                                    <div>
                                        <input type="text" id="rg-from" name="rg-from" value="18.000.000" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group-custom mg-bt-15">
                                    <label className="control-label min-w-140 float-left">Tổng tiền:</label>
                                    <div>
                                        <input type="text" id="rg-from" name="rg-from" value="89.000.000" className="form-control" />
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
                </div>
            </div>
        );
    }
}