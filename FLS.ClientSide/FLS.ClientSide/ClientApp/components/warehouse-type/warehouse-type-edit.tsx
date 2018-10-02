import * as React from "react";
import { Link } from "react-router-dom";
import { RouteComponentProps } from 'react-router';
import { WarehouseTypeModel } from "../../models/warehouse-type";
import { Modal, Button, Alert } from "react-bootstrap";
import { FormErrors } from "../shared/form-errors";
import { IdNameModel, ErrorItem } from "../../models/shared";
import * as Moment from 'moment';
import { LabeledInput, LabeledTextArea, LabeledSelect } from "../shared/input/labeled-input";
import LabeledSingleDatePicker from "../shared/date-time/labeled-single-date-picker";
import { WarehouseTypeAPICaller } from "../../api-callers/warehouse-type";
import { _HString } from "../../handles/handles";

export class WarehouseTypeEdit extends React.Component<IWarehouseTypeProps, IWarehouseTypeState> {
    constructor(props: IWarehouseTypeProps){
        super(props)
        this.state = {
            isShow: props.isShow,
            model: props.model ? props.model : new WarehouseTypeModel(),
            errorList: {}
        }
    }
    static contextTypes = {
        ShowGlobalMessage: React.PropTypes.func,
        ShowGlobalMessages: React.PropTypes.func,
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
            let response = await WarehouseTypeAPICaller.Update(this.state.model);
            if (!response.hasError) {
                this.onCloseModal();
                // return succeed value to parent
                if (this.props.onFormAfterSubmit)
                    this.props.onFormAfterSubmit(true, this.state.model);
                this.context.ShowGlobalMessage('success', 'Cập nhật loại kho thành công');
            } else {
                this.context.ShowGlobalMessages('error', response.errors);
            }
        } else {
            let response = await WarehouseTypeAPICaller.Create(this.state.model);
            if (!response.hasError) {
                this.onCloseModal();
                // return succeed value to parent
                if (this.props.onFormAfterSubmit)
                    this.props.onFormAfterSubmit(this.state.model);
                this.context.ShowGlobalMessage('success', 'Tạo loại kho thành công');
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
                        {this.state.errorList ? <FormErrors formErrors={this.state.errorList} /> : null}
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

interface IWarehouseTypeProps {
    isShow: boolean,
    onCloseModal: any,
    title: string,
    onFormAfterSubmit?: any,
    isEdit: boolean,
    model?: WarehouseTypeModel,
}

interface IWarehouseTypeState {
    isShow: boolean,
    model?: WarehouseTypeModel,
    errorList: any,
}