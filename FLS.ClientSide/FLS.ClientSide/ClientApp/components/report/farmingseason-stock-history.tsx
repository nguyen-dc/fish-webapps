import * as React from "react";
import * as Moment from 'moment';
import { RouteComponentProps } from 'react-router';
import { LabeledSelect } from "../shared/input/labeled-input";
import { ReportFarmingSeasonHistoryStockRequest, ReportFarmingSeasonHistoryStock } from "../../models/report";
import { ReportAPICaller } from "../../api-callers/report";
import { EmptyRowMessage } from "../shared/view-only";
import { _HNumber, _HDateTime } from "../../handles/handles";
import { CacheAPI, FarmingSeasonAPICaller } from "../../api-callers";
import { PageFilterModel } from "../../models/shared";
import { FilterEnum } from "../../enums/filter-enum";
import { ProductModel } from "../../models/product";
import { ProductSimpleSearch } from "../product/product-simple-search";
import { Glyphicon, Button } from "react-bootstrap";

interface FarmingSeasonStockHistoryStates {
    model: ThisModel[],
    farmRegions: any[],
    fishPonds: any[],
    farmingSeasons: any[],
    productGroups: any[],
    productSubgroups: any[],
    farmRegionId: number,
    fishPondId: number,
    farmingSeasonId: number,
    productGroupId: number,
    productSubgroupId: number,
    product: ProductModel,
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
        this.state = {
            model: [],
            farmRegions: [],
            fishPonds: [],
            farmingSeasons: [],
            productGroups: [],
            productSubgroups: [],
            farmRegionId: 0,
            fishPondId: 0,
            farmingSeasonId: 0,
            productGroupId: 0,
            productSubgroupId: 0,
            product: null,
            isLoading: false,
        }
    }
    static contextTypes = {
        ShowGlobalMessage: React.PropTypes.func,
        ShowGlobalMessageList: React.PropTypes.func,
    }
    lastFishPond = null;
    lastFarmingSeason = null;
    async componentDidMount() {
        var farmRegions = await CacheAPI.FarmRegion();
        var fishPonds = await CacheAPI.FishPond();
        var productGroups = await CacheAPI.ProductGroup();
        var productSubgroups = await CacheAPI.ProductSubgroup();
        this.setState({
            farmRegions: farmRegions.data,
            fishPonds: fishPonds.data,
            productGroups: productGroups.data,
            productSubgroups: productSubgroups.data
        });
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
                this.setState({ farmingSeasons });
            }

            if (response.hasWarning) {
                this.context.ShowGlobalMessageList('warning', response.warnings);
            }
        }
    }
    private async getReport() {
        let { ...state } = this.state;
        // validate request
        if (!state.farmingSeasonId) {
            this.context.ShowGlobalMessage('error', 'Xin chọn đợt nuôi');
            return;
        }
        this.setState({ isLoading: true });
        let lastFishPonds = state.fishPonds.find(f => f.id == state.fishPondId);
        let lastFarmingSeasons = state.farmingSeasons.find(f => f.id == state.farmingSeasonId);
        let request = new ReportFarmingSeasonHistoryStockRequest();
        request.farmingSeasonId = state.farmingSeasonId ? state.farmingSeasonId : 0;
        request.productGroupId = state.productGroupId ? state.productGroupId : 0;
        request.productSubgroupId = state.productSubgroupId ? state.productSubgroupId : 0;
        request.productId = state.product ? state.product.id : 0;
        // lấy dữ liệu
        let result = await ReportAPICaller.GetFarmingSeasonHistoryStock(request);
        if (result.hasError) {
            this.context.ShowGlobalMessageList('error', result.errors);
            this.setState({ model: [], isLoading: false });
        }
        else {
            this.lastFishPond = lastFishPonds;
            this.lastFarmingSeason = lastFarmingSeasons;
            this.setState({ model: this.groupingData(result.data), isLoading: false });
        }
    }
    private exportExcel() {
        alert("chưa làm");
    }
    private groupingData(list: ReportFarmingSeasonHistoryStock[]): ThisModel[]
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
                        <td colSpan={7}>
                            <strong>{this.lastFishPond.name} - {this.lastFarmingSeason.name}
                                &nbsp;từ {_HDateTime.DateFormat(this.lastFarmingSeason.startFarmDate)} đến&nbsp;
                                {
                                    this.lastFarmingSeason.finishFarmDate ?
                                        _HDateTime.DateFormat(this.lastFarmingSeason.finishFarmDate) 
                                        : _HDateTime.DateFormat(this.lastFarmingSeason.finishFarmDateExpected) + ' (dự kiến)'
                                }
                            </strong>
                        </td>
                    </tr>
                    <tr className="text-center">
                        <th>STT</th>
                        <th>Mã sản phẩm</th>
                        <th>Tên sản phẩm</th>
                        <th>ĐVT</th>
                        <th>Số lượng</th>
                        <th>Đơn giá BQ</th>
                        <th>Thành tiền</th>
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
                                name={'farmRegionId'}
                                value={state.farmRegionId}
                                title={'Vùng nuôi'}
                                placeHolder={'Vùng nuôi'}
                                valueKey={'id'}
                                nameKey={'name'}
                                valueChange={(model) => this.setState({ farmRegionId: model.value, fishPondId: 0, farmingSeasonId: 0 })}
                                options={state.farmRegions} />
                        </div>
                        <div className="col-md-4">
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
                        <div className="col-md-4">
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
                        <div className="col-md-3">
                            <LabeledSelect
                                name={'productGroupId'}
                                value={state.productGroupId}
                                title={'Ngành hàng'}
                                placeHolder={'Ngành hàng'}
                                valueKey={'id'}
                                nameKey={'name'}
                                valueChange={(model) => this.setState({ productGroupId: model.value, productSubgroupId: 0 })}
                                options={state.productGroups} />
                        </div>
                        <div className="col-md-3">
                            <LabeledSelect
                                name={'productSubgroupId'}
                                value={state.productSubgroupId}
                                title={'Nhóm hàng'}
                                placeHolder={'Nhóm hàng'}
                                valueKey={'id'}
                                nameKey={'name'}
                                valueChange={(model) => {
                                    this.setState({ productSubgroupId: model.value});
                                }}
                                options={state.productSubgroups.filter(f => f.parentId == state.productGroupId)} />
                        </div>
                        <div className="col-md-6">
                            <ProductSimpleSearch
                                stayPop={false}
                                type="stock"
                                productGroupId={state.productGroupId}
                                onChooseProduct={(product) => this.setState({ product })} />
                            {state.product ?
                                <table className='mt-15'>
                                    <tbody>
                                        <tr>
                                            <td>{state.product.name}</td>
                                            <td>
                                                <Button bsStyle='default' className='btn-sm' onClick={() => this.setState({ product: null })}>
                                                <Glyphicon glyph='minus' />
                                            </Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table> : null
                            }
                        </div>
                        <div className="col-md-12 text-right mg-t-15">
                            <button className="btn btn-primary mg-r-15" onClick={() => this.getReport()}>Xem báo cáo</button>
                            <button className="btn btn-default mg-r-15" onClick={() => this.exportExcel()}>Xuất excel</button>
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