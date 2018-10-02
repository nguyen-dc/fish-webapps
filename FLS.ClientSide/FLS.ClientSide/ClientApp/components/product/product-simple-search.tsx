import * as React from "react";
import { Button, Glyphicon, Overlay, Popover } from "react-bootstrap";
import * as ReactDOM from "react-dom";
import { PageFilterModel, PaginateModel } from "../../models/shared";
import { ProductAPICaller } from "../../api-callers/product";
import { ProductModel } from "../../models/product";
import { EmptyTableMessage } from "../shared/view-only";
import Pagination from "react-js-pagination";

interface ProductSimpleSearchProps {
    popPlacement?: 'top' | 'right' | 'bottom' | 'left',
    stayPop?: boolean,
    onChooseProduct?: Function,
}
interface ProductSimpleSearchState {
    isPopUp: boolean,
    stayPop: boolean,
    lastSearchModel: PageFilterModel,
    searchModel: PageFilterModel,
    pagingModel: PaginateModel,
    isSearching: boolean,
    products: ProductModel[],
}
export class ProductSimpleSearch extends React.Component<ProductSimpleSearchProps, ProductSimpleSearchState>{
    constructor(props) {
        super(props)
        this.state = {
            isPopUp: false,
            stayPop: props.stayPop ? props.stayPop : false,
            searchModel: new PageFilterModel(),
            lastSearchModel: new PageFilterModel(),
            pagingModel: new PaginateModel(),
            products: [],
            isSearching: false,
        }
    }
    target = null;
    getTarget() {
        return ReactDOM.findDOMNode(this.target);
    }

    async componentWillMount() {
        await this.onPageChange(1, true);
    }
    async loadData(page: number, newSearch: boolean) {
        let searchModel = this.state.lastSearchModel;
        searchModel.page = page;
        if (newSearch) {
            searchModel = this.state.searchModel;
            searchModel.page = 1;
        }
        return await ProductAPICaller.GetList(searchModel);
    }
    async onPageChange(page: any, newSearch: boolean) {
        try {
            this.setState({ isSearching: true });
            var result = await this.loadData(page, newSearch);
            if (!result || !result.data) { return; }
            var paging = new PaginateModel();
            paging.currentPage = result.data.currentPage;
            paging.totalItems = result.data.totalItems;
            this.setState({ products: result.data.items, pagingModel: paging });
            if (newSearch)
                this.setState({ lastSearchModel: this.state.searchModel });
        } finally {
            this.setState({ isSearching: false });
        }
    }
    onTogglePopover() {
        this.setState({ isPopUp: !this.state.isPopUp });
    }
    onOpenPopover() {
        if (!this.state.isPopUp)
            this.setState({ isPopUp: true });
    }
    onClosePopover() {
        if (this.state.isPopUp)
            this.setState({ isPopUp: false });
    }
    onSearchKeyChange(e) {
        let searchModel = this.state.searchModel;
        searchModel.key = e.target.value;
        this.setState({ searchModel: searchModel });
    }
    onSearchKeyPress(e) {
        if (e.charCode == 13) {
            this.onSearchButtonClick();
        }
    }
    onSearchButtonClick() {
        this.onPageChange(1, true);
        this.setState({ isPopUp: true });
    }
    onChooseProduct(product: ProductModel) {
        if (!this.state.stayPop)
            this.setState({ isPopUp: false });
        if (this.props.onChooseProduct)
            this.props.onChooseProduct(product);
    }
    renderPopover() {
        let { isSearching, products } = this.state;
        return <Popover id='prdt-povr'>
            {isSearching && <div className="icon-loading"></div>}
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Mã</th>
                        <th>Tên</th>
                        <th>Ngành hàng</th>
                        <th>Nhóm hàng</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.length == 0 ?
                            <EmptyTableMessage message='Nhập chuỗi cần tìm, nhấn enter hoặc bấm nút tìm kiếm!'/> :
                            products.map((product, index) => {
                                return (
                                    <tr
                                        className='clickable'
                                        key={'ncc' + index}
                                        onClick={() => this.onChooseProduct(product)}
                                    >
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.productGroupId}</td>
                                        <td>{product.productSubgroupId}</td>
                                    </tr>
                                )
                            })
                    }
                </tbody>
            </table>
            <div className="row">
                <div className="text-left">
                    {this.state.products.length > 0 && this.renderPaging()}
                </div>
            </div>
        </Popover>
    }
    render() {
        let { isPopUp, searchModel } = this.state;
        let placement = this.props.popPlacement ? this.props.popPlacement : 'bottom';
        let wrapperClass = {
            className: isPopUp ? 'input-group popover-front' : 'input-group'
        }
        return <div {...wrapperClass} ref={thisref => { this.target = thisref }}>
            <input type="text" className="form-control" name="search" placeholder="Chọn sản phẩm..." value={searchModel.key} onChange={this.onSearchKeyChange.bind(this)} onKeyPress={this.onSearchKeyPress.bind(this)} onClick={() => this.onOpenPopover()}/>
            <span className="input-group-btn">
                <button className="btn btn-default" type="button" onClick={() => this.onSearchButtonClick()}><span className="glyphicon glyphicon-search"></span></button>
            </span>
            <Overlay
                container={this}
                target={this.getTarget.bind(this)}
                show={isPopUp}
                placement={placement}>
                    {this.renderPopover()}
            </Overlay>
            {isPopUp ? <div className='popover-backdrop' onClick={() => this.onClosePopover()} /> : null}
        </div>
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
            </div>
        );
    }
}
