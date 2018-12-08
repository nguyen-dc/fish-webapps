import * as React from "react";
import { RouteComponentProps } from 'react-router';
import { LabeledSelect } from "../shared/input/labeled-input";
import { CacheAPI, FarmingSeasonAPICaller } from "../../api-callers";
import { PageFilterModel } from "../../models/shared";
import { ReportFeedConversionRateRequest, ReportFeedConversionRate } from "../../models/report";
import { FilterEnum } from "../../enums/filter-enum";
import { ReportAPICaller } from "../../api-callers/report";
import { NavLink } from "react-router-dom";
import { EmptyTableMessage } from "../shared/view-only";
import { _HDateTime, _HNumber } from "../../handles/handles";

interface IReportFeedConversionRate {
    model: ReportFeedConversionRate[],
    farmRegions: any,
    fishPonds: any,
    farmingSeasons: any[],
    farmRegionId: number,
    fishPondId: number,
    farmingSeasonId: number,
    errorList: {},
    isLoading: boolean,
}

export class FeedConversionRates extends React.Component<RouteComponentProps<{}>, IReportFeedConversionRate> {
    constructor(props: any) {
        super(props)
        this.state = {
            model: [],
            farmRegions: [],
            fishPonds: [],
            farmingSeasons: [],
            farmRegionId: 0,
            fishPondId: 0,
            farmingSeasonId: 0,
            errorList: {},
            isLoading: false,
        }
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
        if (Number(state.farmingSeasonId) <= 0 || state.farmingSeasonId == undefined) {
            this.context.ShowGlobalMessage('error', "Chưa chọn đợt nuôi");
            return;
        }
        this.setState({ isLoading: true });

        var objFilter = new ReportFeedConversionRateRequest();
        objFilter.farmingSeasonId = state.farmingSeasonId;

        let result = await ReportAPICaller.GetFeedConversionRate(objFilter);
        if (result.hasError) {
            this.context.ShowGlobalMessageList('error', result.errors);
            this.setState({ model: [], isLoading: false });
        }
        else {
            this.setState({ model: result.data, isLoading: false });
        }
    }
    private async getFarmingSeason(fishPondId: number) {
        if (Number(fishPondId) > 0) {
            let exist = this.state.farmingSeasons.find(f => f.fishPondId == fishPondId);

            if (exist) {
                return;
            }
            var modelSearch = new PageFilterModel();
            modelSearch.page = 1;
            modelSearch.pageSize = 20;
            modelSearch.filters[0].key = FilterEnum.fishPond;
            modelSearch.filters[0].value = fishPondId;
            let farmingSeasons = this.state.farmingSeasons;
            let response = await FarmingSeasonAPICaller.GetList(modelSearch);
            if (response.hasError) {
                this.context.ShowGlobalMessageList('error', response.errors);
            }
            else {
                farmingSeasons.push.apply(farmingSeasons, response.data.items);
                console.log(farmingSeasons);
                this.setState({ farmingSeasons });
            }

            if (response.hasWarning) {
                this.context.ShowGlobalMessageList('warning', response.warnings);
            }
        }
    }

    static contextTypes = {
        ShowGlobalMessage: React.PropTypes.func,
        ShowGlobalMessageList: React.PropTypes.func,
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
                                <li className="breadcrumb-item active" aria-current="page">Theo dõi tăng trọng</li>
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
                                valueChange={(model) => this.setState({ farmRegionId: model.value, fishPondId: 0, farmingSeasonId: 0 })}
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
                                    this.setState({ fishPondId: model.value, farmingSeasonId: 0 });
                                    this.getFarmingSeason(model.value);
                                }}
                                options={state.fishPonds.filter(f => f.parentId == state.farmRegionId)} />
                        </div>
                        <div className="col-md-3">
                            <LabeledSelect
                                name={'farmingSeasonId'}
                                value={state.farmingSeasonId}
                                title={'Đợt nuôi'}
                                placeHolder={'Đợt nuôi'}
                                valueKey={'id'}
                                nameKey={'name'}
                                valueChange={(model) => this.setState({ farmingSeasonId: model.value })}
                                options={state.farmingSeasons.filter(f => f.fishPondId == state.fishPondId)} />
                        </div>
                        <div className="col-md-3 text-right">
                            <button className="btn btn-primary mg-r-15" onClick={this.GetReport.bind(this)}>Xem báo cáo</button>
                            <button className="btn btn-default" onClick={this.GetReport.bind(this)}>Xuất excel</button>
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
                        <th colSpan={12}>Ao nuôi số 11 - Diện tích (m2): 8778</th>
                    </tr>
                    <tr>
                        <th rowSpan={2}>Ngày</th>
                        <th rowSpan={2}>Trọng lượng(gr/con)</th>
                        <th rowSpan={2}>Bình quân(con/kg)</th>
                        <th colSpan={2}>Cá chết</th>
                        <th rowSpan={2}>Thức ăn(kg)</th>
                        <th rowSpan={2}>Khối lượng(kg)</th>
                        <th rowSpan={2}>Số lượng(con)</th>
                        <th rowSpan={2}>Hao hụt(%)</th>
                        <th rowSpan={2}>Tỷ trọng(%)</th>
                        <th rowSpan={2}>Mật độ(c/m2)</th>
                        <th rowSpan={2}>FCR</th>
                    </tr>
                    <tr>
                        <th>Kg</th>
                        <th>Con</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {
                        state.model.length == 0 ?
                            <EmptyTableMessage /> :
                            state.model.map((m, index) =>
                                (
                                    <tr key={index}>
                                        <td>{_HDateTime.DateFormat(m.surveyDate)}</td>
                                        <td>{_HNumber.FormatNumber(m.weight)}</td>
                                        <td>{_HNumber.FormatNumber(m.averageQuantity)}</td>
                                        <td>{_HNumber.FormatNumber(m.deadstockAmount)}</td>
                                        <td>{_HNumber.FormatNumber(m.deadstockQuantity)}</td>
                                        <td>{_HNumber.FormatNumber(m.foodQuantity)}</td>
                                        <td>{_HNumber.FormatNumber(m.livestockAmount)}</td>
                                        <td>{_HNumber.FormatNumber(m.livestockQuantity)}</td>
                                        <td>{_HNumber.FormatNumber(m.lostPercent)}</td>
                                        <td>{_HNumber.FormatNumber(m.proprotionPercent)}</td>
                                        <td>{_HNumber.FormatNumber(m.density)}</td>
                                        <td>{_HNumber.FormatNumber(m.feedConversionRateId)}</td>
                                    </tr>
                                ))
                    }
                </tbody>
            </table>
        </div>
    }
}