import * as React from "react";
import * as Moment from 'moment';
import { RouteComponentProps } from 'react-router';
import { LabeledSelect, LabeledTextArea } from "../shared/input/labeled-input";
import LabeledSingleDatePicker from "../shared/date-time/labeled-single-date-picker";
import { EmptyTableMessage } from "../shared/view-only";
import { _HDateTime } from "../../handles/handles";
import DateRangePicker from "../shared/date-time/DateRangePicker";

interface ReleaseLivestockStates {
    model: any,
    errorList: {}
}

export class FarmingSeasonHistories extends React.Component<RouteComponentProps<{}>, ReleaseLivestockStates> {
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
        debugger
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
                <thead>
                    <tr className="text-center">
                        <td rowSpan={2}>Ngày</td>
                        <td rowSpan={2}>Thao tác</td>
                        <td rowSpan={2}>Trọng lượng(gr/con)</td>
                        <td rowSpan={2}>SL con giống(con)</td>
                        <td colSpan={2}>Thức ăn</td>
                        <td colSpan={3}>Cá chết</td>
                        <td colSpan={3}>Xử lý thuốc, mối, vôi</td>
                        <td colSpan={4}>Môi trường ao nuôi</td>
                        <td rowSpan={2}>Ghi chú</td>
                    </tr>
                    <tr className="text-center">
                        <td>Bao</td>
                        <td>Tấn</td>
                        <td>Kg</td>
                        <td>HS</td>
                        <td>Con</td>
                        <td>Tên thuốc</td>
                        <td>ĐVT</td>
                        <td>SL</td>
                        <td>HS</td>
                        <td>DO</td>
                        <td>T</td>
                        <td>pH</td>
                    </tr>
                </thead>
                <tbody className="text-center">
                    <tr>
                        <td>28/07/2018</td>
                        <td>Rãi thuốc</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>Muối</td>
                        <td>Bao</td>
                        <td>1.0</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
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
                                title={'Năm'}
                                placeHolder={'Năm'}
                                valueKey={'belongId'}
                                nameKey={'name'}
                                valueChange={this.onDocketFieldChange.bind(this)}
                                options={[]} />
                        </div>
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
                            <LabeledSelect
                                name={'fishPondWarehouseId'}
                                value={0}
                                title={'Đợt nuôi'}
                                placeHolder={'Đợt nuôi'}
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
                            <button className="btn btn-primary" onClick={this.GetReport}>Xem báo cáo</button>
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