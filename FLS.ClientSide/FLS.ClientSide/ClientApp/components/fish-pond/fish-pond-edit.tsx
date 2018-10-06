import * as React from "react";
import { Link } from "react-router-dom";
import { RouteComponentProps } from 'react-router';
import { FishPondModel } from "../../models/fish-pond";
import { Modal, Button, Alert } from "react-bootstrap";
import { FormErrors } from "../shared/form-errors";
import { IdNameModel, ErrorItem, ResponseConsult } from "../../models/shared";
import * as Moment from 'moment';
import { LabeledInput, LabeledTextArea, LabeledSelect } from "../shared/input/labeled-input";
import LabeledSingleDatePicker from "../shared/date-time/labeled-single-date-picker";
import { FishPondAPICaller } from "../../api-callers/fish-pond";
import { CacheAPI } from "../../api-callers/cache";
import { _HString } from "../../handles/handles";

interface IFishPondProps {
    isShow: boolean,
    onCloseModal: any,
    title: string,
    onFormAfterSubmit?: any,
    isEdit: boolean,
    model?: FishPondModel
    farmRegions: any
}

interface IFishPondState {
    isShow: boolean,
    model?: FishPondModel,
    errorList: any,
    farmRegions: any,
    warehouses: any
}

export class FishPondEdit extends React.Component<IFishPondProps, IFishPondState> {
    constructor(props: IFishPondProps) {
        super(props)
        this.state = {
            isShow: props.isShow,
            model: props.model ? props.model : new FishPondModel(),
            errorList: {},
            farmRegions: [],
            warehouses: []
        }
    }
    static contextTypes = {
        ShowGlobalMessage: React.PropTypes.func,
        ShowGlobalMessageList: React.PropTypes.func,
    }

    async componentWillMount() {
        //init comboboxes
        await this._loadDataCache();
    }

    private async _loadDataCache() {
        var warehouses = await CacheAPI.Warehouse();
        this.setState({ warehouses: warehouses.data });
    }

    componentWillReceiveProps(nextProps) {
        // call load data by this.props.model.id from server
        this.setState({ model: nextProps.model, isShow: nextProps.isShow, farmRegions: nextProps.farmRegions });
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

        nextState.model.waterSurfaceArea = (nextState.model.a + nextState.model.c) * (nextState.model.b + nextState.model.d) / 4;
        this.setState(nextState);
    }

    private _validate() {
        var errors = {};
        if (_HString.IsNullOrEmpty(this.state.model.name)) {
            errors['name'] = 'Chưa nhập ao nuôi';
        }
        if (!this.state.model.farmRegionId) {
            errors['farmRegionId'] = 'Chưa chọn khu vực nuôi';
        }
        if (!this.state.model.warehouseId) {
            errors['warehouseId'] = 'Chưa chọn kho';
        }
        return errors;
    }

    async onFormSubmit() {
        var errors = this._validate();
        if (Object.keys(errors).length > 0) {
            this.setState({
                errorList: errors
            });
            return;
        }

        if (this.props.isEdit) {
            let response = await FishPondAPICaller.Update(this.state.model);
            if (!response.hasError) {
                this.onCloseModal();
                // return succeed value to parent
                if (this.props.onFormAfterSubmit)
                    this.props.onFormAfterSubmit(true, this.state.model);
                this.context.ShowGlobalMessage('success', 'Cập nhật ao nuôi thành công');
            } else {
                this.context.ShowGlobalMessageList('error', response.errors);
            }

        } else {
            let response = await FishPondAPICaller.Create(this.state.model);
            if (!response.hasError) {
                this.onCloseModal();
                // return succeed value to parent
                if (this.props.onFormAfterSubmit)
                    this.props.onFormAfterSubmit(this.state.model);
                this.context.ShowGlobalMessage('success', 'Tạo ao nuôi thành công');
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
                    <div className="form-horizontal">
                        {this.state.errorList && <FormErrors formErrors={this.state.errorList} />}
                        {
                            this.props.isEdit ?
                                <LabeledInput
                                    name={'id'}
                                    value={this.state.model.id}
                                    readOnly={true}
                                    title={'Mã ao'}
                                    placeHolder={'Mã ao nuôi'} />
                                : null
                        }
                        <LabeledInput
                            name={'name'}
                            value={this.state.model.name}
                            title={'Tên ao'}
                            placeHolder={'Tên ao nuôi'}
                            error={this.state.errorList['name']}
                            valueChange={this.onFieldValueChange.bind(this)} />
                        <LabeledSelect
                            options={this.state.farmRegions}
                            name={'farmRegionId'}
                            value={this.state.model.farmRegionId}
                            title={'Chọn khu vực nuôi'}
                            placeHolder={'Khu vực nuôi'}
                            error={this.state.errorList['farmRegionId']}
                            valueChange={this.onFieldValueChange.bind(this)} />
                        <LabeledSelect
                            options={this.state.warehouses}
                            name={'warehouseId'}
                            value={this.state.model.warehouseId}
                            title={'Kho'}
                            placeHolder={'Chọn kho'}
                            error={this.state.errorList['warehouseId']}
                            valueChange={this.onFieldValueChange.bind(this)} />
                        <LabeledInput
                            inputType={'number'}
                            name={'a'}
                            value={this.state.model.a}
                            title={'A'}
                            placeHolder={'A'}
                            error={this.state.errorList['a']}
                            valueChange={this.onFieldValueChange.bind(this)} />
                        <LabeledInput
                            inputType={'number'}
                            name={'b'}
                            value={this.state.model.b}
                            title={'B'}
                            placeHolder={'B'}
                            error={this.state.errorList['b']}
                            valueChange={this.onFieldValueChange.bind(this)} />
                        <LabeledInput
                            inputType={'number'}
                            name={'c'}
                            value={this.state.model.c}
                            title={'C'}
                            placeHolder={'C'}
                            error={this.state.errorList['c']}
                            valueChange={this.onFieldValueChange.bind(this)} />
                        <LabeledInput
                            inputType={'number'}
                            name={'d'}
                            value={this.state.model.d}
                            title={'D'}
                            placeHolder={'D'}
                            error={this.state.errorList['d']}
                            valueChange={this.onFieldValueChange.bind(this)} />
                        <LabeledInput
                            inputType={'number'}
                            name={'depth'}
                            value={this.state.model.depth}
                            title={'Độ sâu'}
                            placeHolder={'Độ sâu'}
                            error={this.state.errorList['depth']}
                            valueChange={this.onFieldValueChange.bind(this)} />
                        <LabeledInput
                            inputType={'number'}
                            name={'waterSurfaceArea'}
                            value={this.state.model.waterSurfaceArea}
                            title={'Diện tích mặt nước'}
                            placeHolder={'Diện tích mặt nước'}
                            error={this.state.errorList['waterSurfaceArea']}
                            valueChange={this.onFieldValueChange.bind(this)} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.onFormSubmit.bind(this)}>{this.props.isEdit ? 'Cập nhật' : 'Tạo'} </Button>
                    <Button onClick={this.onCloseModal.bind(this)}>Đóng</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

