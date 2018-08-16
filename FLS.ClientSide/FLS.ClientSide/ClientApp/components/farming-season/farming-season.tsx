﻿import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { RouteComponentProps } from 'react-router';
import { PaginateModel, IdNameModel, PageFilterModel } from "../../models/shared";
import Pagination from "react-js-pagination";
import { FarmingSeasonModel } from "../../models/farming-season";
import { ButtonGroup, Glyphicon, Button } from "react-bootstrap";
import { FarmingSeasonEdit } from "./farming-season-edit";
import { FarmingSeasonAPICaller } from "../../api-callers/farming-season";
import { CacheAPI } from "../../api-callers/cache";
import { FishPondModel } from "../../models/fish-pond";
import { FishPonds } from "../fish-pond/fish-pond";
import { StringHandle } from "../../handles/string-handle";
import { DateTimeHandle } from "../../handles/datetime-handle";
import * as Moment from 'moment';
import { FilterEnum } from "../../enums/filter-enum";

interface FarmingSeasonState {
    listFarmingSeason: FarmingSeasonModel[],
    pagingModel: PaginateModel,
    selectedModel: FarmingSeasonModel,
    selectedFilter: IdNameModel,
    isTableLoading: boolean,
    editModalShow: boolean,
    editModalTitle: string,
    fishPonds: IdNameModel[],
    searchModel: PageFilterModel,
    lastSearchModel: PageFilterModel
}
const filterTitle0 = 'Tất cả ao';
export class FarmingSeasons extends React.Component<RouteComponentProps<{}>, FarmingSeasonState> {
    
    constructor(props: any) {
        super(props)
        let selectedFilter = new IdNameModel();
        selectedFilter.id = 0;
        selectedFilter.name = filterTitle0;
        this.state = {
            listFarmingSeason: [],
            pagingModel: new PaginateModel(),
            selectedModel: new FarmingSeasonModel(),
            selectedFilter: selectedFilter,
            isTableLoading: true,
            editModalShow: false,
            editModalTitle: '',
            fishPonds: [],
            searchModel: new PageFilterModel(),
            lastSearchModel: new PageFilterModel()
        };
    }
    async componentWillMount() {
        var fishPonds = await CacheAPI.FishPond();
        this.setState({ fishPonds: fishPonds.data });
        await this.onPageChange(1, true);
    }

    async loadData(page: number, newSearch: boolean) {
        let searchModel = this.state.lastSearchModel;
        searchModel.page = page;
        if (newSearch) {
            searchModel = this.state.searchModel;
            searchModel.page = 1;
        }
        let request = await FarmingSeasonAPICaller.GetList(searchModel);
        if (request.ok)
            return (await request.json());
        else {
            //// raise error
            return null;
        }
    }
    async onPageChange(page: any, newSearch: boolean) {
        try {
            this.setState({ isTableLoading: true });
            var result = await this.loadData(page, newSearch);
            if (!result || !result.data) {
                this.setState({ searchModel: this.state.lastSearchModel });
                return;
            }
            var paging = new PaginateModel();
            paging.currentPage = result.data.currentPage;
            paging.totalItems = result.data.totalItems;
            this.setState({ listFarmingSeason: result.data.items, pagingModel: paging, lastSearchModel: this.state.searchModel });
        } finally {
            this.setState({ isTableLoading: false });
        }
    }
    async onDelete(id: number) {
        //// 
    }
    onFormAfterSubmit(isSuccess, model) {
        if (isSuccess)
            this.onPageChange(this.state.pagingModel.currentPage, false)
    }
    onOpenEdit(model: FarmingSeasonModel) {
        if (model.id > 0) {
            this.setState({ editModalShow: true, editModalTitle: 'Chỉnh sửa đợt nuôi', selectedModel: model });
        }
        else {
            let selectedModel = new FarmingSeasonModel();
            selectedModel.finishFarmDateExpected = Moment().toDate();
            selectedModel.startFarmDate = Moment().toDate();
            this.setState({ editModalShow: true, editModalTitle: 'Tạo đợt nuôi', selectedModel: selectedModel });
        }
    }
    onCloseEdit() {
        this.setState({ editModalShow: false });
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
        debugger
        if (filter == null || filter == undefined) return;
        let searchModel = this.state.searchModel;
        searchModel.filters[0].key = FilterEnum.fishPond;
        searchModel.filters[0].value = filter.id;
        this.setState({ selectedFilter: filter, searchModel: searchModel });
        this.onPageChange(1, true);
    }

