import * as React from "react";
import { NavLink } from "react-router-dom";
import { RouteComponentProps } from 'react-router';
import PropTypes from 'prop-types';
import { _HDateTime, _HArray, _HNumber, _HString } from "../../handles/handles";
import { ExportAPICaller } from "../../api-callers/export";
import { LabeledText } from "../shared/input/labeled-input";
import { EmptyTableMessage, SummaryText } from "../shared/view-only";
import { ExportStockDetailModel } from "../../models/export-stock";

interface ExportStockStates {
    model: ExportStockDetailModel;
}
export class ExportDetail extends React.Component<RouteComponentProps<any>, ExportStockStates> {
    constructor(props: any) {
        super(props)
        this.state = {
            model: null,
        }
    }
    static contextTypes = {
        ShowGlobalMessage: PropTypes.func,
        ShowGlobalMessageList: PropTypes.func,
    }
    async componentDidMount() {
        var params = this.props.match.params;
        if (!_HString.IsNullOrEmpty(params.docketId)) {
            let detail = await ExportAPICaller.Detail(Number(params.docketId));
            if (detail.hasError) {
                this.context.ShowGlobalMessageList('error', detail.errors);
            }
            else {
                this.repareData(detail.data);
            }
            if (detail.hasWarning) {
                this.context.ShowGlobalMessageList('warning', detail.warnings);
            }
        }
    }

    private repareData(data) {
        this.setState({ model: data });
    }
    renderProductsTable() {
        let details = this.state.model.details;
        let totalPrice = 0;
        if (details)
            totalPrice = details.reduce((d, l) => d + (l.unitPrice * l.quantity + l.vat), 0);
        return (
            <div className="table-responsive p-relative">
                <table className="table table-striped table-hover mg-0">
                    <thead>
                        <tr>
                            <th>Tên sản phẩm</th>
                            <th className='text-right'>Số lượng</th>
                            <th className='text-right'>Đơn giá</th>
                            <th className='text-right'>VAT</th>
                            <th className='text-right'>Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            details.length > 0 ? details.map((detail) => {
                                return <tr key={'prdt-' + detail.productId}>
                                    <td>{detail.productName}</td>
                                    <td className='text-right'>
                                        {detail.quantity}&nbsp;
                                        {detail.productUnitName}
                                    </td>
                                    <td className='text-right'>{_HNumber.FormatCurrency(detail.unitPrice)}</td>
                                    <td className='text-right'>
                                        {_HNumber.FormatCurrency(detail.vat ? detail.vat : 0)}&nbsp;
                                        <span className='label label-info'>{detail.vatPercent ? detail.vatPercent : 0}%</span>
                                    </td>
                                    <td className='text-right'>{_HNumber.FormatCurrency(detail.totalAmount)}</td>
                                </tr>
                            }) : <EmptyTableMessage message='Không có sản phẩm' />
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={4} className="text-right"><strong>Tổng tiền:</strong> </td>
                            <td className='text-right'><strong>{_HNumber.FormatCurrency(totalPrice)}</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
    renderInfo() {
        let docket = this.state.model.issueDocket;
        return (
            <div key='info' className='col-lg-9'>
                <div className="panel panel-info">
                    <div className="panel-body">
                        <div className="col-sm-6">
                            <LabeledText title='Loại phiếu xuất' value={docket.stockIssueDocketTypeId} />
                        </div>
                        <div className="col-sm-6">
                            <LabeledText title='Kho xuất' value={docket.warehouseId} />
                        </div>
                        <div className="col-sm-6">
                            <LabeledText title='Ngày tạo phiếu' value={_HDateTime.DateFormat(docket.executedDate)} />
                        </div>
                        <div className="col-sm-6">
                            <LabeledText title='Ghi chú' value={docket.description}/>
                        </div>
                    </div>
                </div>
                <div className="panel panel-info">
                    <div className="panel-heading">
                        <span> Khách hàng: <strong>{docket.customerName}</strong></span>
                    </div>
                    <div className="panel-body">
                        {this.renderProductsTable()}
                    </div>
                </div>
            </div>
        );
    }
    renderReview() {
        let productQuantity = 0;
        let productTotalAmount = 0;

        let { details, issueDocket } = this.state.model;
        productQuantity += details.reduce((d, l) => d + (Number(l.quantity)), 0);
        productTotalAmount += details.reduce((d, l) => d + (l.unitPrice * l.quantity + l.vat), 0);

        let totalExpend = issueDocket.totalAmount - productTotalAmount;
        return <div key='review' className="col-lg-3 col-md-6 col-sm-8 col-xs-12 pull-right">
            <SummaryText value={_HNumber.FormatNumber(productQuantity)} title='Số lượng sản phẩm:' />
            <SummaryText value={_HNumber.FormatCurrency(productTotalAmount)} title='Tổng tiền sản phẩm:' />
            <SummaryText value={_HNumber.FormatCurrency(totalExpend)} title='Tổng chi phí khác:' />
            <SummaryText value={_HNumber.FormatCurrency(issueDocket.totalAmount)} title='Tổng tiền trên phiếu:' />
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
                                <li className="breadcrumb-item"><NavLink to="/quanlyxuat">Quản lý xuất</NavLink></li>
                                <li className="breadcrumb-item active" aria-current="page">Chi tiết</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                {this.state.model ?
                    [
                        this.renderInfo(),
                        this.renderReview()
                    ]
                    : <div className="icon-loading"></div>
                }
            </div>
        );
    }
}