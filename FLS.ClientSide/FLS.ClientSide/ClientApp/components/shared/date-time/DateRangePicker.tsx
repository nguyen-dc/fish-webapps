import * as React from 'react';
import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker';
import * as Moment from 'moment';

import {
    Button, Glyphicon,
} from 'react-bootstrap';

interface IDateRangeModel {
    name: string,
    startDate: Moment.Moment,
    endDate: Moment.Moment
}

interface IComboDatePickerProps {
    name?: string,
    format?: string,
    title?: string,
    dateChange?: Function
}
interface IComboDatePickerState {
    name: string,
    format?: string,
    startDate: Moment.Moment,
    endDate: Moment.Moment,
    title?: string,
    model: IDateRangeModel
    ranges: any,
}

class DateRangePicker extends React.Component<IComboDatePickerProps, IComboDatePickerState>{
    dateFormat: string = 'DD-MM-YYYY';
    constructor(props) {
        super(props);

        this.state = {
            name: props.name ? props.name : '',
            format: props.format ? props.format : this.dateFormat,
            title: props.title,
            startDate: Moment().startOf('month'),
            endDate: Moment(),
            model: {} as IDateRangeModel,
            ranges: {
                'Hôm nay': [Moment(), Moment()],
                'Hôm qua': [Moment().subtract(1, 'days'), Moment().subtract(1, 'days')],
                '7 ngày trước': [Moment().subtract(6, 'days'), Moment()],
                '30 ngày trước': [Moment().subtract(29, 'days'), Moment()],
                'Tháng này': [Moment().startOf('month'), Moment().endOf('month')],
                'Tháng trước': [Moment().subtract(1, 'month').startOf('month'), Moment().subtract(1, 'month').endOf('month')],
            },
        };
    }

    handleApply(event, picker) {
        this.setState({
            startDate: picker.startDate,
            endDate: picker.endDate,
        });
        if (this.props.dateChange) {
            let model = this.state.model;
            model.name = this.state.name;
            model.startDate = picker.startDate;
            model.endDate = picker.endDate;
            this.props.dateChange(model);
        }
    }

    render() {
        let format = this.state.format;
        let start = this.state.startDate.format(format);
        let end = this.state.endDate.format(format);
        let label = start + ' - ' + end;
        if (start === end) {
            label = start;
        }
        let buttonStyle = { width: '100%' };

        return (
            <div className="form-group-custom mg-bt-15">
                <label className="control-label min-w-140 float-left">{this.state.title}</label>
                <DatetimeRangePicker
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    //ranges={this.state.ranges}
                    onApply={this.handleApply.bind(this)}
                >
                    <Button className="selected-date-range-btn" style={buttonStyle}>
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
export default DateRangePicker;
