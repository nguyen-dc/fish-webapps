import * as React from "react";
import * as Moment from 'moment';
import { RouteComponentProps } from 'react-router';
import { LabeledSelect } from "../shared/input/labeled-input";
import { _HDateTime } from "../../handles/handles";
import { ReportLivestockHistoryDetail } from "../../models/report-livestock-history-detail";
import { CacheAPI } from "../../api-callers/cache";

class Filter {
    farmRegionId: number;
    fishPondId: number;
    farmingSeasonId: number;
}

interface ReleaseLivestockStates {
    model: ReportLivestockHistoryDetail[],
    modelFilter: Filter,
    farmRegions: any,
    fishPonds: any,
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
            farmingSeasons:[],
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
                            <td>&nbsp;</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    render() {
        return (
            <div id="info" className="tab-pane fade in active">
                <div className="panel panel-info">
                    <div className="panel-body">
                        <div className="col-md-3">
                            <LabeledSelect
                                name={'farmRegionId'}
                                value={this.state.modelFilter.farmRegionId}
                                title={'Vùng nuôi'}
                                placeHolder={'Vùng nuôi'}
                                valueKey={'id'}
                                nameKey={'name'}
                                valueChange={this.onDocketFieldChange.bind(this)}
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
                                valueChange={this.onDocketFieldChange.bind(this)}
                                options={this.state.fishPonds} />
                        </div>
                        <div className="col-md-3">
                            <LabeledSelect
                                name={'farmingSeasonId'}
                                value={this.state.modelFilter.farmingSeasonId}
                                title={'Đợt nuôi'}
                                placeHolder={'Đợt nuôi'}
                                valueKey={'id'}
                                nameKey={'name'}
                                valueChange={this.onDocketFieldChange.bind(this)}
                                options={this.state.farmingSeasons} />
                        </div>
                        <div className="col-md-3 text-right">
                            <button className="btn btn-primary mg-r-15" onClick={this.GetReport}>Xem báo cáo</button>
                            <button className="btn btn-default" onClick={this.GetReport}>Xuất excel</button>
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