import * as React from "react";
import { Link } from "react-router-dom";
import { RouteComponentProps } from 'react-router';
import { StockReceiveDocketTypeModel } from "../../models/stock-receive-docket-type";
import { Modal, Button, Alert } from "react-bootstrap";
import { FormErrors } from "../shared/form-errors";
import { IdNameModel, ErrorItem } from "../../models/shared";
import * as Moment from 'moment';
import { LabeledInput, LabeledTextArea, LabeledSelect, LabeledCheckBox } from "../shared/input/labeled-input";
import LabeledSingleDatePicker from "../shared/date-time/labeled-single-date-picker";
import { StockReceiveDocketTypeAPICaller } from "../../api-callers/stock-receive-docket-type";
import { _HString } from "../../handles/handles";
import { CacheAPI } from "../../api-callers/cache";

export class StockReceiveDocketTypeEdit extends React.Component<IStockReceiveDocketTypeProps, IStockReceiveDocketTypeState> {
    constructor(props: IStockReceiveDocketTypeProps){
        super(props)
        this.state = {
            isShow: props.isShow,
            model: props.model ? props.model : new StockReceiveDocketTypeModel(),
            payslipTypes: [],
            errorList: {},
        }
    }
    async componentDidMount() {
        //init comboboxes
        var payslipTypes = await CacheAPI.PayslipType();
        this.setState({ payslipTypes: payslipTypes.data });
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
            let request = await StockReceiveDocketTypeAPICaller.Update(this.state.model).then(response => {
                if (response.ok) {
                    this.onCloseModal();
                    // return succeed value to parent
                    if (this.props.onFormAfterSubmit)
                        this.props.onFormAfterSubmit(true, this.state.model);
                }
            });
        } else {
            let request = await StockReceiveDocketTypeAPICaller.Create(this.state.model).then(response => {
                if (response.ok) {
                    this.onCloseModal();
                    // return succeed value to parent
                    if (this.props.onFormAfterSubmit)
                        this.props.onFormAfterSubmit(this.state.model);
                }
            });
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
                        {this.state.errorList && <FormErrors formErrors={this.state.errorList} /> }
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
                        <LabeledSelect
                            options={this.state.payslipTypes}
                            name={'payslipTypeId'}
                            value={this.state.model.payslipTypeId}
                            title={'Loại phiếu chi'}
                            placeHolder={'Loại phiếu chi'}
                            error={this.state.errorList['payslipTypeId']}
                            valueChange={this.onFieldValueChange.bind(this)} />
                        <LabeledCheckBox
                            name={'approvalNeeded'}
                            value={this.state.model.approvalNeeded}
                            text={'Cần duyệt'}
                            error={this.state.errorList['approvalNeeded']}
                            valueChange={this.onFieldValueChange.bind(this)} />
                        <LabeledCheckBox
                            name={'payslipNeeded'}
                            value={this.state.model.payslipNeeded}
                            text={'Cần phiếu chi'}
                            error={this.state.errorList['payslipNeeded']}
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

interface IStockReceiveDocketTypeProps {
    isShow: boolean,
    onCloseModal: any,
    title: string,
    onFormAfterSubmit?: any,
    isEdit: boolean,
    model?: StockReceiveDocketTypeModel,
}

interface IStockReceiveDocketTypeState {
    isShow: boolean,
    model?: StockReceiveDocketTypeModel,
    errorList: any,
    payslipTypes: any,
}