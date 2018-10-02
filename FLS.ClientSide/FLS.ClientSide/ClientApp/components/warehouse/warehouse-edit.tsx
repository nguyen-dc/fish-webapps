import * as React from "react";
import { Link } from "react-router-dom";
import { RouteComponentProps } from 'react-router';
import { WarehouseModel } from "../../models/warehouse";
import { Modal, Button, Alert } from "react-bootstrap";
import { FormErrors } from "../shared/form-errors";
import { IdNameModel, ErrorItem, ResponseConsult } from "../../models/shared";
import * as Moment from 'moment';
import { LabeledInput, LabeledTextArea, LabeledSelect } from "../shared/input/labeled-input";
import LabeledSingleDatePicker from "../shared/date-time/labeled-single-date-picker";
import { WarehouseAPICaller } from "../../api-callers/warehouse";
import { _HString } from "../../handles/handles";

export class WarehouseEdit extends React.Component<IWarehouseProps, IWarehouseState> {
    constructor(props: IWarehouseProps) {
        super(props)
        this.state = {
            isShow: props.isShow,
            model: props.model ? props.model : new WarehouseModel(),
            errorList: {}
        }
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
            let result = await WarehouseAPICaller.Update(this.state.model) as ResponseConsult;
            return this.onSuccessCallApi(result);
        }
        else {
            let result = await WarehouseAPICaller.Create(this.state.model) as ResponseConsult;
            return this.onSuccessCallApi(result);
        }
    }
    private onSuccessCallApi(result: ResponseConsult) {
        if (!result) { return; }
        if (result.hasError) {
            this.context.ShowGlobalMessages('error', result.errors);
        } else {
            this.onCloseModal();
            if (this.props.onFormAfterSubmit)
                this.props.onFormAfterSubmit(true, this.state.model);
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
}

interface IWarehouseState {
    isShow: boolean,
    model?: WarehouseModel,
    errorList: any,
}