import * as React from "react";
import { NavLink } from "react-router-dom";
import { RouteComponentProps } from 'react-router';
import PropTypes from 'prop-types';
import { _HDateTime, _HArray, _HNumber, _HString } from "../../handles/handles";
import { StockReceiveDocketModel } from "../../models/stock-receive-docket";
import { ImportAPICaller } from "../../api-callers/import";
import { LabeledText } from "../shared/input/labeled-input";
import { EmptyTableMessage, SummaryText } from "../shared/view-only";

interface ImportStockStates {
    receiveDocket: StockReceiveDocketModel;
    suppliers: Supplier[];
}
class Supplier {
    supplierBranchId: number;
    supplierBranchName: string;
    details: any;
}
export class ImportDetail extends React.Component<RouteComponentProps<any>, ImportStockStates> {
    constructor(props: any) {
        super(props)
        this.state = {
            receiveDocket: new StockReceiveDocketModel(),
            suppliers: [] as Supplier[],
        }
    }
    static contextTypes = {
        ShowGlobalMessage: PropTypes.func,
        ShowGlobalMessageList: PropTypes.func,
    }
    async componentDidMount() {
        var params = this.props.match.params;
        if (!_HString.IsNullOrEmpty(params.docketId)) {
            let detail = await ImportAPICaller.Detail(Number(params.docketId));
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
        let { receiveDocket, details } = data;
        let supplierIds = new Set();
        details.map((d) => {
            supplierIds.add(d.supplierBranchId);
        });
        let suppliers: Supplier[] = [];
        for (let id of supplierIds) {
            let ds = details.filter(d => d.supplierBranchId == id);
            if (ds) {
                let supplier: Supplier = {
                    supplierBranchId: id,
                    supplierBranchName: ds[0].supplierBranchName,
                    details: ds,
                }
                suppliers.push(supplier);
            }
        }
        this.setState({ receiveDocket, suppliers });
    }
    renderSuppliers() {
        let { suppliers } = this.state;
        return suppliers.map((supplier) => {
            return <div key={'splr-' + supplier.supplierBranchId}>
                <div className="panel panel-info panne-color">
                    <div className="panel-heading">
                        <div className="display-flex justify-content-between align-items-center">
                            <span> Nhà cung cấp: <strong>{supplier.supplierBranchName}</strong></span>
                        </div>
                    </div>
                    <div className="panel-body">
                        {
                            supplier.details ? this.renderProductsTable(supplier.details) : null
                        }
                    </div>
                </div>
            </div>
        })
    }
    renderProductsTable(details) {
        let totalPrice = 0;
        if (details)
            totalPrice = details.reduce((d, l) => d + (l.unitPrice * l.quantity + l.vat), 0);
        return (
            <div className="table-responsive p-relative">
                <table className="table table-striped table-hover mg-0">
                    <thead>
                        <tr>
                            <th>Tên sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Đơn giá</th>
                            <th>% VAT</th>
                            <th>VAT</th>
                            <th>Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            details.length > 0 ? details.map((detail) => {
                                return <tr key={'prdt-' + detail.productId}>
                                    <td>{detail.productName}</td>
                                    <td>{detail.quantity}</td>
                                    <td>{_HNumber.FormatCurrency(detail.unitPrice)}</td>
                                    <td>{detail.vatPercent ? detail.vatPercent : 0} %</td>
                                    <td>{_HNumber.FormatCurrency(detail.vat ? detail.vat : 0)}</td>
                                    <td>{_HNumber.FormatCurrency(detail.totalAmount)}</td>
                                </tr>
                            }) : <EmptyTableMessage message='Không có sản phẩm' />
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={5} className="text-right"><strong>Tổng tiền:</strong> </td>
                            <td colSpan={2}><strong>{_HNumber.FormatCurrency(totalPrice)}</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
    renderInfo() {
        let model = this.state.receiveDocket;
        return (
            <div id="info" className="tab-pane fade in active">
                <div className="panel panel-info">
                    <div className="panel-body">
                        <div className="col-md-6">
                            <LabeledText title='Loại phiếu nhập' value={model.stockReceiveDocketTypeId} />
                        </div>
                        <div className="col-md-6">
                            <LabeledText title='Kho nhập' value={model.warehouseId} />
                        </div>
                        <div className="col-md-6">
                            <LabeledText title='Ngày tạo phiếu' value={_HDateTime.DateFormat(model.executedDate)} />
                        </div>
                        <div className="col-md-6">
                            <LabeledText title='Ghi chú' value={model.description}/>
                        </div>
                    </div>
                </div>
                {this.renderSuppliers()}
            </div>
        );
    }
    renderReview() {
        let productQuantity = 0;
        let productTotalAmount = 0;

        let { suppliers } = this.state;
        suppliers.forEach((item) => {
            productQuantity += item.details.reduce((d, l) => d + (Number(l.quantity)), 0);
            productTotalAmount += item.details.reduce((d, l) => d + (l.unitPrice * l.quantity + l.vat), 0);
        });

        let totalAmount = productTotalAmount;
        return <div className="mg-bt-15">
            <div className="row total-review">
                <div className="col-sm-4">
                    <SummaryText value={_HNumber.FormatNumber(productQuantity)} title='Số lượng sản phẩm:' />
                </div>
                <div className="col-sm-4">
                    <SummaryText value={_HNumber.FormatCurrency(productTotalAmount)} title='Tổng tiền sản phẩm:' />
                </div>
                <div className="col-sm-4">
                    <SummaryText value={_HNumber.FormatCurrency(totalAmount)} title='Tổng tiền trên phiếu:' />
                </div>
            </div>
        </div>
    }
    render() {
        return (
            //<UnderConstructor /> ||
            <div className="content-wapper">
                <div className="row">
                    <div className="col-sm-12">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><NavLink to="/">Trang chủ</NavLink></li>
                                <li className="breadcrumb-item"><NavLink to="/quanlynhap">Quản lý nhập</NavLink></li>
                                <li className="breadcrumb-item active" aria-current="page">Chi tiết</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                {this.renderInfo()}
                {this.renderReview()}
            </div>
        );
    }
}