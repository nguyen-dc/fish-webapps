import * as React from "react";
import { Link } from "react-router-dom";
import { RouteComponentProps } from 'react-router';
import { StockReceiveDocketModel } from "../../models/stock-receive-docket";
import { Modal, Button } from "react-bootstrap";
import { FormErrors } from "../shared/FormErrors";
import { TextArea } from "../shared/TextArea";
import { Input } from "../shared/SingleInput";
import { Select } from "../shared/Select";
import { IdNameModel } from "../../models/shared";

interface IStockReceiveProps {
    isShow: boolean,
    handleClose: any,
    title: string;
    handleFormAfterSubmit: any;
    isEdit: boolean;
    stockReceiveId: number;
}

interface IStockReceiveState {
    model: StockReceiveDocketModel,
    errorList: {}
}

export class StockReceiveDocketEdit extends React.Component<RouteComponentProps<{}>, IStockReceiveState> {
    constructor(props: any) {
        super(props)
    }
    render() {
        return (
            <div>
                <ul className="nav nav-tabs mg-bt-15">
                    <li className="active"><a data-toggle="tab" href="#home">Thông tin phiếu nhập</a></li>
                    <li><a data-toggle="tab" href="#menu1">Chi phí nhập</a></li>
                </ul>

                <div className="tab-content">
                    <div id="home" className="tab-pane fade in active">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="control-label col-xs-4" htmlFor="firstName">Mã phiếu nhập:</label>
                                    <div className="col-xs-8">
                                        <input type="text" className="form-control" name="name" value="" placeholder="Mã phiếu nhập" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-xs-4" htmlFor="firstName">Loại phiếu nhập:</label>
                                    <div className="col-xs-8">
                                        <input type="text" className="form-control" name="name" value="" placeholder="Loại phiếu nhập" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-xs-4" htmlFor="firstName">Kho nhập:</label>
                                    <div className="col-xs-8">
                                        <select className="form-control" id="sel1">
                                            <option>Ao số 1</option>
                                            <option>Ao số 2</option>
                                            <option>Ao số 3</option>
                                            <option>Ao số 4</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-xs-4" htmlFor="firstName">Chọn sản phẩm:</label>
                                    <div className="col-xs-8">
                                        <select className="form-control" id="sel1">
                                            <option>Sản phẩm 1</option>
                                            <option>Sản phẩm 2</option>
                                            <option>Sản phẩm 3</option>
                                            <option>Sản phẩm 4</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="control-label col-xs-4" htmlFor="firstName">Người tạo:</label>
                                    <div className="col-xs-8">
                                        <input type="text" className="form-control" name="name" value="" placeholder="Người tạo" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-xs-4" htmlFor="firstName">Ngày tạo:</label>
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
                                <div className="form-group">
                                    <label className="control-label col-xs-4" htmlFor="firstName"></label>
                                    <div className="col-xs-8">
                                        <label className="checkbox-inline mg-r-15">
                                            <input type="checkbox" name="name" value="" />
                                            Thực nhập
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className="table-responsive p-relative">
                                <table className="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>Nhà cung cấp</th>
                                            <th>Mã giống</th>
                                            <th>Tên giống</th>
                                            <th>Cỡ giống</th>
                                            <th>Trọng lượng</th>
                                            <th>Số lượng(con)</th>
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
                                            <td>0</td>
                                            <td>456576570</td>
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
                                            <td>0</td>
                                            <td>456576570</td>
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
                                            <td>0</td>
                                            <td>456576570</td>
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
                                            <td>0</td>
                                            <td>456576570</td>
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
                                            <td>0</td>
                                            <td>456576570</td>
                                            <td><a className="cursor-pointer">Xóa</a></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div id="menu1" className="tab-pane fade">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="control-label col-xs-4" htmlFor="firstName">Chi phí:</label>
                                    <div className="col-xs-8">
                                        <select className="form-control" id="sel1">
                                            <option>Chi phí 1</option>
                                            <option>Chi phí 2</option>
                                            <option>Chi phí 3</option>
                                            <option>Chi phí 4</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-xs-4" htmlFor="firstName">Nội dung:</label>
                                    <div className="col-xs-8">
                                        <input type="text" className="form-control" name="name" value="" placeholder="Nội dung" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="control-label col-xs-4" htmlFor="firstName">Số tiền:</label>
                                    <div className="col-xs-8">
                                        <input type="text" className="form-control" name="name" value="" placeholder="Số tiền" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-xs-4" htmlFor="firstName">Ghi chú:</label>
                                    <div className="col-xs-8">
                                        <input type="text" className="form-control" name="name" value="" placeholder="Ghi chú" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12">
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
                                <div className="form-inline">
                                    <label htmlFor="rg-from" className="checkbox-inline">Tiền phiếu nhập: &nbsp;</label>
                                    <div className="form-group">
                                        <input type="text" id="rg-from" name="rg-from" value="18.000.000" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-inline">
                                    <label htmlFor="rg-from" className="checkbox-inline">Chi phí: &nbsp;</label>
                                    <div className="form-group">
                                        <input type="text" id="rg-from" name="rg-from" value="9.000.000" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-inline">
                                    <label htmlFor="rg-from" className="checkbox-inline">Tổng tiền: &nbsp;</label>
                                    <div className="form-group">
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
