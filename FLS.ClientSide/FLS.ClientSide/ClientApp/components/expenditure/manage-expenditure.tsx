import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { RouteComponentProps } from 'react-router';
import Pagination from "react-js-pagination";
import { StockReceiveDocketModel } from "../../models/stock-receive-docket";
import { PaginateModel, IdNameModel, PageFilterModel, ResponseConsult } from "../../models/shared";
import { ButtonGroup, Glyphicon, Button, Well } from "react-bootstrap";
import { LabeledInput, LabeledSelect } from "../shared/input/labeled-input";
import { LabeledSingleDatePicker } from "../shared/date-time/labeled-single-date-picker";
import * as Moment from 'moment';
import { CacheAPI } from "../../api-callers/cache";
import { EmptyTableMessage } from "../shared/view-only";
import { _HObject } from "../../handles/handles";
import { FilterEnum } from "../../enums/filter-enum";
import { FishPondModel } from "../../models/fish-pond";
import { FishPondAPICaller } from "../../api-callers/fish-pond";
import { UnderConstructor } from "../shared/under-constructor";
const urlLoadList = 'api/stock-receive-dockets';

const filterTitle0 = 'Tất cả khu vực';

export class ManageExpenditures extends React.Component<RouteComponentProps<{}>, any> {
    constructor(props: any) {
        super(props)
        let selectedFilter = new IdNameModel();
        selectedFilter.id = 0;
        selectedFilter.name = filterTitle0;
        this.state = {
            pagingModel: new PaginateModel(),
            selectedModel: new FishPondModel(),
            selectedFilter: selectedFilter,
            isTableLoading: true,
            manageExpenditures: [],
            searchModel: new PageFilterModel(),
            lastSearchModel: new PageFilterModel()
        };
    }
    async componentWillMount() {
        var farmRegions = await CacheAPI.FarmRegion();
        this.setState({ farmRegions: farmRegions.data });
        await this.onPageChange(1, true);
    }

    static contextTypes = {
        ShowGlobalMessage: React.PropTypes.func,
        ShowGlobalMessages: React.PropTypes.func,
    }
    async loadData(page: number, newSearch: boolean) {
        let keySearch = this.state.lastedSearchKey;
        if (newSearch)
            keySearch = this.state.searchKey;

        //return await ExpenditureAPICaller.GetList({
        //    page: page,
        //    pageSize: this.state.pagingModel.pageSize,
        //    key: keySearch,
        //    filters: []
        //});
    }
    async onPageChange(page: any, newSearch: boolean) {
        try {
            this.setState({ isTableLoading: true });
            var result;// = await this.loadData(page, newSearch) as ResponseConsult;
            if (!result) { return; }
            if (result.hasError) {
                this.context.ShowGlobalMessages('error', result.errors);
            } else {
                var paging = new PaginateModel();
                paging.currentPage = result.data.currentPage;
                paging.totalItems = result.data.totalItems;
                this.setState({ listExpenditure: result.data.items, pagingModel: paging });
                if (newSearch)
                    this.setState({ lastedSearchKey: this.state.searchKey });
            }
            if (result.hasWarning) {
                this.context.ShowGlobalMessages('warning', result.warnings);
            }
        } finally {
            this.setState({ isTableLoading: false });
        }
    }
    onFormAfterSubmit(isSuccess, model) {
        if (isSuccess)
            this.onPageChange(this.state.pagingModel.currentPage, false)
    }
    onSearchKeyChange(e) {
        let searchModel = this.state.searchModel;
        searchModel.key = e.target.value;
        this.setState({ searchModel: searchModel });
    }

    onSearchKeyPress(e) {
        if (e.charCode == 13) {
            this.onPageChange(1, true);
        }
    }