    render() {
        let dataTable = this.renderTable(this.state.listFarmingSeason);
        let renderPaging = this.state.listFarmingSeason.length > 0 ? this.renderPaging() : null;
        let lastedSearchKey = StringHandle.IsNullOrEmpty(this.state.lastSearchModel.key) ? "Tất cả" : this.state.lastSearchModel.key;
        return (
            <div className="content-wapper">
                <div className="row">
                    <div className="col-md-12">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><NavLink to="/">Trang chủ</NavLink></li>
                                <li className="breadcrumb-item active" aria-current="page">Đợt nuôi</li>
                            </ol>
                        </nav>
                    </div>
                    <div className="col-sm-8 mg-bt-15">
                        <div className="input-group">
                            <div className="input-group-btn search-panel">
                                <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                    <span id="search_concept">{this.state.selectedFilter.name}</span> <span className="caret"></span>
                                </button>
                                <ul className="dropdown-menu" role="menu">
                                    <li className="cursor-pointer"><a onClick={this.handleFilter.bind(this, { key: 0, value: filterTitle0 })}>{filterTitle0}</a></li>
                                    {this.state.fishPonds.map(opt => {
                                        return (
                                            <li className="cursor-pointer" key={opt.id}>
                                                <a onClick={this.handleFilter.bind(this, opt)}>{opt.name}</a>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                            <input type="text" className="form-control" name="search" placeholder="Tìm kiếm..." value={this.state.searchModel.key} onChange={this.onSearchKeyChange.bind(this)} onKeyPress={this.onSearchKeyPress.bind(this)} />
                            <span className="input-group-btn">
                                <button className="btn btn-default" type="button" onClick={() => this.onPageChange(1, true)}><span className="glyphicon glyphicon-search"></span></button>
                            </span>
                        </div>
                    </div>
                    <div className="col-sm-4 mg-bt-15">
                        <div className="text-right">
                            <button className="btn btn-default mg-r-15">Import</button>
                            <Button
                                bsStyle="primary"
                                onClick={this.onOpenEdit.bind(this)}
                            >Thêm</Button>
                        </div>
                    </div>
                </div>
                {
                    this.state.lastSearchModel.key == undefined ? null :
                        <div className="row">
                            <div className="col-md-12">
                                <div className="alert alert-success text-center">
                                    Có {this.state.pagingModel.totalItems} kết quả cho <strong>{lastedSearchKey}</strong> thuộc <strong>{this.state.lastSearchModel.filters[0].value}</strong>
                                </div>
                            </div>
                        </div>
                }
                <div className="table-responsive p-relative">
                    {dataTable}
                    {this.state.isTableLoading && <div className="icon-loading"></div>}
                </div>
                <div className="row">
                    {renderPaging}
                </div>
                <FarmingSeasonEdit
                    isShow={this.state.editModalShow}
                    onCloseModal={this.onCloseEdit.bind(this)}
                    title={this.state.editModalTitle}
                    isEdit={this.state.selectedModel.id > 0}
                    model={this.state.selectedModel}
                    onFormAfterSubmit={this.onFormAfterSubmit.bind(this)}
                    fishPonds={this.state.fishPonds}
                />
            </div>
        );
    }

    private renderTable(models: FarmingSeasonModel[]) {
        return (
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Mã đợt nuôi</th>
                        <th>Tên đợt nuôi</th>
                        <th>Ao nuôi</th>
                        <th>Ngày bắt đầu</th>
                        <th>Ngày kết thúc dự kiến</th>
                        <th>Ngày kết thúc thực tế</th>
                        <th width="100px"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        models.length == 0 ?
                            <tr><td colSpan={11}>Không có dữ liệu!</td></tr> :
                            models.map(
                                m =>
                                    <tr key={m.id}>
                                        <td>{m.id}</td>
                                        <td>{m.name}</td>
                                        <td>{m.fishPondId}</td>
                                        <td>{DateTimeHandle.DateFormat(m.startFarmDate)}</td>
                                        <td>{DateTimeHandle.DateFormat(m.finishFarmDateExpected)}</td>
                                        <td>{DateTimeHandle.DateFormat(m.finishFarmDate)}</td>
                                        <td className="text-right">
                                            <ButtonGroup>
                                                <Button bsStyle="default" className="btn-sm" onClick={() => this.onOpenEdit(m)}>
                                                    <Glyphicon glyph="edit" /></Button>
                                                <Button bsStyle="danger" className="btn-sm" onClick={() => this.onDelete(m.id)}>
                                                    <Glyphicon glyph="remove" /></Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                            )
                    }
                </tbody>
            </table>
        );
    }

    private renderPaging() {
        return (
            <div>
                <div className="col-xs-8">
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
}