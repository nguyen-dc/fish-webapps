import * as React from "react";
import * as Moment from 'moment';
import { RouteComponentProps } from 'react-router';
import { LabeledSelect } from "../shared/input/labeled-input";
import { _HDateTime, _HString } from "../../handles/handles";
import { ReportLivestockHistoryDetail } from "../../models/report-livestock-history-detail";
import { CacheAPI } from "../../api-callers/cache";
import { PageFilterModel, FilterModel } from "../../models/shared";
import { FilterEnum } from "../../enums/filter-enum";
import { FarmingSeasonAPICaller } from "../../api-callers";
import { LiveStockHistoryDetailAPICaller } from "../../api-callers/report";
import { EmptyTableMessage } from "../shared/view-only";

class Filter {
    farmRegionId: number = 0;
    fishPondId: number = 0;
    farmingSeasonId: number = 0;
}

interface ReleaseLivestockStates {
    model: ReportLivestockHistoryDetail[],
    modelFilter: Filter,
    farmRegions: any,
    fishPonds: any,
    fishPondChangeByFarmRegion: any,
    farmingSeasons: any,
    errorList: {}
}

export class FarmingSeasonHistories extends React.Component<RouteComponentProps<{}>, ReleaseLivestockStates> {
    constructor(props: any) {
        super(props)
        this.state = {
            model: [],
            farmRegions: [],
            modelFilter: {} as Filter,
            fishPonds: [],
            fishPondChangeByFarmRegion: [],
            farmingSeasons: [],
            errorList: {}
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

    async onFilterChange(model: any) {
        const nextState = {
            ...this.state,
            modelFilter: {
                ...this.state.modelFilter,
                [model.name]: model.value,
            }
        };
        this.setState(nextState);

        if (model.name == "farmRegionId") {
            if (Number(model.value) > 0) {
                let { fishPonds } = this.state;
                let filter = fishPonds.filter(function (item) {
                    return item.parentId == model.value;
                });

                this.setState({ fishPondChangeByFarmRegion: filter });
            }
            else {
                this.setState({ fishPondChangeByFarmRegion: [] });
            }
        }

        if (model.name == "fishPondId") {
            if (Number(model.value) > 0) {
                var modelSearch = new PageFilterModel();
                modelSearch.page = 1;
                modelSearch.pageSize = 20;
                modelSearch.filters[0].key = FilterEnum.fishPond;
                modelSearch.filters[0].value = model.value;

                let farmingSeason = await FarmingSeasonAPICaller.GetList(modelSearch);
                if (farmingSeason.hasError) {
                    this.context.ShowGlobalMessageList('error', farmingSeason.errors);
                }
                else {
                    this.setState({ farmingSeasons: farmingSeason.data.items });
                }

                if (farmingSeason.hasWarning) {
                    this.context.ShowGlobalMessageList('warning', farmingSeason.warnings);
                }
            }
            else {
                this.setState({ farmingSeasons: [] });
            }
        }
    }
    onReceiveDocketDateChange(evt) {
        let startDate = evt.startDate as Moment.Moment;
        let endDate = evt.endDate as Moment.Moment;
        //let releaseDocket = this.state.releaseDocket;
        //releaseDocket[evt.name] = date;
        //this.setState({ releaseDocket });
    }

    async GetReport() {
        let { modelFilter } = this.state;
        if (Number(modelFilter.farmRegionId) <= 0 || modelFilter.farmRegionId == undefined) {
            this.context.ShowGlobalMessage('warning', "Chưa chọn vùng nuôi");
            return;
        }
        if (Number(modelFilter.fishPondId) <= 0 || modelFilter.fishPondId == undefined) {
            this.context.ShowGlobalMessage('warning', "Chưa chọn ao nuôi");
            return;
        }
        if (Number(modelFilter.farmingSeasonId) <= 0 || modelFilter.farmingSeasonId == undefined) {
            this.context.ShowGlobalMessage('warning', "Chưa chọn đợt nuôi");
            return;
        }

        var objFilter = {
            FarmingSeasonId: modelFilter.farmingSeasonId,
            FromDate: Moment(),
            ToDate: Moment()
        };

        let result = await LiveStockHistoryDetailAPICaller.GetList(objFilter);
        if (result.hasError) {
            this.context.ShowGlobalMessageList('error', result.errors);
        }
        else {
            this.setState({ model: result.data });
        }
    }

    render() {
        let dataTable = this.renderTable(this.state.model);
        return (
            <div id="info" className="tab-pane fade in active">
                <div className="panel panel-info">
                    <div className="panel-body pd-bt-0">
                        <div className="col-md-3">
                            <LabeledSelect
                                name={'farmRegionId'}
                                value={this.state.modelFilter.farmRegionId}
                                title={'Vùng nuôi'}
                                placeHolder={'Vùng nuôi'}
                                valueKey={'id'}
                                nameKey={'name'}
                                valueChange={this.onFilterChange.bind(this)}
                                options={this.state.farmRegions} />
                        </div>
                        <div className="col-md-3">
                            <LabeledSelect
                                name={'fishPondId'}
                                value={this.state.modelFilter.fishPondId}
                                title={'Ao nuôi'}
                                placeHolder={'Ao nuôi'}
                                valueKey={'id'}
                                nameKey={'name'}
                                valueChange={this.onFilterChange.bind(this)}
                                options={this.state.fishPondChangeByFarmRegion} />
                        </div>
                        <div className="col-md-3">
                            <LabeledSelect
                                name={'farmingSeasonId'}
                                value={this.state.modelFilter.farmingSeasonId}
                                title={'Đợt nuôi'}
                                placeHolder={'Đợt nuôi'}
                                valueKey={'id'}
                                nameKey={'name'}
                                valueChange={this.onFilterChange.bind(this)}
                                options={this.state.farmingSeasons} />
                        </div>
                        <div className="col-md-3 text-right">
                            <button className="btn btn-primary mg-r-15" onClick={this.GetReport.bind(this)}>Xem báo cáo</button>
                            <button className="btn btn-default" onClick={this.GetReport.bind(this)}>Xuất excel</button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className='col-sm-12'>
                        {dataTable}
                    </div>
                </div>
            </div>
        );
    }

    private renderTable(model: ReportLivestockHistoryDetail[]) {
        return (
            <div className="scroll-x">
                <table className="table-responsive table table-striped table-hover border">
                    <thead>
                        <tr className="text-center">
                            <td rowSpan={2}>Ngày</td>
                            <td rowSpan={2}>Thao tác</td>
                            <td rowSpan={2}>Trọng lượng(gr/con)</td>
                            <td rowSpan={2}>SL con giống(con)</td>
                            <td colSpan={3}>Thức ăn</td>
                            <td colSpan={3}>Cá chết</td>
                            <td colSpan={3}>Xử lý thuốc, mối, vôi</td>
                            <td colSpan={4}>Môi trường ao nuôi</td>
                            <td rowSpan={2}>Ghi chú</td>
                        </tr>
                        <tr className="text-center">
                            <td>Kg</td>
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
                        {
                            model.length == 0 ?
                                <EmptyTableMessage /> :
                                model.map((m, index) =>
                                    (<tr key={index}>
                                        <td>{_HDateTime.DateFormat(m.actionDate)}</td>
                                        <td>{m.actionType}</td>
                                        <td>{m.weight}</td>
                                        <td>{m.quantity}</td>
                                        <td>{m.weight}</td>
                                        <td>{m.weight}</td>
                                        <td>{m.weight}</td>
                                        <td>{m.massAmount}</td>
                                        <td>{m.weight}</td>
                                        <td>{'Muối'}</td>
                                        <td>{'Bao'}</td>
                                        <td>{'1.0'}</td>
                                        <td>{m.weight}</td>
                                        <td>{m.weight}</td>
                                        <td>{m.weight}</td>
                                        <td>{m.weight}</td>
                                        <td>{m.weight}</td>
                                        <td>{m.weight}</td>
                                    </tr>
                                    ))
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}