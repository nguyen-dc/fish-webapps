import * as React from 'react';
import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker';
import * as Moment from 'moment';
import { Button, Glyphicon } from 'react-bootstrap';
import 'bootstrap-daterangepicker/daterangepicker.css';

interface LabeledSingleDatePickerProps {
    name?: string,
    format?: string,
    date: Moment.Moment,
    title?: string,
    dateChange?: Function
}
interface LabeledSingleDatePickerState {
    name: string,
    format?: string,
    date: Moment.Moment,
    title?: string,
    model: ILabeledInputModel
}
interface ILabeledInputModel {
    name: string,
    value: Moment.Moment,
}
export class LabeledSingleDatePicker extends React.Component<LabeledSingleDatePickerProps, LabeledSingleDatePickerState>{
    dateFormat: string = 'DD-MM-YYYY';
    constructor(props) {
        super(props);
        let model = new Object as ILabeledInputModel;
        model.name = props.name;
        model.value = props.date;
        this.handleEvent = this.handleEvent.bind(this);
        this.state = {
            name: props.name ? props.name : '',
            format: props.format ? props.format : this.dateFormat,
            date: props.date,
            title: props.title,
            model: model
        };
    }

    handleEvent(event, picker) {
        let model = this.state.model;
        model.value = picker.startDate;
        this.setState({
            date: picker.startDate,
            model: model
        });
        if (this.props.dateChange)
            this.props.dateChange(model);
    }

    render() {
        let label = this.state.date.isValid() ? this.state.date.format(this.dateFormat) : '';
        let date = this.state.date.isValid() ? this.state.date : Moment();
        let locale = {
            format: this.state.format,
            daysOfWeek: Moment.weekdaysMin(),
            monthNames: Moment.monthsShort(),
            firstDay: Moment.localeData().firstDayOfWeek(),
        };
        let buttonStyle = { width: '100%' };
        return (
            <div className="form-group-custom mg-bt-15">
                <label className="control-label min-w-140 float-left">{this.state.title}</label>
                <DatetimeRangePicker
                    singleDatePicker
                    showDropdowns={false}
                    locale={locale}
                    startDate={date}
                    onEvent={this.handleEvent}
                >
                    <Button className="selected-date-range-btn form-control" style={buttonStyle} name={this.state.name}>
                        <div className="pull-left">
                            <Glyphicon glyph="calendar" />
                            &nbsp;
                                <span>{label}</span>
                        </div>
                        <div className="pull-right">
                            <Glyphicon glyph="menu-down" />
                        </div>
                    </Button>
                </DatetimeRangePicker>
            </div>
        );
    }
}
export default LabeledSingleDatePicker;