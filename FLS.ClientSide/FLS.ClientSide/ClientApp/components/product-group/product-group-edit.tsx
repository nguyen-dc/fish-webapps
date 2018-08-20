import * as React from "react";
import { RouteComponentProps } from 'react-router';
import { Modal, Button } from 'react-bootstrap';
import { Input } from '../shared/SingleInput';
import { TextArea } from '../shared/TextArea';
import { Select } from '../shared/Select';
import { ProductGroupModel } from "../../models/product-group";
import { FormErrors } from "../shared/FormErrors";
import { ProductGroups } from "./product-group";
import { StringHandle } from "../../handles/handles";
import { ProductGroupAPICaller } from "../../api-callers/product-group";
import { LabeledInput, LabeledTextArea } from "../shared/input/labeled-input";

interface IProductGroupProps {
    isShow: boolean,
    onCloseModal: any,
    title: string,
    onFormAfterSubmit?: any,
    isEdit: boolean,
    model?: ProductGroupModel,
}

interface IProductGroupState {
    isShow: boolean,
    model?: ProductGroupModel,
    errorList: any,
}

export class ProductGroupEdit extends React.Component<IProductGroupProps, IProductGroupState>  {
    constructor(props: IProductGroupProps) {
        super(props)
        this.state = {
            isShow: props.isShow,
            model: props.model ? props.model : new ProductGroupModel(),
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
            errors['name'] = 'Chưa nhập tên nghành hàng';
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
            let request = await ProductGroupAPICaller.Update(this.state.model).then(response => {
                if (response.ok) {
                    this.onCloseModal();
                    // return succeed value to parent
                    if (this.props.onFormAfterSubmit)
                        this.props.onFormAfterSubmit(true, this.state.model);
                }
            });
        } else {
            let request = await ProductGroupAPICaller.Create(this.state.model).then(response => {
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
                bsSize="large"
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
                                    title={'Mã ngành hàng'}
                                    placeHolder={'Mã ngành hàng'} />
                                : null
                        }
                        <LabeledInput
                            name={'name'}
                            value={this.state.model.name}
                            title={'Tên ngành hàng'}
                            placeHolder={'Tên ngành hàng'}
                            error={this.state.errorList['name']}
                            valueChange={this.onFieldValueChange.bind(this)} />
                        <LabeledTextArea
                            name={'description'}
                            rows={3}
                            value={this.state.model.description}
                            title={'Mô tả'}
                            placeHolder={'Mô tả chi tiết'}
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

