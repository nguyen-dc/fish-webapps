import * as React from "react";
import { Link } from "react-router-dom";
import { RouteComponentProps } from 'react-router';
import { StockIssueDocketTypeModel } from "../../models/stock-issue-docket-type";
import { Modal, Button, Alert } from "react-bootstrap";
import { FormErrors } from "../shared/FormErrors";
import { IdNameModel, ErrorItem } from "../../models/shared";
import * as Moment from 'moment';
import { LabeledInput, LabeledTextArea, LabeledSelect, LabeledCheckBox, RadioGroups } from "../shared/input/labeled-input";
import LabeledSingleDatePicker from "../shared/date-time/labeled-single-date-picker";
import { StockIssueDocketTypeAPICaller } from "../../api-callers/stock-issue-docket-type";
import { StringHandle } from "../../handles/handles";
import { CacheAPI } from "../../api-callers/cache";

const options = [
    { value: '0', label: 'Giá bằng 0' },
    { value: '1', label: 'Giá bán' },
    { value: '2', label: 'Giá vốn' }
];

export class StockIssueDocketTypeEdit extends React.Component<IStockIssueDocketTypeProps, IStockIssueDocketTypeState> {
    constructor(props: IStockIssueDocketTypeProps) {
        super(props)
        this.state = {
            isShow: props.isShow,
            model: props.model ? props.model : new StockIssueDocketTypeModel(),
            errorList: {},
            receiptTypes: []
        }
    }
    async componentDidMount() {
        //init comboboxes
        var receiptTypes = await CacheAPI.ReceiptType();
        this.setState({ receiptTypes: receiptTypes.data });
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
        if (StringHandle.IsNullOrEmpty(this.state.model.name)) {
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
            let request = await StockIssueDocketTypeAPICaller.Update(this.state.model).then(response => {
                if (response.ok) {
                    this.onCloseModal();
                    // return succeed value to parent
                    if (this.props.onFormAfterSubmit)
                        this.props.onFormAfterSubmit(true, this.state.model);
                }
            });
        } else {
            let request = await StockIssueDocketTypeAPICaller.Create(this.state.model).then(response => {
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
                        {this.state.errorList && <FormErrors formErrors={this.state.errorList} />}
                        {
                            this.props.isEdit &&
                            <LabeledInput
                                name={'id'}
                                value={this.state.model.id}
                                readOnly={true}
                                title={'Mã loại'}
                                placeHolder={'Mã loại'} />
                        }
                        <LabeledInput
                            name={'name'}
                            value={this.state.model.name}
                            title={'Tên loại'}
                            placeHolder={'Tên loại'}
                            error={this.state.errorList['name']}
                            valueChange={this.onFieldValueChange.bind(this)} />
                        <LabeledSelect
                            options={this.state.receiptTypes}
                            name={'payslipTypeId'}
                            value={this.state.model.receiptTypeId}
                            title={'Loại phiếu thu'}
                            placeHolder={'Loại phiếu thu'}
                            error={this.state.errorList['receiptTypeId']}
                            valueChange={this.onFieldValueChange.bind(this)} />
                        <LabeledCheckBox
                            name={'approvalNeeded'}
                            value={this.state.model.approvalNeeded}
                            text={'Cần duyệt'}
                            error={this.state.errorList['approvalNeeded']}
                            valueChange={this.onFieldValueChange.bind(this)} />
                        <LabeledCheckBox
                            name={'receiptNeeded'}
                            value={this.state.model.receiptNeeded}
                            text={'Cần phiếu thu'}
                            error={this.state.errorList['receiptNeeded']}
                            valueChange={this.onFieldValueChange.bind(this)} />
                        <RadioGroups
                            name={'pickingPrice'}
                            type={'radio'}
                            selectedOptions={this.state.model.pickingPrice}
                            handleOnChange={this.onFieldValueChange.bind(this)}
                            options={options} />
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

interface IStockIssueDocketTypeProps {
    isShow: boolean,
    onCloseModal: any,
    title: string,
    onFormAfterSubmit?: any,
    isEdit: boolean,
    model?: StockIssueDocketTypeModel,
}

interface IStockIssueDocketTypeState {
    isShow: boolean,
    model?: StockIssueDocketTypeModel,
    errorList: any,
    receiptTypes: any
}

