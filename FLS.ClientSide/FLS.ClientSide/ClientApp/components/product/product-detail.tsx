import * as React from "react";
import PropTypes from 'prop-types';
import { RouteComponentProps } from "react-router";
import { NavLink } from "react-router-dom";
import { _HString, _HNumber } from "../../handles/handles";
import { ProductAPICaller, CacheAPI } from "../../api-callers";
import { ProductDetailModel, ProductModel } from "../../models/product";
import { SummaryText, EmptyTableMessage } from "../shared/view-only";
import { ProductUnitProductRow } from "./unit/product-unit-product-row";
import { ProductUnitProductNew } from "./unit/product-unit-product-new";
import { LabeledInput, LabeledSelect, LabeledTextArea } from "../shared/input/labeled-input";
import { IdNameModel } from "ClientApp/models/shared";
import { Button } from "react-bootstrap";
import { cloneDeep } from "lodash";

interface ProductDetailStates {
    product: ProductDetailModel,
    isLoading: boolean,
    errorList: any,
    productGroups: any,
    productSubGroupFilter: any,
    productSubGroups: any,
    taxPercents: any,
    productUnits: any,
    isDisable: boolean
}
export class ProductDetail extends React.Component<RouteComponentProps<any>, ProductDetailStates>{
    productId: number;
    constructor(props: any) {
        super(props)
        this.props = props;
        this.state = {
            product: null,
            isLoading: true,
            errorList: {},
            productGroups: [],
            productSubGroups: [],
            productSubGroupFilter: [],
            taxPercents: [],
            productUnits: [],
            isDisable: true
        }
    }
    static contextTypes = {
        ShowGlobalMessage: PropTypes.func,
        ShowGlobalMessageList: PropTypes.func,
    }

    async componentDidMount() {
        let productGroups = await CacheAPI.ProductGroup();
        let productSubGroups = await CacheAPI.ProductSubgroup();
        let taxPercents = await CacheAPI.TaxPercent();
        let productUnits = await CacheAPI.ProductUnit();
        this.setState({ productGroups: productGroups.data, productSubGroups: productSubGroups.data, taxPercents: taxPercents.data, productUnits: productUnits.data });

        var params = this.props.match.params;
        if (_HNumber.IsNumber(params.productId)) {
            this.productId = Number(params.productId);
            await this.getProductDetail();
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
            let { product } = this.state;
            if (product.productGroupId > 0) {
                let { productSubGroups } = this.state;
                let productSubGroupFilter = productSubGroups.filter(function (item) {
                    return item.parentId == product.productGroupId;
                });
                this.setState({ productSubGroupFilter: productSubGroupFilter, isDisable: false });
            }
            else {
                this.setState({ productSubGroupFilter: [], isDisable: true });
            }
        }
        if (detail.hasWarning) {
            this.context.ShowGlobalMessageList('warning', detail.warnings);
        }
    }
    onFieldValueChange(model: any) {
        const nextState = {
            ...this.state,
            product: {
                ...this.state.product,
                [model.name]: model.value,
            }
        };
        this.setState(nextState);
        if (model.name == "productGroupId") {
            if (Number(model.value) > 0) {
                let { productSubGroups } = this.state;
                let productSubGroupFilter = productSubGroups.filter(function (item) {
                    return item.parentId == model.value;
                });
                this.setState({ productSubGroupFilter: productSubGroupFilter, isDisable: false });
            }
            else {
                this.setState({ productSubGroupFilter: [], isDisable: true });
            }
        }
    }
    private _validate() {
        var errors = {};
        let { product } = this.state;
        if (_HString.IsNullOrEmpty(product.name)) {
            errors['name'] = 'Chưa nhập tên sản phẩm';
        }
        if (!product.productGroupId) {
            errors['productGroupId'] = 'Chưa chọn ngành hàng';
        }
        if (!product.productSubgroupId) {
            errors['productSubgroupId'] = 'Chưa chọn nhóm hàng';
        }
        if (!product.defaultUnitId) {
            errors['defaultUnitId'] = 'Chưa chọn đơn vị tính';
        }
        if (!product.taxPercent) {
            errors['taxPercent'] = 'Chưa chọn thuế';
        }
        return errors;
    }

    async onFormSubmit() {
        var errors = this._validate();
        if (Object.keys(errors).length > 0) {
            this.setState({
                errorList: errors
            });
            return;
        }
        let productUpdate = new ProductModel();
        productUpdate = cloneDeep(this.state.product);

        let response = await ProductAPICaller.Update(productUpdate);
        if (!response.hasError) {
            this.context.ShowGlobalMessage('success', 'Cập nhật sản phẩm thành công');
        } else {
            this.context.ShowGlobalMessageList('error', response.errors);
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
                    <div className="col-sm-12 col-md-6 col-lg-4">
                        <LabeledInput
                            readOnly={true}
                            name={'id'}
                            value={product.id}
                            title={'Mã sản phẩm'}
                            placeHolder={'Mã sản phẩm'}
                            error={this.state.errorList['id']}
                            valueChange={this.onFieldValueChange.bind(this)} />
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-4">
                        <LabeledInput
                            name={'name'}
                            value={product.name}
                            title={'Tên sản phẩm'}
                            placeHolder={'Tên sản phẩm'}
                            error={this.state.errorList['name']}
                            valueChange={this.onFieldValueChange.bind(this)} />
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-4">
                        <LabeledSelect
                            options={this.state.productGroups}
                            name={'productGroupId'}
                            value={product.productGroupId}
                            title={'Ngành hàng'}
                            placeHolder={'Chọn ngành hàng'}
                            error={this.state.errorList['productGroupId']}
                            valueChange={this.onFieldValueChange.bind(this)} />
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-4">
                        <LabeledSelect
                            options={this.state.productSubGroupFilter}
                            name={'productSubgroupId'}
                            value={product.productSubgroupId}
                            title={'Nhóm hàng'}
                            placeHolder={'Chọn nhóm hàng'}
                            disabled={this.state.isDisable}
                            error={this.state.errorList['productSubgroupId']}
                            valueChange={this.onFieldValueChange.bind(this)} />
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-4">
                        <LabeledSelect
                            options={this.state.productUnits}
                            name={'defaultUnitId'}
                            value={product.defaultUnitId}
                            title={'Đơn vị tính'}
                            placeHolder={'Đơn vị tính'}
                            error={this.state.errorList['defaultUnitId']}
                            valueChange={this.onFieldValueChange.bind(this)} />
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-4">
                        <LabeledSelect
                            options={this.state.taxPercents}
                            name={'taxPercent'}
                            value={product.taxPercent}
                            nameKey='name'
                            valueKey='value'
                            title={'Thuế'}
                            placeHolder={'Chọn loại thuế'}
                            error={this.state.errorList['taxPercent']}
                            valueChange={this.onFieldValueChange.bind(this)} />
                    </div>
                    <div className="col-sm-12">
                        <LabeledTextArea
                            rows={3}
                            name={'description'}
                            value={product.description}
                            title={'Mô tả'}
                            placeHolder={'Mô tả'}
                            error={this.state.errorList['description']}
                            valueChange={this.onFieldValueChange.bind(this)} />
                    </div>
                    <div className="mg-bt-15 col-sm-12 text-right">
                        <Button bsStyle="primary" onClick={this.onFormSubmit.bind(this)}>{'Cập nhật'} </Button>
                    </div>
                </div>
            </div>
            <div className="panel panel-info">
                <div className="panel-body pd-0">
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
                                listUnitForProduct={product.productUnits}
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