import * as React from "react";
import { NavLink } from "react-router-dom";
import * as Moment from 'moment';
import PropTypes from 'prop-types';
import { ReleaseStockSupplierModel } from "../../../models/import-stock";
import { Button, Glyphicon } from "react-bootstrap";
import { ProductModel } from "../../../models/product";
import { LabeledInput } from "../../shared/input/labeled-input";
import LabeledSingleDatePicker from "../../shared/date-time/labeled-single-date-picker";
import { _HNumber } from "../../../handles/handles";
import { InputNumber } from "../../shared/input/input-number";
import { isEqual } from "lodash";

interface ReleaseLivestockSupplierProps {
    supplier: ReleaseStockSupplierModel;
    taxPercent: number;
    onChange: Function;
    onRemove: Function;
}
interface ReleaseLivestockSupplierState {
}
export class ReleaseLivestockSupplier extends React.Component<ReleaseLivestockSupplierProps, ReleaseLivestockSupplierState> {
    constructor(props: any) {
        super(props)
        this.state = {
        }
    }
    renderInfo() {
        let { supplier } = this.props;
        return [
            <tr className='text-right mg-bt-15'>
                <Button
                    data-toggle="collapse"
                    href={'#collapse-' + supplier.supplierBranchId}
                    aria-expanded="false"
                    bsStyle="link">
                    Thêm thông tin hóa đơn <Glyphicon glyph='list-alt'></Glyphicon>
                </Button>
            </tr>,
            <tr key={'spplr-' + supplier.supplierBranchId}
                id={'collapse-' + supplier.supplierBranchId}
                className="collapse panel panel-default mg-bt-15">
                <td colSpan={8}>
                    <div className='col-sm-12 col-md-6 col-lg-3'>
                        <LabeledInput
                            name={'billTemplateCode'}
                            value={supplier.billTemplateCode}
                            title={'Mẫu số hóa đơn'}
                            placeHolder={'Mẫu số hóa đơn'}
                            valueChange={(e) => { supplier.billTemplateCode = e.value; this.props.onChange() }} />
                    </div>
                    <div className='col-sm-12 col-md-6 col-lg-3'>
                        <LabeledInput
                            name={'billSerial'}
                            value={supplier.billSerial}
                            title={'Số hiệu hóa đơn'}
                            placeHolder={'Số hiệu hóa đơn'}
                            valueChange={(e) => { supplier.billSerial = e.value; this.props.onChange() }} />
                    </div>
                    <div className='col-sm-12 col-md-6 col-lg-3'>
                        <LabeledInput
                            name={'billCode'}
                            value={supplier.billCode}
                            title={'Số hóa đơn'}
                            placeHolder={'Số hóa đơn'}
                            valueChange={(e) => { supplier.billCode = e.value; this.props.onChange() }} />
                    </div>
                    <div className='col-sm-12 col-md-6 col-lg-3'>
                        <LabeledSingleDatePicker
                            name={'billDate'}
                            title={'Ngày hóa đơn'}
                            date={Moment()}
                            dateChange={(e) => { supplier.billDate = e.value; this.props.onChange() }} />
                    </div>
                    <div className='col-sm-12 col-md-6 col-lg-3'>
                        <Button bsStyle='default' className='btn-sm'
                            onClick={() => this.props.onRemove()}>
                            <Glyphicon glyph='remove' />
                        </Button>
                    </div>
                </td>
            </tr>
        ]
    }
    render() {
        let { supplier, taxPercent } = this.props;
        return supplier ?
            <tr>
                <td>{supplier.supplierBranchName}</td>
                <td>
                    <InputNumber
                        suffix='gr/c'
                        value={supplier.size}
                        hasScale={true}
                        onChange={(e) => { supplier.size = e; this.props.onChange(); }}
                    />
                </td>
                <td>
                    <InputNumber
                        suffix='kg'
                        value={supplier.massAmount}
                        hasScale={true}
                        onChange={(e) => {
                            supplier.massAmount = e;
                            supplier.amount = supplier.massAmount * supplier.pricePerKg;
                            supplier.vat = (supplier.amount * taxPercent) / 100;
                            supplier.totalAmount = _HNumber.Sum(supplier.amount, supplier.vat);
                            console.log(supplier)
                            this.props.onChange();
                        }}
                    />
                </td>
                <td>
                    <InputNumber
                        suffix='đ'
                        value={supplier.pricePerKg}
                        hasScale={true}
                        onChange={(e) => {
                            supplier.pricePerKg = e;
                            supplier.amount = supplier.massAmount * supplier.pricePerKg;
                            supplier.vat = (supplier.amount * taxPercent) / 100;
                            supplier.totalAmount = _HNumber.Sum(supplier.amount, supplier.vat);
                            this.props.onChange();
                        }}
                    />
                </td>
                <td>{_HNumber.FormatDecimal(supplier.vat)}</td>
                <td>
                    <InputNumber
                        suffix='đ'
                        value={supplier.totalAmount}
                        hasScale={true}
                        onChange={(value) => {
                            supplier.totalAmount = Number(value);
                            if (supplier.massAmount == 0)
                                supplier.pricePerKg = (supplier.totalAmount / _HNumber.Sum(100, taxPercent) * 100);
                            else
                                supplier.pricePerKg = (supplier.totalAmount / _HNumber.Sum(100, taxPercent) * 100 / supplier.massAmount);
                            supplier.amount = supplier.massAmount * supplier.pricePerKg;
                            supplier.vat = (supplier.amount * taxPercent) / 100;
                            this.props.onChange();
                        }}
                    />
                </td>
                <td>
                    <InputNumber
                        suffix='con'
                        value={supplier.quantity}
                        hasScale={true}
                        onChange={(e) => { supplier.quantity = e; this.props.onChange(); }}
                    />
                </td>
                <td>
                    <Button bsStyle='default' className='btn-sm'
                        onClick={() => this.props.onRemove()}>
                        <Glyphicon glyph='remove' />
                    </Button>
                </td>
            </tr> : null
    }
}