    handleFilter(filter: IdNameModel) {
        if (filter == null || filter == undefined) return;
        let searchModel = this.state.searchModel;
        searchModel.filters[0].key = FilterEnum.farmRegion;
        searchModel.filters[0].value = filter.id;
        this.setState({ selectedFilter: filter, searchModel: searchModel });
        this.onPageChange(1, true);
    }
    render() {
        let dataTable = this.renderTable(this.state.manageExpenditures);
        let renderPaging = this.state.manageExpenditures.length > 0 ? this.renderPaging() : null;
        let advanceSeach = this.renderSeach();
        return (
            <UnderConstructor/> ||
            <div className="content-wapper">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><NavLink to="/">Trang chủ</NavLink></li>
                    <li className="breadcrumb-item active" aria-current="page">Quản lý thu chi</li>
                </ol>
                <div className="panel panel-default">
                    <div className="panel-body">
                        {advanceSeach}
                        <div className="col-sm-12 mg-bt-15">
                            <div className="input-group">
                                <input type="text" className="form-control" name="search" placeholder="Tìm kiếm..." value={this.state.searchModel.key} onChange={this.onSearchKeyChange.bind(this)} onKeyPress={this.onSearchKeyPress.bind(this)} />
                                <span className="input-group-btn">
                                    <button className="btn btn-default" type="button" onClick={() => this.onPageChange(1, true)}><span className="glyphicon glyphicon-search"></span></button>
                                </span>
                            </div>
                        </div>
                        {
                            this.state.lastedSearchKey ?
                                <div className="col-sm-12">
                                    <div className="alert alert-info text-center">
                                        Có {this.state.pagingModel.totalItems} kết quả cho <strong>{this.state.lastedSearchKey}</strong>
                                    </div>
                                </div> : null
                        }
                        <div className="col-sm-12">
                            <div className="table-responsive p-relative">
                                {dataTable}
                                {this.state.isTableLoading ? <div className="icon-loading"></div> : null}
                            </div>
                        </div>
                        {renderPaging}
                    </div>
                </div>
            </div>
        );
    }
   
    private renderTable(models) {
        return (
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Loại thu/chi</th>
                        <th>Mã phiếu</th>
                        <th>Mã chứng từ</th>
                        <th>Kho thu/chi</th>
                        <th>Ngày thu/chi</th>
                        <th>Số hóa đơn</th>
                        <th>Mẫu số</th>
                        <th>Ký hiệu</th>
                        <th>Tổng tiền</th>
                        <th>Còn nợ</th>
                        <th>Mô tả</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        <EmptyTableMessage />
                    }
                </tbody>
            </table>
        );
    }

    private renderPaging() {
        return (
            <div>
                <div className="col-sm-8">
                    <Pagination
                        innerClass={'pagination mg-0'}
                        activePage={this.state.pagingModel.currentPage}
                        itemsCountPerPage={this.state.pagingModel.pageSize}
                        totalItemsCount={this.state.pagingModel.totalItems}
                        pageRangeDisplayed={this.state.pagingModel.pageRangeDisplayed}
                        onChange={this.onPageChange.bind(this)}
                    />
                </div>
                <div className="col-xs-4">
                    <div className="text-right">
                        <button className="btn btn-default">Export</button>
                    </div>
                </div>
            </div>
        );
    }

    private renderSeach() {
        return (
            <div className="col-sm-12">
                <div className="col-sm-4">
                    <LabeledSingleDatePicker
                        name={'fromDate'}
                        title={'Từ ngày'}
                        date={Moment()} />
                    <LabeledSingleDatePicker
                        name={'toDate'}
                        title={'Đến ngày'}
                        date={Moment()} />
                </div>
                <div className="col-sm-4">
                    <LabeledSelect
                        name={'warehouses'}
                        value={0}
                        title={'Kho nhập'}
                        placeHolder={'Kho nhập'}
                        valueKey={'id'}
                        nameKey={'name'}
                        options={this.state.warehouses} />
                    <LabeledSelect
                        name={'suppliers'}
                        value={0}
                        title={'Loại phiếu thu/chi'}
                        placeHolder={'Loại phiếu thu/chi'}
                        valueKey={'id'}
                        nameKey={'name'}
                        options={[{ id: 1, name: 'Nhà CC 1' }, { id: 2, name: 'Nhà CC 2' }]} />
                </div>
                <div className="col-sm-4">
                    <LabeledSelect
                        name={'input'}
                        value={0}
                        title={'Loại phiếu nhập'}
                        placeHolder={'Loại phiếu nhập'}
                        valueKey={'id'}
                        nameKey={'name'}
                        options={this.state.stockReceiveDocketTypes} />
                </div>
            </div>
        )
    }
}