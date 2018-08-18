import * as React from "react";
import { Button, Glyphicon, Modal } from "react-bootstrap";
import { ProductModel } from "../../models/product";
import { Input } from "../shared/SingleInput";
import { ProductTable } from "./product-table";
import { PageFilterModel, PaginateModel } from "../../models/shared";
import { ProductAPICaller } from "../../api-callers/product";
import Pagination from "react-js-pagination";
import { ProductTableChoose } from "./product-table-choose";

interface IProductSearchProps {
    keepLastResult?: boolean,
    modalOption?: IModalModel,
    title?: string,
    onReturn: Function,
}
interface IProductSearchState {
    keepLastResult: boolean,
    isTableLoading: boolean,
    lastSearchModel: PageFilterModel,
    modalOption: IModalModel,
    modalShow: boolean,
    products: ProductModel[],
    choseProducts: ProductModel[],
    searchModel: PageFilterModel,
    pagingModel: PaginateModel,
    title: string,
}
interface IModalModel {
    closeButtonTitle: string,
    headerTitle: string,
    finishButtonTitle: string,
}
const modalDefaultOption = {
    closeButtonTitle: "Đóng",
    headerTitle: "Chọn sản phẩm",
    finishButtonTitle: "Xong",
} as IModalModel;
export class ProductSearch extends React.PureComponent<IProductSearchProps, IProductSearchState>{
    constructor(props: any) {
        super(props);
        let option = modalDefaultOption;
        //if (props.modalOption) { }
        ////
        this.state = {
            keepLastResult: props.keepLastResult ? props.keepLastResult : false,
            isTableLoading: false,
            modalOption: option,
            modalShow: false,
            products: [],
            choseProducts: [],
            searchModel: new PageFilterModel(),
            lastSearchModel: new PageFilterModel(),
            pagingModel: new PaginateModel(),
            title: props.title ? props.title : "Chọn sản phẩm",
        }
    }

    onOpenModal() {
        this.state.keepLastResult ?
            this.setState({ modalShow: true })
        :   this.setState({ modalShow: true, products: [] });
    }
    onCloseModal() {
        this.setState({ modalShow: false });
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
    async loadData(page: number, newSearch: boolean) {
        let searchModel = this.state.lastSearchModel;
        searchModel.page = page;
        if (newSearch) {
            searchModel = this.state.searchModel;
            searchModel.page = 1;
        }
        let request = await ProductAPICaller.GetList(searchModel);
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
            this.setState({ products: result.data.items, pagingModel: paging, lastSearchModel: this.state.searchModel });
        } finally {
            this.setState({ isTableLoading: false });
        }
    }
    onChooseProduct(item: ProductModel) {
        let choseProducts = this.state.choseProducts;
        if (!choseProducts.find(p => p.id == item.id)) {
            item.checked = true;
            choseProducts.push(item);
        }
        this.setState({ products: choseProducts })
    }
    onRemoveProduct(item: ProductModel) {
        let products = this.state.products;
        var index = products.indexOf(item);
        products.splice(index, 1);
        this.setState({ products: products })
    }
    onReturn() {
        this.props.onReturn(this.state.choseProducts);
        this.onCloseModal();
    }
    render() {
        return <div className="form-group">
            <Button bsStyle="link" onClick={this.onOpenModal.bind(this)}><Glyphicon glyph="plus" /> {this.state.title}</Button>
            {this.renderSearchModal()}
        </div>
    }
    renderSearchModal() {
        return <Modal show={this.state.modalShow} onHide={this.onCloseModal.bind(this)}
            aria-labelledby="contained-modal-title-lg" className="modal-full-width">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-lg">{this.state.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="input-group">
                    <input type="text" className="form-control" name="search" placeholder="Tìm kiếm..." value={this.state.searchModel.key} onChange={this.onSearchKeyChange.bind(this)} onKeyPress={this.onSearchKeyPress.bind(this)} />
                    <span className="input-group-btn">
                        <button className="btn btn-default" type="button" onClick={() => this.onPageChange(1, true)}><span className="glyphicon glyphicon-search"></span></button>
                    </span>
                </div>
                <div className="table-responsive p-relative">
                    <div className="table-responsive p-relative">
                        <ProductTableChoose products={this.state.products} onChooseProduct={this.onChooseProduct.bind(this)} />
                        {this.state.isTableLoading && <div className="icon-loading"></div>}
                    </div>
                    <div className="row">
                        {
                            this.state.products.length > 0 ? this.renderPaging : null
                        }
                    </div>
                    
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button bsStyle='primary' onClick={this.onReturn.bind(this)}>{this.state.modalOption.finishButtonTitle}</Button>
                <Button onClick={this.onCloseModal.bind(this)}>{this.state.modalOption.closeButtonTitle}</Button>
            </Modal.Footer>
        </Modal>
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