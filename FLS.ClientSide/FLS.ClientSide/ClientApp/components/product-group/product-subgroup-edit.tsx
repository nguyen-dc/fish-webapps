import * as React from "react";
import { RouteComponentProps } from 'react-router';
import { Modal, Button } from 'react-bootstrap';
import { ProductSubGroupModel } from "../../models/product-subgroup";
import { FormErrors } from "../shared/form-errors";
import { ProductSubGroupAPICaller } from "../../api-callers/product-subgroup";
import { _HString } from "../../handles/handles";
import { CacheAPI } from "../../api-callers/cache";
import { LabeledInput, LabeledSelect, LabeledTextArea } from "../shared/input/labeled-input";

interface IProductSubGroupProps {
    isShow: boolean,
    onCloseModal: any,
    title: string,
    onFormAfterSubmit?: any,
    isEdit: boolean,
    model?: ProductSubGroupModel
    productGroups: any
}

interface IProductSubGroupState {
    isShow: boolean,
    model?: ProductSubGroupModel,
    errorList: any,
    productGroups: any
}

export class ProductSubGroupEdit extends React.Component<IProductSubGroupProps, IProductSubGroupState>  {
    constructor(props: IProductSubGroupProps) {
        super(props)
        this.state = {
            isShow: props.isShow,
            model: props.model ? props.model : new ProductSubGroupModel(),
            errorList: {},
            productGroups:[]
        }
    }
    static contextTypes = {
        ShowGlobalMessage: React.PropTypes.func,
        ShowGlobalMessages: React.PropTypes.func,
    }
    async componentWillMount() {
        //init comboboxes
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
    }

    private _validate() {
        var errors = {};
        if (_HString.IsNullOrEmpty(this.state.model.name)) {
            errors['name'] = 'Chưa nhập tên nhóm hàng';
        }
        if (!this.state.model.productGroupId) {
            errors['farmRegionId'] = 'Chưa chọn ngành hàng';
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
            let response = await ProductSubGroupAPICaller.Update(this.state.model);
            if (!response.hasError) {
                this.onCloseModal();
                // return succeed value to parent
                if (this.props.onFormAfterSubmit)
                    this.props.onFormAfterSubmit(true, this.state.model);
                this.context.ShowGlobalMessage('success', 'Cập nhật nhóm hàng thành công');
            } else {
                this.context.ShowGlobalMessages('error', response.errors);
            }
        } else {
            let response = await ProductSubGroupAPICaller.Create(this.state.model);
            if (!response.hasError) {
                this.onCloseModal();
                // return succeed value to parent
                if (this.props.onFormAfterSubmit)
                    this.props.onFormAfterSubmit(this.state.model);
                this.context.ShowGlobalMessage('success', 'Tạo nhóm hàng thành công');
            } else {
                this.context.ShowGlobalMessages('error', response.errors);
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
                    <form className="form-horizontal">
                        {this.state.errorList && <FormErrors formErrors={this.state.errorList} />}
                        {
                            this.props.isEdit ?
                                <LabeledInput
                                    name={'id'}
                                    value={this.state.model.id}
                                    readOnly={true}
                                    title={'Mã ao'}
                                    placeHolder={'Mã ao nuôi'} />
                                : null
                        }
                        <LabeledInput
                            name={'name'}
                            value={this.state.model.name}
                            title={'Tên nhóm hàng'}
                            placeHolder={'Tên nhóm hàng'}
                            error={this.state.errorList['name']}
                            valueChange={this.onFieldValueChange.bind(this)} />
                        <LabeledSelect
                            options={this.state.productGroups}
                            name={'productGroupId'}
                            value={this.state.model.productGroupId}
                            title={'Chọn ngành hàng'}
                            placeHolder={'Chọn ngành hàng'}
                            error={this.state.errorList['productGroupId']}
                            valueChange={this.onFieldValueChange.bind(this)} />
                        <LabeledTextArea
                            rows={5}
                            name={'description'}
                            value={this.state.model.description}
                            title={'Mô tả'}
                            placeHolder={'Mô tả'}
                            error={this.state.errorList['description']}
                            valueChange={this.onFieldValueChange.bind(this)} />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.onFormSubmit.bind(this)}>{this.props.isEdit ? 'Cập nhật' : 'Tạo'} </Button>
                    <Button onClick={this.onCloseModal.bind(this)}>Đóng</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

