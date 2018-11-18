import * as React from "react";
import PropTypes from 'prop-types';
import { RouteComponentProps } from "react-router";
import { NavLink } from "react-router-dom";
import { _HString, _HNumber } from "../../handles/handles";
import { ProductAPICaller } from "../../api-callers";
import { ProductDetailModel } from "../../models/product";
import { SummaryText, EmptyTableMessage } from "../shared/view-only";
import { ProductUnitProductRow } from "./unit/product-unit-product-row";
import { ProductUnitProductNew } from "./unit/product-unit-product-new";

interface ProductDetailStates {
    product: ProductDetailModel,
    isLoading: boolean,
}
export class ProductDetail extends React.Component<RouteComponentProps<any>, ProductDetailStates>{
    productId: number;
    constructor(props: any) {
        super(props)
        this.props = props;
        this.state = {
            product: null,
            isLoading: true,
        }
    }
    static contextTypes = {
        ShowGlobalMessage: PropTypes.func,
        ShowGlobalMessageList: PropTypes.func,
    }
    componentDidMount() {
        var params = this.props.match.params;
        if (_HNumber.IsNumber(params.productId)) {
            this.productId = Number(params.productId);
            this.getProductDetail();
        }
        else {
            this.context.ShowGlobalMessage('error', 'Mã sản phẩm không hợp lệ');
            this.props.history.push('/sanpham');
        }
    }
    async getProductDetail() {
        let detail = await ProductAPICaller.Detail(this.productId);
        if (detail.hasError) {
            this.context.ShowGlobalMessageList('error', detail.errors);
            this.setState({ product: null, isLoading: false });
        }
        else {
            this.setState({ product: detail.data, isLoading: false });
        }
        if (detail.hasWarning) {
            this.context.ShowGlobalMessageList('warning', detail.warnings);
        }
    }
    onEditUnit(unit) {
        console.log(unit)
    }
    private renderBody() {
        let { product } = this.state;
        if (!product) return null;
        return <div id="info">
            <div className="panel panel-info">
                <div className="panel-body pd-bt-0">
                    <div className='row'>
                        <SummaryText className='col-sm-12 col-md-6 col-lg-4' value={product.id} title='Mã' />
                        <SummaryText className='col-sm-12 col-md-6 col-lg-4' value={product.name} title='Tên' />
                        <SummaryText className='col-sm-12 col-md-6 col-lg-4' value={product.productGroupId} title='Ngành hàng' />
                        <SummaryText className='col-sm-12 col-md-6 col-lg-4' value={product.productSubgroupId} title='Nhóm hàng' />
                        <SummaryText className='col-sm-12 col-md-6 col-lg-4' value={product.defaultUnitId} title='Đơn vị tính chuẩn' />
                        <SummaryText className='col-sm-12 col-md-6 col-lg-4' value={product.taxPercent + '%'} title='Thuế' />
                    </div>
                    {product.productUnits ? <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Mã</th>
                                <th>Đơn vị</th>
                                <th>Giá trị đơn vị tính chuẩn</th>
                                <th className="th-sm-2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <ProductUnitProductNew
                                productId={product.id}
                                defaultUnitId={product.defaultUnitId}
                                defaultUnitName={product.defaultUnitName}
                                afterUpdate={() => { this.getProductDetail() }} />
                            {product.productUnits.length == 0 ?
                                null :
                                product.productUnits.map(unit => {
                                    return <ProductUnitProductRow
                                        key={unit.id}
                                        defaultUnitId={product.defaultUnitId}
                                        defaultUnitName={product.defaultUnitName}
                                        model={unit}
                                        afterUpdate={() => { this.getProductDetail() }}
                                    />
                                })
                            }
                        </tbody>
                    </table> : null
                    }
                </div>
            </div>
        </div>
    }
    render() {
        return <div className="content-wapper">
            <div className="row">
                <div className="col-sm-12">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><NavLink to="/">Trang chủ</NavLink></li>
                            <li className="breadcrumb-item"><NavLink to="/sanpham">Sản phẩm</NavLink></li>
                            <li className="breadcrumb-item active" aria-current="page">Chi tiết</li>
                        </ol>
                    </nav>
                </div>
            </div>
            {this.renderBody()}
        </div>
    }
}