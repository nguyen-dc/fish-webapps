import * as React from "react";
import * as Moment from 'moment';
import { RouteComponentProps } from 'react-router';
import { LabeledSelect } from "../shared/input/labeled-input";
import { _HDateTime, _HString, _HNumber } from "../../handles/handles";
import { ReportLivestockHistoryDetail, ReportLivestockHistoryDetailRequest } from "../../models/report";
import { CacheAPI } from "../../api-callers/cache";
import { PageFilterModel, FilterModel } from "../../models/shared";
import { FilterEnum } from "../../enums/filter-enum";
import { FarmingSeasonAPICaller } from "../../api-callers";
import { LiveStockHistoryDetailAPICaller } from "../../api-callers/report";
import { EmptyTableMessage } from "../shared/view-only";

interface ReleaseLivestockStates {
    model: ReportLivestockHistoryDetail[],
    farmRegions: any,
    fishPonds: any,
    farmingSeasons: any[],
    farmRegionId: number,
    fishPondId: number,
    farmingSeasonId: number,
    errorList: {},
    isLoading: boolean,
}

export class FarmingSeasonHistories extends React.Component<RouteComponentProps<{}>, ReleaseLivestockStates> {
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
        if (Number(state.farmingSeasonId) <= 0 || state.farmingSeasonId == undefined) {
            this.context.ShowGlobalMessage('error', "Chưa chọn đợt nuôi");
            return;
        }
        this.setState({ isLoading: true });
        var objFilter = new ReportLivestockHistoryDetailRequest();
        objFilter = {
            farmingSeasonId: state.farmingSeasonId,
            fromDate: Moment().toDate(),
            toDate: Moment().toDate(),
        };

        let result = await LiveStockHistoryDetailAPICaller.GetList(objFilter);
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
    render() {
        let { ...state } = this.state;
        return <div id="info" className="tab-pane fade in active">
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
    }

    private renderTable() {
        let { ...state } = this.state;
        return <div className="scroll-x">
            { state.isLoading == true ? <div className="icon-loading"></div> : null }
                <table className="table-responsive table table-striped table-hover border">
                    <thead>
                        <tr className="text-center">
                            <th rowSpan={2}>Ngày</th>
                            <th rowSpan={2}>Thao tác</th>
                            <th rowSpan={2}>Trọng lượng(gr/con)</th>
                            <th rowSpan={2}>SL con giống(con)</th>
                            <th colSpan={3}>Thức ăn</th>
                            <th colSpan={3}>Cá chết</th>
                            <th colSpan={3}>Xử lý thuốc, mối, vôi</th>
                            <th colSpan={4}>Môi trường ao nuôi</th>
                            <th rowSpan={2}>Ghi chú</th>
                        </tr>
                        <tr className="text-center">
                            <th>Kg</th>
                            <th>Bao</th>
                            <th>Tấn</th>
                            <th>Kg</th>
                            <th>HS</th>
                            <th>Con</th>
                            <th>Tên thuốc</th>
                            <th>ĐVT</th>
                            <th>SL</th>
                            <th>HS</th>
                            <th>DO</th>
                            <th>T</th>
                            <th>pH</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {
                            state.model.length == 0 ?
                                <EmptyTableMessage /> :
                                state.model.map((m, index) =>
                                    (
                                        <tr key={index}>
                                            <td>{_HDateTime.DateFormat(m.actionDate)}</td>
                                            <td>{m.actionType}</td>
                                            <td className='number'>{_HNumber.FormatNumber(m.weight)}</td>
                                            <td className='number'>{_HNumber.FormatInteger(m.quantity)}</td>
                                            <td className='number'>{_HNumber.FormatDecimal(m.qtyFood)}</td>
                                            <td></td>
                                            <td></td>
                                            <td className='number'>{_HNumber.FormatNumber(m.massAmount)}</td>
                                            <td className='number'>{_HNumber.FormatDecimal(m.deadstockRatio)}</td>
                                            <td></td>
                                            <td>{m.medicineName}</td>
                                            <td>{m.productUnitName}</td>
                                            <td className='number'>{_HNumber.FormatDecimal(m.qtyMedicine)}</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>

                                    ))
                        }
                    </tbody>
                </table>
            </div>
    }
}