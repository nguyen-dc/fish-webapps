import * as React from "react";
import { Button, Glyphicon, Modal } from "react-bootstrap";
import { ProductModel } from "../../models/product";
import { Input } from "../shared/SingleInput";
import { ProductTable } from "./product-table";
import { PageFilterModel, PaginateModel } from "../../models/shared";
import { ProductAPICaller } from "../../api-callers/product";
import Pagination from "react-js-pagination";
import { ProductTableChoose } from "./product-table-choose";
import { EmptyTableMessage } from "../shared/view-only";

interface IProductSearchProps {
    keepLastResult?: boolean,
    modalOption?: IModalModel,
    title?: string,
    onReturn: Function,
    wrapperClass?: string,
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
export class ProductSearch extends React.Component<IProductSearchProps, IProductSearchState>{
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
            this.setState({ modalShow: true, products: [] })
            : this.setState({ modalShow: true, products: [], choseProducts: []  });
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
            let selectedItem = new Object as ProductModel;
            selectedItem = Object.assign(selectedItem, item);
            choseProducts.push(selectedItem);
        }
        this.setState({ choseProducts: choseProducts });
        this.forceUpdate();
    }
    onRemoveProduct(item: ProductModel) {
        let choseProducts = this.state.choseProducts;
        var index = choseProducts.indexOf(item);
        choseProducts.splice(index, 1);
        let products = this.state.products; 
        let product = products.find(p => p.id == item.id);
        product.checked = false;
        this.setState({ products: products, choseProducts: choseProducts })
    }
    onReturn() {
        this.props.onReturn(this.state.choseProducts);
        this.onCloseModal();
    }
    render() {
        let choseProducts = this.state.choseProducts;
        let products = this.state.products;
        let wrapperClass = this.props.wrapperClass ? { className: this.props.wrapperClass } : null;
        return <div {...wrapperClass}>
            <Button className="btn btn-default" onClick={this.onOpenModal.bind(this)}><Glyphicon glyph="plus" /> {this.state.title}</Button>
            <Modal show={this.state.modalShow} onHide={this.onCloseModal.bind(this)}
                aria-labelledby="contained-modal-title-lg" className="modal-full-width">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">{this.state.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-sm-6'>
                            <div className="mg-bt-15">
                                <div className="input-group col-sm-12">
                                    <input type="text" className="form-control" name="search" placeholder="Tìm sản phẩm" value={this.state.searchModel.key} onChange={this.onSearchKeyChange.bind(this)} onKeyPress={this.onSearchKeyPress.bind(this)} />
                                    <span className="input-group-btn">
                                        <button className="btn btn-default" type="button" onClick={() => this.onPageChange(1, true)}><span className="glyphicon glyphicon-search"></span></button>
                                    </span>
                                </div>
                            </div>
                            <ProductTableChoose name={'products'} products={products} onChooseProduct={this.onChooseProduct.bind(this)} />
                            {this.state.isTableLoading && <div className="icon-loading"></div>}
                            <div className="row">
                                {
                                    this.state.products.length > 0 ? this.renderPaging : null
                                }
                            </div>
                        </div>
                        <div className='col-sm-6'>
                            <span className='col-sm-12'>Sản phẩm đã chọn</span>
                            <table className="table table-striped table-hover">
                                <tbody>
                                    {
                                        choseProducts.length == 0 ?
                                            <EmptyTableMessage /> :
                                            choseProducts.map((product, index) => {
                                                return (
                                                    <tr key={'choose-' + product.id}>
                                                        <td>{product.id}</td>
                                                        <td>{product.name}</td>
                                                        <td></td>
                                                        <td className='td-xs-1'>
                                                            <Button bsStyle="default" className="btn-xs" onClick={() => this.onRemoveProduct(product)}>
                                                                <Glyphicon glyph="minus" />
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle='primary' onClick={this.onReturn.bind(this)}>{this.state.modalOption.finishButtonTitle}</Button>
                    <Button onClick={this.onCloseModal.bind(this)}>{this.state.modalOption.closeButtonTitle}</Button>
                </Modal.Footer>
            </Modal>
        </div>
    }
    renderSearchModal() {
        return 
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