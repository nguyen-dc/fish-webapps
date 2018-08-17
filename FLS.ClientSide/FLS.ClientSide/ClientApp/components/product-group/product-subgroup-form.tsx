import * as React from "react";
import { RouteComponentProps } from 'react-router';
import { Modal, Button } from 'react-bootstrap';
import { Input } from '../shared/SingleInput';
import { TextArea } from '../shared/TextArea';
import { Select } from '../shared/Select';
import { ProductSubGroupModel } from "../../models/product-subgroup";
import { FormErrors } from "../shared/FormErrors";

interface ProductSubGroupFormProps {
    isShow: boolean,
    handleClose: any,
    title: string;
    handleFormSubmit: any;
    onFieldValueChange: any;
    productSubGroup: ProductSubGroupModel;
    isEdit: boolean;
    options: any;
    formErrors: {}
}

export class ProductSubGroupForm extends React.Component<ProductSubGroupFormProps, any>  {
    constructor(props: any) {
        super(props)
    }
    render() {
        let handleClose = () => { this.props.handleClose };
        return (
            <Modal show={this.props.isShow} onHide={this.props.handleClose}
                className="modal-medium"
                aria-labelledby="contained-modal-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form-horizontal" onSubmit={this.props.handleFormSubmit}>
                        {this.props.formErrors ? <FormErrors formErrors={this.props.formErrors} /> : null}
                        <div className="form-group">
                            <label className="control-label col-xs-3" htmlFor="firstName">Tên nhóm hàng:</label>
                            <div className="col-xs-9">
                                <Input
                                    inputType={'text'}
                                    name={'name'}
                                    onChange={this.props.onFieldValueChange}
                                    value={this.props.productSubGroup.name}
                                    required={false}
                                    error={this.props.formErrors['name']}
                                    placeholder={'Tên nhóm hàng'} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-xs-3" htmlFor="firstName">Ngành hàng:</label>
                            <div className="col-xs-9">
                                <Select
                                    name={'productGroupId'}
                                    onChange={this.props.onFieldValueChange}
                                    value={this.props.productSubGroup.name}
                                    error={this.props.formErrors['productGroupId']}
                                    placeholder={'chọn ngành hàng'}
                                    selectedOption={this.props.productSubGroup.productGroupId}
                                    options={this.props.options}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-xs-3" htmlFor="lastName">Mô tả:</label>
                            <div className="col-xs-9">
                                <TextArea
                                    name={'description'}
                                    onChange={this.props.onFieldValueChange}
                                    rows={5}
                                    error={this.props.formErrors['description']}
                                    value={this.props.productSubGroup.description}
                                    placeholder={'Mô tả chi tiết'} />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-xs-offset-3 col-xs-9">
                                <input type="submit" className="btn btn-primary mg-r-15" value={this.props.isEdit ? 'Cập nhật':'Thêm'}/>
                            </div>
                        </div>
                    </form>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.handleClose}>Đóng</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

