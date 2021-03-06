﻿import * as React from "react";
import { ExpenditureTypeModel } from "../../models/expenditure-type";
import { Modal, Button } from "react-bootstrap";
import { FormErrors } from "../shared/form-errors";
import PropTypes from 'prop-types';
import { LabeledInput, LabeledTextArea, LabeledCheckBox } from "../shared/input/labeled-input";
import { ExpenditureTypeAPICaller } from "../../api-callers/expenditure-type";
import { _HString } from "../../handles/handles";

export class ExpenditureTypeEdit extends React.Component<IExpenditureTypeProps, IExpenditureTypeState> {
    constructor(props: IExpenditureTypeProps){
        super(props)
        this.state = {
            isShow: props.isShow,
            model: props.model ? props.model : new ExpenditureTypeModel(),
            errorList: {}
        }
    }
    static contextTypes = {
        ShowGlobalMessage: PropTypes.func,
        ShowGlobalMessageList: PropTypes.func,
    }
    componentDidMount() {
        //init comboboxes
        ////
    }
    componentWillReceiveProps(props) {
        // call load data by this.props.model.id from server
        ////
        this.setState({ model: props.model, isShow: props.isShow });
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
            errors['name'] = 'Chưa nhập tên loại';
        }
        return errors;
    }

    async onFormSubmit(e) {
        var errors = this._validate();
        if (Object.keys(errors).length > 0) {
            this.setState({
                errorList: errors
            });
            return;
        }
        if (this.props.isEdit) {
            let response = await ExpenditureTypeAPICaller.Update(this.state.model);
            if (!response.hasError) {
                this.onCloseModal();
                // return succeed value to parent
                if (this.props.onFormAfterSubmit)
                    this.props.onFormAfterSubmit(true, this.state.model);
                this.context.ShowGlobalMessage('success', 'Cập nhật loại thu/chi thành công');
            } else {
                this.context.ShowGlobalMessageList('error', response.errors);
            }
        } else {
            let response = await ExpenditureTypeAPICaller.Create(this.state.model);
            if (!response.hasError) {
                this.onCloseModal();
                // return succeed value to parent
                if (this.props.onFormAfterSubmit)
                    this.props.onFormAfterSubmit(this.state.model);
                this.context.ShowGlobalMessage('success', 'Tạo loại thu/chi thành công');
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
                    <form className="form-horizontal">
                        {this.state.errorList && <FormErrors formErrors={this.state.errorList} />}
                        {
                            this.props.isEdit ? 
                                <LabeledInput
                                    name={'id'}
                                    value={this.state.model.id}
                                    readOnly={true}
                                    title={'Mã loại'}
                                    placeHolder={'Mã loại'}/>
                            : null
                        }
                        <LabeledInput
                            name={'name'}
                            value={this.state.model.name}
                            title={'Tên loại'}
                            placeHolder={'Tên loại'}
                            error={this.state.errorList['name']}
                            valueChange={this.onFieldValueChange.bind(this)} />
                        <LabeledCheckBox
                            name={'isReceipt'}
                            value={this.state.model.isReceipt}
                            text={'Phiếu thu'}
                            error={this.state.errorList['isReceipt']}
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

interface IExpenditureTypeProps {
    isShow: boolean,
    onCloseModal: any,
    title: string,
    onFormAfterSubmit?: any,
    isEdit: boolean,
    model?: ExpenditureTypeModel,
}

interface IExpenditureTypeState {
    isShow: boolean,
    model?: ExpenditureTypeModel,
    errorList: any,
}