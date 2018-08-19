import * as React from "react";
import { Link } from "react-router-dom";
import { RouteComponentProps } from 'react-router';

export class SpreadMedicines extends React.Component<RouteComponentProps<{}>, any> {
    constructor(props: any) {
        super(props)
    }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="control-label col-xs-4" htmlFor="firstName">Mã phiếu xuất:</label>
                            <div className="col-xs-8">
                                <input type="text" className="form-control" name="name" value="" placeholder="Mã phiếu xuất" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-xs-4" htmlFor="firstName">Ao cho ăn:</label>
                            <div className="col-xs-8">
                                <input type="text" className="form-control" name="name" value="" placeholder="Ao cho ăn" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-xs-4" htmlFor="firstName">Chọn thức ăn:</label>
                            <div className="col-xs-8">
                                <select className="form-control" id="sel1">
                                    <option>Ao số 1</option>
                                    <option>Ao số 2</option>
                                    <option>Ao số 3</option>
                                    <option>Ao số 4</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="control-label col-xs-4" htmlFor="firstName">Ngày tạo:</label>
                            <div className="col-xs-8">
                                <input type="text" className="form-control" name="name" value="" placeholder="Ngày tạo" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-xs-4" htmlFor="firstName">Ngày cho ăn:</label>
                            <div className="col-xs-8">
                                <input type="text" className="form-control" name="name" value="" placeholder="Ngày tạo" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-xs-4" htmlFor="firstName">Ghi chú:</label>
                            <div className="col-xs-8">
                                <input type="text" className="form-control" name="name" value="" placeholder="Ghi chú" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12">
                    <div className="table-responsive p-relative">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Mã sản phẩm</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Số lượng</th>
                                    <th>Đơn vị tính</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Công ty thức ăn thủy sản</td>
                                    <td>1000</td>
                                    <td>Cá giống 1</td>
                                    <td>24</td>
                                    <td><a className="cursor-pointer">Xóa</a></td>
                                </tr>
                                <tr>
                                    <td>Công ty thức ăn thủy sản</td>
                                    <td>1000</td>
                                    <td>Cá giống 1</td>
                                    <td>24</td>
                                    <td><a className="cursor-pointer">Xóa</a></td>
                                </tr>
                                <tr>
                                    <td>Công ty thức ăn thủy sản</td>
                                    <td>1000</td>
                                    <td>Cá giống 1</td>
                                    <td>24</td>
                                    <td><a className="cursor-pointer">Xóa</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-sm-12">
                    <div className="text-right">
                        <button className="btn btn-default mg-r-15">Hủy</button>
                        <button className="btn btn-primary">Cập nhật</button>
                    </div>
                </div>
            </div>
        );
    }
}