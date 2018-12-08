import * as React from "react";
import * as Moment from 'moment';
import { RouteComponentProps } from 'react-router';
import { LabeledSelect } from "../shared/input/labeled-input";
import DateRangePicker from "../shared/date-time/DateRangePicker";
import { _HDateTime, _HString, _HNumber } from "../../handles/handles";
import { ReportFarmingSeasonRequest, ReportFarmingSeasonModel } from "../../models/report";
import { CacheAPI } from "../../api-callers/cache";
import { ReportAPICaller } from "../../api-callers/report";
import { NavLink } from "react-router-dom";
import { EmptyTableMessage } from "../shared/view-only";

interface IReportFarmingSeason {
    model: ReportFarmingSeasonModel[],
    farmRegions: any,
    fishPonds: any,
    farmingSeasons: any[],
    farmRegionId: number,
    fishPondId: number,
    fromDate: any,
    toDate: any,
    errorList: {},
    isLoading: boolean,
}

export class ReportFarmingSeason extends React.Component<RouteComponentProps<{}>, IReportFarmingSeason> {
    constructor(props: any) {
        super(props)
        this.state = {
            model: [],
            farmRegions: [],
            fishPonds: [],
            farmingSeasons: [],
            farmRegionId: 0,
            fishPondId: 0,
            fromDate: Moment().startOf('month'),
            toDate: Moment(),
            errorList: {},
            isLoading: false,
        }
    }
    static contextTypes = {
        ShowGlobalMessage: React.PropTypes.func,
        ShowGlobalMessageList: React.PropTypes.func,
    }

    async componentDidMount() {
        var farmRegions = await CacheAPI.FarmRegion();
        var fishPonds = await CacheAPI.FishPond();
        this.setState({ farmRegions: farmRegions.data, fishPonds: fishPonds.data });
    }
    async GetReport() {
        let { ...state } = this.state;
        if (Number(state.farmRegionId) <= 0 || state.farmRegionId == undefined) {
            this.context.ShowGlobalMessage('error', "Chưa chọn vùng nuôi");
            return;
        }
        if (Number(state.fishPondId) <= 0 || state.fishPondId == undefined) {
            this.context.ShowGlobalMessage('error', "Chưa chọn ao nuôi");
            return;
        }
        this.setState({ isLoading: true });

        var objFilter = new ReportFarmingSeasonRequest();
        objFilter.farmRegionId = state.farmRegionId;
        objFilter.fishPondId = state.fishPondId;
        objFilter.fromDate = state.fromDate;
        objFilter.toDate = state.toDate;

        let result = await ReportAPICaller.GetFarmingSeason(objFilter);
        if (result.hasError) {
            this.context.ShowGlobalMessageList('error', result.errors);
            this.setState({ model: [], isLoading: false });
        }
        else {
            this.setState({ model: result.data, isLoading: false });
        }
    }

    onReceiveDocketDateChange(evt) {
        let startDate = evt.startDate as Moment.Moment;
        let endDate = evt.endDate as Moment.Moment;
        this.setState({ fromDate: startDate, toDate: endDate });
    }

