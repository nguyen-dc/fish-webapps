import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { RouteComponentProps } from 'react-router';
import { LabeledSelect } from "../shared/input/labeled-input";

export class ExportStocks extends React.Component<RouteComponentProps<{}>, any> {
    constructor(props: any) {
        super(props)
    }

    render() {
        return (
            <div className="content-wapper">
                <div className="row">
                <div className="col-sm-12">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><NavLink to="/">Trang chủ</NavLink></li>
                                <li className="breadcrumb-item"><NavLink to="/quanlyxuat">Quản lý xuất</NavLink></li>
                                <li className="breadcrumb-item active" aria-current="page">Xuất bán hàng hóa thông thường</li>
                            </ol>
                        </nav>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group-custom mg-bt-15">
                            <label className="control-label min-w-140 float-left" htmlFor="firstName">Mã phiếu xuất:</label>
                            <div>
                                <input type="text" className="form-control" name="name" value="" placeholder="Mã phiếu xuất" />
                            </div>
                        </div>
                        <LabeledSelect
                            name={'input'}
                            value={0}
                            title={'Loại phiếu xuất'}
                            placeHolder={'Loại phiếu xuất'}
                            valueKey={'id'}
                            nameKey={'name'}
                            options={[{ id: 1, name: 'Loại phiếu xuất 1' }, { id: 2, name: 'Loại phiếu xuất 2' }]} />
                        <div className="form-group-custom mg-bt-15">
                            <label className="control-label  min-w-140 float-left" htmlFor="firstName">Kho xuất:</label>
                            <div>
                                <select className="form-control" id="sel1">
                                    <option>Ao số 1</option>
                                    <option>Ao số 2</option>
                                    <option>Ao số 3</option>
                                    <option>Ao số 4</option>
                                </select>
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
                        <div className="form-group-custom mg-bt-15">
                            <label className="control-label  min-w-140 float-left" htmlFor="firstName">Ngày tạo phiếu:</label>
                            <div>
                                <input type="text" className="form-control" name="name" value="" placeholder="Ngày tạo" />
                            </div>
                        </div>
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
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-group-custom mg-bt-15">
                            <label className="control-label  min-w-140 float-left" htmlFor="firstName">Ghi chú:</label>
                            <div>
                                <input type="text" className="form-control" name="name" value="" placeholder="Ghi chú" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group-custom mg-bt-15">
                            <label className="control-label  min-w-140 float-left" htmlFor="firstName">Chọn sản phẩm:</label>
                            <div>
                                <select className="form-control" id="sel1">
                                    <option>Sản phẩm 1</option>
                                    <option>Sản phẩm 2</option>
                                    <option>Sản phẩm 3</option>
                                    <option>Sản phẩm 4</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
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
                <div className="footer_total">
                    <div className="text-right">
                        <div className="text-right">
                            <button className="btn btn-danger mg-r-15">Hủy</button>
                            <button className="btn btn-default mg-r-15">Duyệt</button>
                            <button className="btn btn-primary">Cập nhật</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}