import * as React from "react";
import { Link } from "react-router-dom";
import { RouteComponentProps } from 'react-router';

export class CollectDeadstocks extends React.Component<RouteComponentProps<{}>, any> {
    constructor(props: any) {
        super(props)
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="control-label col-xs-4" htmlFor="firstName">Ngày kiểm tra:</label>
                            <div className="col-xs-8">
                                <input type="text" className="form-control" name="name" value="" placeholder="Ngày kiểm tra" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-xs-4" htmlFor="firstName">Ao nuôi:</label>
                            <div className="col-xs-8">
                                <input type="text" className="form-control" name="name" value="" placeholder="Ao nuôi" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="control-label col-xs-4" htmlFor="firstName">Chọn sản phẩm:</label>
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
                            <label className="control-label col-xs-4" htmlFor="firstName">Ghi chú:</label>
                            <div className="col-xs-8">
                                <input type="text" className="form-control" name="name" value="" placeholder="Ghi chú" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="table-responsive p-relative">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Mã sản phẩm</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Hệ số cá chết</th>
                                    <th>Khối lượng(kg)</th>
                                    <th>Số lượng con</th>
                                    <th>Trọng lượng(gr/con)</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>122</td>
                                    <td>Cá da trơn</td>
                                    <td>Cá giống 1</td>
                                    <td>1.9</td>
                                    <td>4565</td>
                                    
                                    <td>11.6</td>
                                    <td><a className="cursor-pointer">Xóa</a></td>
                                </tr>
                                <tr>
                                    <td>122</td>
                                    <td>Cá da trơn</td>
                                    <td>Cá giống 1</td>
                                    <td>1.9</td>
                                    <td>4565</td>
                                   
                                    <td>11.6</td>
                                    <td><a className="cursor-pointer">Xóa</a></td>
                                </tr>
                                <tr>
                                    <td>122</td>
                                    <td>Cá da trơn</td>
                                    <td>Cá giống 1</td>
                                    <td>1.9</td>
                                    <td>4565</td>
                                  
                                    <td>11.6</td>
                                    <td><a className="cursor-pointer">Xóa</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="text-right">
                        <button className="btn btn-default mg-r-15">Hủy</button>
                        <button className="btn btn-primary">Cập nhật</button>
                    </div>
                </div>
            </div>
        );
    }
}