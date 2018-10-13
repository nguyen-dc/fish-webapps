import * as React from "react";
import { WarehouseModel } from "../../models/warehouse";
import { Modal, Button } from "react-bootstrap";
import { FormErrors } from "../shared/form-errors";
import PropTypes from 'prop-types';
import { LabeledInput, LabeledSelect } from "../shared/input/labeled-input";
import { WarehouseAPICaller } from "../../api-callers/warehouse";
import { _HString } from "../../handles/handles";
import { CacheAPI } from "../../api-callers";

export class WarehouseEdit extends React.Component<IWarehouseProps, IWarehouseState> {
    constructor(props: IWarehouseProps) {
        super(props)
        this.state = {
            isShow: props.isShow,
            model: props.model ? props.model : new WarehouseModel(),
            warehouseTypes: this.props.warehouseTypes,
            errorList: {}
        }
    }
    static contextTypes = {
        ShowGlobalMessage: PropTypes.func,
        ShowGlobalMessageList: PropTypes.func,
    }
    async componentWillMount() {
        let warehouseTypes = await CacheAPI.WarehouseTypes();
        this.setState({ warehouseTypes: warehouseTypes });
    }
    componentWillReceiveProps(props) {
        // call load data by this.props.model.id from server
        ////
        this.setState({ model: props.model, isShow: props.isShow, warehouseTypes: props.warehouseTypes });
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
            errors['name'] = 'Chưa nhập tên kho';
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
            let response = await WarehouseAPICaller.Update(this.state.model);
            if (!response.hasError) {
                this.onCloseModal();
                // return succeed value to parent
                if (this.props.onFormAfterSubmit)
                    this.props.onFormAfterSubmit(true, this.state.model);
                this.context.ShowGlobalMessage('success', 'Cập nhật kho thành công');
            } else {
                this.context.ShowGlobalMessageList('error', response.errors);
            }
        } else {
            let response = await WarehouseAPICaller.Create(this.state.model);
            if (!response.hasError) {
                this.onCloseModal();
                // return succeed value to parent
                if (this.props.onFormAfterSubmit)
                    this.props.onFormAfterSubmit(this.state.model);
                this.context.ShowGlobalMessage('success', 'Tạo kho thành công');
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
                        {this.state.errorList ? <FormErrors formErrors={this.state.errorList} /> : null}
                        {
                            this.props.isEdit ?
                                <LabeledInput
                                    name={'id'}
                                    value={this.state.model.id}
                                    readOnly={true}
                                    title={'Mã kho'}
                                    placeHolder={'Mã kho'} />
                                : null
                        }
                        <LabeledSelect
                            name={'warehouseTypeId'}
                            value={this.state.model.warehouseTypeId}
                            title={'Loại kho'}
                            options={this.state.warehouseTypes}
                            placeHolder={'Loại kho'}
                            error={this.state.errorList['warehouseTypeId']}
                            valueChange={this.onFieldValueChange.bind(this)} />
                        <LabeledInput
                            name={'name'}
                            value={this.state.model.name}
                            title={'Tên kho'}
                            placeHolder={'Tên kho'}
                            error={this.state.errorList['name']}
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

interface IWarehouseProps {
    isShow: boolean,
    onCloseModal: any,
    title: string,
    onFormAfterSubmit?: any,
    isEdit: boolean,
    model?: WarehouseModel,
    warehouseTypes: any
}

interface IWarehouseState {
    isShow: boolean,
    model?: WarehouseModel,
    errorList: any,
    warehouseTypes: any
}