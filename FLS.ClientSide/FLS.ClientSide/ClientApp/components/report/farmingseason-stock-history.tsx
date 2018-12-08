import * as React from "react";
import * as Moment from 'moment';
import { RouteComponentProps } from 'react-router';
import { LabeledSelect } from "../shared/input/labeled-input";
import { ReportFarmingSeasonHistoryStockRequest, ReportFarmingSeasonHistoryStock } from "../../models/report";
import { ReportAPICaller } from "../../api-callers/report";
import { EmptyRowMessage } from "../shared/view-only";
import { _HNumber } from "../../handles/handles";

interface FarmingSeasonStockHistoryStates {
    request: ReportFarmingSeasonHistoryStockRequest,
    model: ThisModel[],
    isLoading: boolean,
}
class ThisModel {
    productSubgroupId: number;
    productSubgroupName: string | null;
    childs: ReportFarmingSeasonHistoryStock[];
}
export class FarmingSeasonStockHistory extends React.Component<RouteComponentProps<{}>, FarmingSeasonStockHistoryStates> {
    constructor(props: any) {
        super(props)
        let request = new ReportFarmingSeasonHistoryStockRequest();
        request.farmingSeasonId = 1;
        this.state = {
            request,
            model: [],
            isLoading: false,
        }
    }
    static contextTypes = {
        ShowGlobalMessage: React.PropTypes.func,
        ShowGlobalMessageList: React.PropTypes.func,
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

    async GetReport() {
        let { request } = this.state;
        // validate request

        // lấy dữ liệu
        this.setState({ isLoading: true });
        let result = await ReportAPICaller.GetFarmingSeasonHistoryStock(request);
        if (result.hasError) {
            this.context.ShowGlobalMessageList('error', result.errors);
            this.setState({ model: [], isLoading: false });
        }
        else {
            this.setState({ model: this.GroupingData(result.data), isLoading: false }, () => console.log(this.state.model));
        }
    }
    ExportExcel() {
        alert("chưa làm");
    }
    GroupingData(list: ReportFarmingSeasonHistoryStock[]): ThisModel[]
    {
        let newList: ThisModel[] = [];
        if (!list || list.length == 0)
            return newList;
        list.map(item => {
            var exist = newList.find(i => i.productSubgroupId == item.productSubgroupId);
            if (exist) {
                exist.childs.push(item);
            } else {
                exist = new ThisModel();
                exist.productSubgroupId = item.productSubgroupId;
                exist.productSubgroupName = item.productSubgroupName;
                exist.childs = [];
                exist.childs.push(item);
                newList.push(exist);
            }
        });
        return newList;
    }
    private renderTable() {
        let { model } = this.state;
        if (!model || model.length == 0)
            return <EmptyRowMessage message='Không có dữ liệu báo cáo...' />;

        return (
            <table className="table-responsive table table-striped table-hover border">
                <thead>
                    <tr>
                        <td colSpan={7}><strong>Ao số 1 - Đợt 01 từ 15/03/2018 đến 30/09/2018 - Ngày thả: 25/0/2018 05:30</strong></td>
                    </tr>
                    <tr className="text-center">
                        <td>STT</td>
                        <td>Mã sản phẩm</td>
                        <td>Tên sản phẩm</td>
                        <td>ĐVT</td>
                        <td>Số lượng</td>
                        <td>Đơn giá BQ</td>
                        <td>Thành tiền</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        model.map((item, grpidx) => {
                            return [<tr key={'grp-' + item.productSubgroupId}>
                                <td colSpan={7}><strong>Nhóm hàng: {item.productSubgroupName}</strong></td>
                            </tr>,
                            item.childs && item.childs.length > 0 ?
                                item.childs.map((child, idx) => {
                                    return <tr key={'chld-' + child.productId}>
                                        <td>{grpidx * idx + 1}</td>
                                        <td className="text-center">{child.productId}</td>
                                        <td className="text-center">{child.productName}</td>
                                        <td className="text-center">{child.productUnitName}</td>
                                        <td className="text-right">{_HNumber.FormatNumber(child.amount)}</td>
                                        <td className="text-right">{_HNumber.FormatCurrency(child.capitalCost)}</td>
                                        <td className="text-right">{_HNumber.FormatCurrency(child.capitalCost * child.amount)}</td>
                                    </tr>
                                }) : null
                            ]
                        })
                    }
                </tbody>
            </table>
        );
    }

    render() {
        let { ...state } = this.state;
        return (
            <div id="info" className="tab-pane fade in active">
                {state.isLoading == true ? <div className="icon-loading"></div> : null}
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
                            <LabeledSelect
                                name={'fishPondWarehouseId'}
                                value={0}
                                title={'Ngành hàng'}
                                placeHolder={'Ngành hàng'}
                                valueKey={'belongId'}
                                nameKey={'name'}
                                valueChange={this.onDocketFieldChange.bind(this)}
                                options={[]} />
                        </div>
                        <div className="col-md-4">
                            <LabeledSelect
                                name={'fishPondWarehouseId'}
                                value={0}
                                title={'Nhóm hàng'}
                                placeHolder={'Nhóm hàng'}
                                valueKey={'belongId'}
                                nameKey={'name'}
                                valueChange={this.onDocketFieldChange.bind(this)}
                                options={[]} />
                        </div>
                        <div className="col-md-4">
                            <LabeledSelect
                                name={'fishPondWarehouseId'}
                                value={0}
                                title={'Sản phẩm'}
                                placeHolder={'Sản phẩm'}
                                valueKey={'belongId'}
                                nameKey={'name'}
                                valueChange={this.onDocketFieldChange.bind(this)}
                                options={[]} />
                        </div>
                        <div className="col-md-4">
                            <label className="control-label min-w-140 float-left"></label>
                            <button className="btn btn-primary mg-r-15" onClick={() => this.GetReport()}>Xem báo cáo</button>
                            <button className="btn btn-default mg-r-15" onClick={() => this.ExportExcel()}>Xuất excel</button>
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
}