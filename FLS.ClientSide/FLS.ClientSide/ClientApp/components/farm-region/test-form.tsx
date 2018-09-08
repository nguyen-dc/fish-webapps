import * as React from "react";
import { Link } from "react-router-dom";
import { RouteComponentProps } from 'react-router';
import { Modal, Button, Alert } from "react-bootstrap";
import { FormErrors } from "../shared/form-errors";
import * as Moment from 'moment';
import { LabeledInput, LabeledTextArea, LabeledSelect } from "../shared/input/labeled-input";
import LabeledSingleDatePicker from "../shared/date-time/labeled-single-date-picker";
const urlCreate = "api/farm-regions/add";

interface TestFormModel {
    id: number,
    name: string,
    description: string,
    selectedValue?: number
}
export class TestForm extends React.Component<ITestFormProps, ITestFormState> {
    constructor(props: ITestFormProps){
        super(props)
        let model = new Object as TestFormModel;
        this.state = {
            model: model,
            errorList: {},
            date: Moment().add(1, 'days'), // test cộng thêm 1 ngày
        }
    }
    componentWillMount() {
        //init comboboxes
        ////
    }
    componentDidUpdate(prevProps) {
        if (prevProps.isEdit == this.props.isEdit && prevProps.farmRegionId == this.props.farmRegionId)
            return;
        if (this.props.isEdit)
            this.loadData();
        else
            this.resetData();
    }
    loadData() {
        // call load data by this.props.farmRegionId from server
        ////
        let model = new Object as TestFormModel;
        model.id = this.props.farmRegionId;
        model.name = this.props.farmRegionName;
        this.setState({ model: model, errorList: {} });
    }
    resetData() {
        this.setState({ model: new Object as TestFormModel, errorList: {} });
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
    onDateChange(date) {
        this.setState({ date: date });
    }
    async onFormSubmit(e) {
        e.preventDefault();
        // call submit 
        try {
            let request = await fetch(urlCreate, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    _model: this.state.model
                })
            });
            return await request.json();
        }
        catch (err) {
            console.log(`Error: ${err.stack}`);
        }
        // return succeed value to parent
        if (this.props.handleFormAfterSubmit)
            this.props.handleFormAfterSubmit(this.state.model);
    }
    render() {
        let options = [{ id: 1, name: 'Số 1' }, { id: 2, name: 'Số 2' }, { id: 3, name: 'Số 3'}];
        return (
            <Modal show={this.props.isShow} onHide={this.props.handleClose}
                className="modal-medium"
                aria-labelledby="contained-modal-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form-horizontal" onSubmit={this.onFormSubmit}>
                        {this.state.errorList ? <FormErrors formErrors={this.state.errorList} /> : null}
                        {
                            this.props.isEdit ? 
                                <LabeledInput
                                    name={'id'}
                                    value={this.props.farmRegionId + ''}
                                    readOnly={true}
                                    title={'Mã vùng'}
                                    placeHolder={'Mã vùng'}/>
                            : null
                        }
                        <Alert bsStyle="success">
                            <label className="control-label col-sm-2">Test props:</label>
                            <p>{this.state.date.format('DD-MM-YYYY')}</p>
                            <p>{this.state.model.name}</p>
                            <p>{this.state.model.description}</p>
                            <p>Selected: {this.state.model.selectedValue}</p>
                        </Alert>
                        <LabeledSingleDatePicker name='date' date={this.state.date} title={'Ngày tạo'} dateChange={this.onDateChange.bind(this)} />
                        <LabeledInput
                            name={'name'}
                            value={this.state.model.name || ''}
                            title={'Tên vùng nuôi'}
                            placeHolder={'Tên vùng nuôi'}
                            error={this.state.errorList['name']}
                            valueChange={this.onFieldValueChange.bind(this)} />
                        <LabeledTextArea
                            name={'description'}
                            value={this.state.model.description || ''}
                            title={'Ghi chú'}
                            placeHolder={'Ghi chú'}
                            rows={3}
                            error={this.state.errorList['description']}
                            valueChange={this.onFieldValueChange.bind(this)} />
                        <LabeledSelect
                            name={'selectedValue'}
                            value={this.state.model.selectedValue}
                            title={'Chọn'}
                            placeHolder={'Chọn'}
                            valueKey={'id'}
                            nameKey={'name'}
                            options={options}
                            error={this.state.errorList['selectedValue']}
                            valueChange={this.onFieldValueChange.bind(this)} />
                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <input type="submit" className="btn btn-primary mg-r-15" value={this.props.isEdit ? 'Cập nhật' : 'Thêm'} />
                    <Button onClick={this.props.handleClose}>Đóng</Button>
                </Modal.Footer>
            </Modal>
            );
    }
}

interface ITestFormProps {
    isShow: boolean,
    handleClose: any,
    title: string;
    handleFormAfterSubmit: any;
    isEdit: boolean;
    farmRegionId: number;
    farmRegionName: string;
}

interface ITestFormState {
    model: TestFormModel,
    errorList: {},
    date: Moment.Moment,
}