    render() {
        let { ...state } = this.state;
        return (
            <div id="info" className="tab-pane fade in active">
                <div className="row">
                    <div className="col-sm-12">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><NavLink to="/">Trang chủ</NavLink></li>
                                <li className="breadcrumb-item">Báo cáo</li>
                                <li className="breadcrumb-item active" aria-current="page">Theo dõi cái giống</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className="panel panel-info">
                    <div className="panel-body">
                        <div className="col-md-3">
                            <LabeledSelect
                                name={'farmRegionId'}
                                value={state.farmRegionId}
                                title={'Vùng nuôi'}
                                placeHolder={'Vùng nuôi'}
                                valueKey={'id'}
                                nameKey={'name'}
                                valueChange={(model) => this.setState({ farmRegionId: model.value, fishPondId: 0 })}
                                options={state.farmRegions} />
                        </div>
                        <div className="col-md-3">
                            <LabeledSelect
                                name={'fishPondId'}
                                value={state.fishPondId}
                                title={'Ao nuôi'}
                                placeHolder={'Ao nuôi'}
                                valueKey={'id'}
                                nameKey={'name'}
                                valueChange={(model) => {
                                    this.setState({ fishPondId: model.value });
                                }}
                                options={state.fishPonds.filter(f => f.parentId == state.farmRegionId)} />
                        </div>
                        <div className="col-md-4">
                            <DateRangePicker
                                name={'receiveDate'}
                                title={'Thời gian đợt nuôi'}
                                dateChange={(e) => this.onReceiveDocketDateChange(e)} />
                        </div>
                        <div className="col-md-4">
                            <label className="control-label min-w-140 float-left"></label>
                            <button className="btn btn-primary mg-r-15" onClick={this.GetReport.bind(this)}>Xem báo cáo</button>
                            <button className="btn btn-default" >Xuất báo cáo</button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className='col-sm-12'>
                        {this.renderTable()}
                    </div>
                </div>
            </div>
        );
    }

    private renderTable() {
        let { ...state } = this.state;
        return <div className="scroll-x">
            {state.isLoading == true ? <div className="icon-loading"></div> : null}
            <table className="table-responsive table table-striped table-hover border">
                <thead className="text-center">
                    <tr>
                        <th rowSpan={3}>Mã đợt nuôi</th>
                        <th colSpan={8}>Thông tin vùng nuôi</th>
                        <th colSpan={5}><p>Thông tin con giống</p></th>
                        <th colSpan={2}>TG thu hoạch dự kiến</th>
                        <th>&nbsp;</th>
                        <th>&nbsp;</th>
                    </tr>
                    <tr>
                        <th rowSpan={2}>Mã ao</th>
                        <th rowSpan={2}>Tên ao</th>
                        <th colSpan={4}>Diện tích ao nuôi</th>
                        <th rowSpan={2}>DTMN(m2)</th>
                        <th rowSpan={2}>Độ sâu(m)</th>
                        <th rowSpan={2}>Ngày thả</th>
                        <th colSpan={2}>Số lượng thả</th>
                        <th rowSpan={2}>Bình quân(con/kg)</th>
                        <th rowSpan={2}>Mật độ(c/m2)</th>
                        <th rowSpan={2}>Tháng</th>
                        <th rowSpan={2}>Số lượng(tấn)</th>
                        <th>&nbsp;</th>
                        <th>&nbsp;</th>
                    </tr>
                    <tr>
                        <th>A</th>
                        <th>B</th>
                        <th>C</th>
                        <th>D</th>
                        <th>Kg</th>
                        <th>Con</th>
                        <th>&nbsp;</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {
                        state.model.length == 0 ?
                            <EmptyTableMessage /> :
                            state.model.map((m, index) =>
                                (
                                    <tr key={index}>
                                        <td>{m.farmingSeasonId}</td>
                                        <td>{m.fishPondId}</td>
                                        <td>{m.fishPondName}</td>
                                        <td>{m.a}</td>
                                        <td>{m.b}</td>
                                        <td>{m.c}</td>
                                        <td>{m.d}</td>
                                        <td>{m.waterSurfaceArea}</td>
                                        <td>{m.depth}</td>
                                        <td>{_HDateTime.DateFormat(m.actionDate)}</td>
                                        <td>{_HNumber.FormatNumber(m.massAmount)}</td>
                                        <td>{_HNumber.FormatNumber(m.quantity)}</td>
                                        <td>{_HNumber.FormatNumber(m.averageQuantity)}</td>
                                        <td>{m.density}</td>
                                        <td>{_HDateTime.DateFormat(m.expectedHarvestDate)}</td>
                                        <td>{_HNumber.FormatNumber(m.expectedHarvestQuantity)}</td>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                    </tr>
                                ))
                    }
                </tbody>
            </table>
        </div>
    }
}