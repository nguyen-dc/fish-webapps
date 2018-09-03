import * as React from "react";
import { Link } from "react-router-dom";
import { RouteComponentProps } from 'react-router';
import { ProductUnitModel } from "../../models/product-unit";
import { Modal, Button, Alert } from "react-bootstrap";
import { FormErrors } from "../shared/FormErrors";
import { IdNameModel, ErrorItem } from "../../models/shared";
import * as Moment from 'moment';
import { LabeledInput, LabeledTextArea, LabeledSelect, LabeledCheckBox } from "../shared/input/labeled-input";
import LabeledSingleDatePicker from "../shared/date-time/labeled-single-date-picker";
import { ProductUnitAPICaller } from "../../api-callers/product-unit";
import { StringHandle } from "../../handles/handles";

export class ProductUnitEdit extends React.Component<IProductUnitProps, IProductUnitState> {
    constructor(props: IProductUnitProps){
        super(props)
        this.state = {
            isShow: props.isShow,
            model: props.model ? props.model : new ProductUnitModel(),
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
        if (StringHandle.IsNullOrEmpty(this.state.model.name)) {
            errors['name'] = 'Chưa nhập tên đơn vị tính';
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
            let request = await ProductUnitAPICaller.Update(this.state.model).then(response => {
                if (response.ok) {
                    this.onCloseModal();
                    // return succeed value to parent
                    if (this.props.onFormAfterSubmit)
                        this.props.onFormAfterSubmit(true, this.state.model);
                }
            });
        } else {
            let request = await ProductUnitAPICaller.Create(this.state.model).then(response => {
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
                        {this.state.errorList ? <FormErrors formErrors={this.state.errorList} /> : null}
                        {
                            this.props.isEdit ? 
                                <LabeledInput
                                    name={'id'}
                                    value={this.state.model.id}
                                    readOnly={true}
                                    title={'Mã đơn vị sản phẩm'}
                                    placeHolder={'Mã đơn vị sản phẩm'}/>
                            : null
                        }
                        <LabeledInput
                            name={'name'}
                            value={this.state.model.name}
                            title={'Tên đơn vị sản phẩm'}
                            placeHolder={'Tên đơn vị sản phẩm'}
                            error={this.state.errorList['name']}
                            valueChange={this.onFieldValueChange.bind(this)} />
                        <LabeledCheckBox
                            name={'hasScale'}
                            value={this.state.model.hasScale}
                            text={'Có số lẻ'}
                            error={this.state.errorList['hasScale']}
                            valueChange={this.onFieldValueChange.bind(this)}/>
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

interface IProductUnitProps {
    isShow: boolean,
    onCloseModal: any,
    title: string,
    onFormAfterSubmit?: any,
    isEdit: boolean,
    model?: ProductUnitModel,
}

interface IProductUnitState {
    isShow: boolean,
    model?: ProductUnitModel,
    errorList: any,
}