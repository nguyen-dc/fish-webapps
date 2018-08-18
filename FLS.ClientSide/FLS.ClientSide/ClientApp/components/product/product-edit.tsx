import * as React from "react";
import { RouteComponentProps } from 'react-router';
import { Modal, Button } from 'react-bootstrap';
import { Input } from '../shared/SingleInput';
import { TextArea } from '../shared/TextArea';
import { Select } from '../shared/Select';
import { ProductModel } from "../../models/product";
import { FormErrors } from "../shared/FormErrors";

interface IProductEditProps {
    isShow: boolean,
    handleClose: any,
    title: string;
    handleFormSubmit: any;
    onFieldValueChange: any;
    product: ProductModel;
    isEdit: boolean;
    productGroups: any;
    productSubgroups: any;
    productUnits: any;
    taxPercents: any;
    formErrors: {}
}

export class ProductEdit extends React.Component<IProductEditProps, any>  {
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
                            <label className="control-label col-xs-3" htmlFor="firstName">Tên sản phẩm:</label>
                            <div className="col-xs-9">
                                <Input
                                    inputType={'text'}
                                    name={'name'}
                                    onChange={this.props.onFieldValueChange}
                                    value={this.props.product.name}
                                    required={false}
                                    error={this.props.formErrors['name']}
                                    placeholder={'Tên sản phẩm'} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-xs-3" htmlFor="firstName">Nhóm hàng:</label>
                            <div className="col-xs-9">
                                <Select
                                    name={'productGroupId'}
                                    onChange={this.props.onFieldValueChange}
                                    value={this.props.product.productGroupId}
                                    error={this.props.formErrors['productGroupId']}
                                    placeholder={'chọn nhóm hàng'}
                                    selectedOption={this.props.product.productGroupId}
                                    options={this.props.productGroups}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-xs-3" htmlFor="firstName">Ngành hàng:</label>
                            <div className="col-xs-9">
                                <Select
                                    name={'productSubgroupId'}
                                    onChange={this.props.onFieldValueChange}
                                    value={this.props.product.productSubgroupId}
                                    error={this.props.formErrors['productSubgroupId']}
                                    placeholder={'chọn ngành hàng'}
                                    selectedOption={this.props.product.productSubgroupId}
                                    options={this.props.productSubgroups}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-xs-3" htmlFor="firstName">Đơn vị tính:</label>
                            <div className="col-xs-9">
                                <Select
                                    name={'defaultUnitId'}
                                    onChange={this.props.onFieldValueChange}
                                    value={this.props.product.name}
                                    error={this.props.formErrors['defaultUnitId']}
                                    placeholder={'chọn đơn vị tính'}
                                    selectedOption={this.props.product.defaultUnitId}
                                    options={this.props.productUnits}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-xs-3" htmlFor="firstName">Thuế %:</label>
                            <div className="col-xs-9">
                                <Select
                                    name={'taxPercentId'}
                                    onChange={this.props.onFieldValueChange}
                                    value={this.props.product.name}
                                    error={this.props.formErrors['taxPercentId']}
                                    placeholder={'Chọn mức thuế'}
                                    selectedOption={this.props.product.taxPercentId}
                                    options={this.props.taxPercents}
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
                                    value={this.props.product.description}
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

