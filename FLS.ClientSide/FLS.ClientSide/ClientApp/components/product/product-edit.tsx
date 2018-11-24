import * as React from "react";
import { Link } from "react-router-dom";
import { RouteComponentProps } from 'react-router';
import { ProductModel } from "../../models/product";
import { Modal, Button, Alert } from "react-bootstrap";
import { FormErrors } from "../shared/form-errors";
import PropTypes from 'prop-types';
import { IdNameModel, ErrorItem } from "../../models/shared";
import * as Moment from 'moment';
import { LabeledInput, LabeledTextArea, LabeledSelect } from "../shared/input/labeled-input";
import LabeledSingleDatePicker from "../shared/date-time/labeled-single-date-picker";
import { ProductAPICaller } from "../../api-callers/product";
import { CacheAPI } from "../../api-callers/cache";
import { _HString } from "../../handles/handles";

interface IProductProps {
    isShow: boolean,
    onCloseModal: any,
    title: string,
    onFormAfterSubmit?: any,
    isEdit: boolean,
    model?: ProductModel
    productGroups: any
}

interface IProductState {
    isShow: boolean,
    model?: ProductModel,
    errorList: any,
    productSubGroups: any;
    productSubGroupFilter: any;
    productGroups: any;
    productUnits: any;
    taxPercents: any;
    isDisable: any;
}

export class ProductEdit extends React.Component<IProductProps, IProductState> {
    constructor(props: IProductProps) {
        super(props)
        this.state = {
            isShow: props.isShow,
            model: props.model ? props.model : new ProductModel(),
            errorList: {},
            productSubGroups: [],
            productSubGroupFilter: [],
            productGroups: [],
            productUnits: [],
            taxPercents: [],
            isDisable: true
        }
    }
    static contextTypes = {
        ShowGlobalMessage: PropTypes.func,
        ShowGlobalMessageList: PropTypes.func,
    }
    async componentWillMount() {
        //init comboboxes
        await this._loadDataCache();
    }

    private async _loadDataCache() {
        var productSubGroups = await CacheAPI.ProductSubgroup();
        var productUnits = await CacheAPI.ProductUnit();
        var taxPercents = await CacheAPI.TaxPercent();
        this.setState({ productSubGroups: productSubGroups.data, productUnits: productUnits.data, taxPercents: taxPercents.data });
    }

    componentWillReceiveProps(nextProps) {
        // call load data by this.props.model.id from server
        this.setState({ model: nextProps.model, isShow: nextProps.isShow, productGroups: nextProps.productGroups });
    }
    onCloseModal() {
        this.setState({ errorList: {} });
        if (this.props.onCloseModal)
            this.props.onCloseModal();
    }
    onFieldValueChange(model: any) {
        const nextState = {
            ...this.state,
            model: {
                ...this.state.model,
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
        if (_HString.IsNullOrEmpty(this.state.model.name)) {
            errors['name'] = 'Chưa nhập tên sản phẩm';
        }
        if (!this.state.model.productGroupId) {
            errors['productGroupId'] = 'Chưa chọn ngành hàng';
        }
        if (!this.state.model.productSubgroupId) {
            errors['productSubgroupId'] = 'Chưa chọn nhóm hàng';
        }
        if (!this.state.model.defaultUnitId) {
            errors['defaultUnitId'] = 'Chưa chọn đơn vị tính';
        }
        if (!this.state.model.taxPercent) {
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

        if (this.props.isEdit) {
            let response = await ProductAPICaller.Update(this.state.model);
            if (!response.hasError) {
                this.onCloseModal();
                // return succeed value to parent
                if (this.props.onFormAfterSubmit)
                    this.props.onFormAfterSubmit(true, this.state.model);
                this.context.ShowGlobalMessage('success', 'Cập nhật sản phẩm thành công');
            } else {
                this.context.ShowGlobalMessageList('error', response.errors);
            }
        } else {
            let response = await ProductAPICaller.Create(this.state.model);
            if (!response.hasError) {
                this.onCloseModal();
                // return succeed value to parent
                if (this.props.onFormAfterSubmit)
                    this.props.onFormAfterSubmit(this.state.model);
                this.context.ShowGlobalMessage('success', 'Tạo sản phẩm thành công');
            } else {
                this.context.ShowGlobalMessageList('error', response.errors);
            }
        }
    }
    render() {
        return (
            <Modal show={this.state.isShow} onHide={this.onCloseModal.bind(this)}
                className="modal-medium"
                aria-labelledby="contained-modal-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-horizontal">
                        {this.state.errorList && <FormErrors formErrors={this.state.errorList} />}
                        {
                            this.props.isEdit ?
                                <LabeledInput
                                    name={'id'}
                                    value={this.state.model.id}
                                    readOnly={true}
                                    title={'Mã sản phẩm'}
                                    placeHolder={'Mã sản phẩm'} />
                                : null
                        }
                        <LabeledInput
                            name={'name'}
                            value={this.state.model.name}
                            title={'Tên sản phẩm'}
                            placeHolder={'Tên sản phẩm'}
                            error={this.state.errorList['name']}
                            valueChange={this.onFieldValueChange.bind(this)} />
                        <LabeledSelect
                            options={this.state.productGroups}
                            name={'productGroupId'}
                            value={this.state.model.productGroupId}
                            title={'Ngành hàng'}
                            placeHolder={'Chọn ngành hàng'}
                            error={this.state.errorList['productGroupId']}
                            valueChange={this.onFieldValueChange.bind(this)} />
                        <LabeledSelect
                            options={this.state.productSubGroupFilter}
                            name={'productSubgroupId'}
                            value={this.state.model.productSubgroupId}
                            title={'Nhóm hàng'}
                            placeHolder={'Chọn nhóm hàng'}
                            disabled={this.state.isDisable}
                            error={this.state.errorList['productSubgroupId']}
                            valueChange={this.onFieldValueChange.bind(this)} />
                        <LabeledSelect
                            options={this.state.productUnits}
                            name={'defaultUnitId'}
                            value={this.state.model.defaultUnitId}
                            title={'Đơn vị tính'}
                            placeHolder={'Đơn vị tính'}
                            error={this.state.errorList['defaultUnitId']}
                            valueChange={this.onFieldValueChange.bind(this)} />
                        <LabeledSelect
                            options={this.state.taxPercents}
                            name={'taxPercent'}
                            value={this.state.model.taxPercent}
                            nameKey='name'
                            valueKey='value'
                            title={'Thuế'}
                            placeHolder={'Chọn loại thuế'}
                            error={this.state.errorList['taxPercent']}
                            valueChange={this.onFieldValueChange.bind(this)} />
                        <LabeledTextArea
                            rows={5}
                            name={'description'}
                            value={this.state.model.description}
                            title={'Mô tả'}
                            placeHolder={'Mô tả'}
                            error={this.state.errorList['description']}
                            valueChange={this.onFieldValueChange.bind(this)} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.onFormSubmit.bind(this)}>{this.props.isEdit ? 'Cập nhật' : 'Tạo'} </Button>
                    <Button onClick={this.onCloseModal.bind(this)}>Đóng</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

