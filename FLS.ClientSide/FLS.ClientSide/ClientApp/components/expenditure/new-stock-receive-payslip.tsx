import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { RouteComponentProps } from 'react-router';
import { LabeledSelect, LabeledInput } from "../shared/input/labeled-input";
import { CostsModel } from "../../models/import-stock";
import { IdNameModel } from "../../models/shared";
import { StockReceivePaySlipModel } from "../../models/stock_receive_pay_slip";
import { Glyphicon, Button } from "react-bootstrap";
import { CacheAPI } from "../../api-callers/cache";

interface ImportStockStates {
    warehouses: IdNameModel[],
    stockReceiveDocketTypes: IdNameModel[],
    paySlipTypes: IdNameModel[],
    listPaySlip: StockReceivePaySlipModel[],
    errorList: {},
    model: StockReceivePaySlipModel
}

export class NewStockReceivePayslip extends React.Component<RouteComponentProps<{}>, ImportStockStates> {
    constructor(props: any) {
        super(props)
        this.state = {
            warehouses: [],
            stockReceiveDocketTypes: [],
            paySlipTypes: [],
            listPaySlip: [],
            errorList: {},
            model: new StockReceivePaySlipModel()
        }
    }
    async componentWillMount() {
        var warehouses = await CacheAPI.Warehouse();
        var stockReceiveDocketTypes = await CacheAPI.StockReceiveDocketType();
        var paySlipTypes = await CacheAPI.PayslipType();
        this.setState({ warehouses: warehouses.data, paySlipTypes: paySlipTypes.data });
    }
    onPaySlipFieldChange(model: any) {
        const nextState = {
            ...this.state,
            model: {
                ...this.state.model,
                [model.name]: model.value,
            }
        };
        this.setState(nextState);
    }
    addPaySlip() {
        //var paySlip = this.state.costs;
        //var model = new StockReceivePaySlipModel();
        //model.totalAmount = paySlip.amount;
        //model.expenditureTypeId = paySlip.paySlipTypeId;
        //model.title = paySlip.description;
        //var paySlipType = this.state.paySlipTypes.find(n => n.id == paySlip.paySlipTypeId);
        //if (paySlipType) {
        //    model.expenditureTypeName = paySlipType.name;
        //}
        ////---------------------------------
        //let { paySlipDetails } = this.state;
        //paySlipDetails.unshift(model);
        //this.setState({ paySlipDetails: paySlipDetails });
    }

    render() {
        let { paySlipTypes } = this.state;
        return <div className="content-wapper">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><NavLink to="/">Trang chủ</NavLink></li>
                <li className="breadcrumb-item"><NavLink to="/quanlythuchi">Quản lý thu chi</NavLink></li>
                <li className="breadcrumb-item active" aria-current="page">Tạo phiếu chi</li>
            </ol>
            <div id="expend" className="tab-pane">
                <div className="panel panel-info">
                    <div className="panel-body">
                        <div className="mg-bt-15">
                            <div className="col-md-3">
                                <LabeledSelect
                                    name={'paySlipTypeId'}
                                    value={''}
                                    title={'Loại chi phí'}
                                    placeHolder={'Loại chi phí'}
                                    valueKey={'id'}
                                    nameKey={'name'}
                                    valueChange={this.onPaySlipFieldChange.bind(this)}
                                    options={paySlipTypes}
                                />
                            </div>
                            <div className="col-md-4">
                                <LabeledInput
                                    name={'description'}
                                    value={''}
                                    title={'Nội dung'}
                                    placeHolder={'Nội dung'}
                                    error={this.state.errorList['description']}
                                    valueChange={this.onPaySlipFieldChange.bind(this)}
                                />
                            </div>
                            <div className="col-md-4">
                                <LabeledInput
                                    name={'amount'}
                                    value={''}
                                    title={'Số tiền'}
                                    placeHolder={'Số tiền'}
                                    error={this.state.errorList['amount']}
                                    valueChange={this.onPaySlipFieldChange.bind(this)}
                                />
                            </div>
                            <div className="col-sm-1">
                                <div className="text-right">
                                    <button className="btn btn-primary" onClick={this.addPaySlip.bind(this)}>Thêm</button>
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
                                        {
                                            //paySlipDetails.length > 0 ?
                                            //    paySlipDetails.map((m, index) => {
                                            //        return <tr key={index}>
                                            //            <td>{m.expenditureTypeName}</td>
                                            //            <td>{m.title}</td>
                                            //            <td>{NumberHandle.FormatCurrency(m.totalAmount)}</td>
                                            //            <td><Button bsStyle="default" className="btn-sm"><Glyphicon glyph="minus" /></Button></td>
                                            //        </tr>
                                            //    }) : <tr>
                                            //        <td className="text-center" colSpan={4}>Chưa có chi phí nào</td>
                                            //    </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
    }
}