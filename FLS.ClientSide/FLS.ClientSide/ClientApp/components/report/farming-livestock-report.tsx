import * as React from "react";
import * as Moment from 'moment';
import { Link } from "react-router-dom";
import { RouteComponentProps } from 'react-router';
import { UnderConstructor } from "../shared/under-constructor";
import { LabeledSelect } from "../shared/input/labeled-input";
import DateRangePicker from "../shared/date-time/DateRangePicker";

interface ReleaseLivestockStates {
    model: any,
    errorList: {}
}

export class FarmingLivestockReports extends React.Component<RouteComponentProps<{}>, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            model: [],
            errorList: {}
        }
    }

    componentDidMount() {

    }

    onDocketFieldChange(model: any) {
        //const nextState = {
        //    ...this.state,
        //    releaseDocket: {
        //        ...this.state.releaseDocket,
        //        [model.name]: model.value,
        //    }
        //};
        //this.setState(nextState);
    }
    onReceiveDocketDateChange(evt) {
        let startDate = evt.startDate as Moment.Moment;
        let endDate = evt.endDate as Moment.Moment;
        //let releaseDocket = this.state.releaseDocket;
        //releaseDocket[evt.name] = date;
        //this.setState({ releaseDocket });
    }

    GetReport() {
        alert("Chưa có làm");
    }

    private renderTable(models: any) {
        return (
            <table className="table-responsive table table-striped table-hover border">
                <thead className="text-center">
                    <tr>
                        <td rowSpan={3}>Mã đợt nuôi</td>
                        <td colSpan={8}>Thông tin vùng nuôi</td>
                        <td colSpan={5}><p>Thông tin con giống</p></td>
                        <td colSpan={2}>TG thu hoạch dự kiến</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td rowSpan={2}>Mã ao</td>
                        <td rowSpan={2}>Tên ao</td>
                        <td colSpan={4}>Diện tích ao nuôi</td>
                        <td rowSpan={2}>DTMN(m2)</td>
                        <td rowSpan={2}>Độ sâu(m)</td>
                        <td rowSpan={2}>Ngày thả</td>
                        <td colSpan={2}>Số lượng thả</td>
                        <td rowSpan={2}>Bình quân(con/kg)</td>
                        <td rowSpan={2}>Mật độ(c/m2)</td>
                        <td rowSpan={2}>Tháng</td>
                        <td rowSpan={2}>Số lượng(tấn)</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>A</td>
                        <td>B</td>
                        <td>C</td>
                        <td>D</td>
                        <td>Kg</td>
                        <td>Con</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>
                </thead>
                <tbody className="text-center">
                    <tr>
                        <td>101</td>
                        <td>1</td>
                        <td>Ao số 1</td>
                        <td>80</td>
                        <td>105</td>
                        <td>80</td>
                        <td>105</td>
                        <td>8.400</td>
                        <td>4.5</td>
                        <td>06/02/2018</td>
                        <td>64.122</td>
                        <td>644.56</td>
                        <td>10.1</td>
                        <td>77</td>
                        <td>05/11/2018</td>
                        <td>451</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>101</td>
                        <td>1</td>
                        <td>Ao số 1</td>
                        <td>80</td>
                        <td>105</td>
                        <td>80</td>
                        <td>105</td>
                        <td>8.400</td>
                        <td>4.5</td>
                        <td>06/02/2018</td>
                        <td>64.122</td>
                        <td>644.56</td>
                        <td>10.1</td>
                        <td>77</td>
                        <td>05/11/2018</td>
                        <td>451</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>101</td>
                        <td>1</td>
                        <td>Ao số 1</td>
                        <td>80</td>
                        <td>105</td>
                        <td>80</td>
                        <td>105</td>
                        <td>8.400</td>
                        <td>4.5</td>
                        <td>06/02/2018</td>
                        <td>64.122</td>
                        <td>644.56</td>
                        <td>10.1</td>
                        <td>77</td>
                        <td>05/11/2018</td>
                        <td>451</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>101</td>
                        <td>1</td>
                        <td>Ao số 1</td>
                        <td>80</td>
                        <td>105</td>
                        <td>80</td>
                        <td>105</td>
                        <td>8.400</td>
                        <td>4.5</td>
                        <td>06/02/2018</td>
                        <td>64.122</td>
                        <td>644.56</td>
                        <td>10.1</td>
                        <td>77</td>
                        <td>05/11/2018</td>
                        <td>451</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>
                </tbody>
            </table>
        );
    }

    render() {
        return (
            <div id="info" className="tab-pane fade in active">
                <div className="panel panel-info">
                    <div className="panel-body">
                        <div className="col-md-4">
                            <LabeledSelect
                                name={'fishPondWarehouseId'}
                                value={0}
                                title={'Vùng nuôi'}
                                placeHolder={'Vùng nuôi'}
                                valueKey={'belongId'}
                                nameKey={'name'}
                                valueChange={this.onDocketFieldChange.bind(this)}
                                options={[]} />
                        </div>
                        <div className="col-md-4">
                            <LabeledSelect
                                name={'fishPondWarehouseId'}
                                value={0}
                                title={'Ao nuôi'}
                                placeHolder={'Ao nuôi'}
                                valueKey={'belongId'}
                                nameKey={'name'}
                                valueChange={this.onDocketFieldChange.bind(this)}
                                options={[]} />
                        </div>
                        <div className="col-md-4">
                            <DateRangePicker
                                name={'receiveDate'}
                                title={'Thời gian đợt nuôi'}
                                dateChange={(e) => this.onReceiveDocketDateChange(e)} />
                        </div>
                        <div className="col-md-4">
                            <label className="control-label min-w-140 float-left"></label>
                            <button className="btn btn-primary mg-r-15" onClick={this.GetReport}>Xem báo cáo</button>
                            <button className="btn btn-default" onClick={this.GetReport}>Xuất báo cáo</button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className='col-sm-12'>
                        {this.renderTable(this.state.model)}
                    </div>
                </div>
            </div>
        );
    }
}