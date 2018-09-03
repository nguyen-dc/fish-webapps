import * as React from "react";
import { Button, Glyphicon, Overlay, Popover } from "react-bootstrap";
import * as ReactDOM from "react-dom";
import { PageFilterModel, PaginateModel } from "../../models/shared";
import { SupplierAPICaller } from "../../api-callers/supplier";
import { SupplierModel } from "../../models/supplier";
import { EmptyTableMessage } from "../shared/view-only";

interface SupplierSimpleSearchProps {
    popPlacement?: 'top' | 'right' | 'bottom' | 'left',
    onChooseSupplier?: Function,
}
interface SupplierSimpleSearchState {
    isPopUp: boolean,
    lastSearchModel: PageFilterModel,
    searchModel: PageFilterModel,
    pagingModel: PaginateModel,
    isSearching: boolean,
    suppliers: SupplierModel[],
}
export class SupplierSimpleSearch extends React.Component<SupplierSimpleSearchProps, SupplierSimpleSearchState>{
    constructor(props) {
        super(props)
        this.state = {
            isPopUp: false,
            searchModel: new PageFilterModel(),
            lastSearchModel: new PageFilterModel(),
            pagingModel: new PaginateModel(),
            suppliers: [],
            isSearching: false,
        }
    }
    target = null;
    getTarget() {
        return ReactDOM.findDOMNode(this.target);
    }
    async loadData(page: number, newSearch: boolean) {
        let searchModel = this.state.lastSearchModel;
        searchModel.page = page;
        if (newSearch) {
            searchModel = this.state.searchModel;
            searchModel.page = 1;
        }
        let request = await SupplierAPICaller.GetList(searchModel);
        if (request.ok)
            return (await request.json());
        else {
            //// raise error
            return null;
        }
    }
    async onPageChange(page: any, newSearch: boolean) {
        try {
            this.setState({ isSearching: true });
            var result = await this.loadData(page, newSearch);
            if (!result || !result.data) { return; }
            var paging = new PaginateModel();
            paging.currentPage = result.data.currentPage;
            paging.totalItems = result.data.totalItems;
            this.setState({ suppliers: result.data.items, pagingModel: paging });
            if (newSearch)
                this.setState({ lastSearchModel: this.state.searchModel });
        } finally {
            this.setState({ isSearching: false });
        }
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
    onChooseSupplier(supplier: SupplierModel) {
        this.setState({ isPopUp: false });
        if (this.props.onChooseSupplier)
            this.props.onChooseSupplier(supplier);
    }
    renderPopover() {
        let { isSearching, suppliers } = this.state;
        return <Popover>
            {isSearching && <div className="icon-loading"></div>}
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Mã</th>
                        <th>Tên</th>
                        <th className='th-xs-1'></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        suppliers.length == 0 ?
                            <EmptyTableMessage /> :
                            suppliers.map((supplier, index) => {
                                return (
                                    <tr key={'ncc' + index}>
                                        <td>{supplier.id}</td>
                                        <td>{supplier.name}</td>
                                        <td className="text-right">
                                            {
                                                <Button bsStyle="primary" className="btn-xs" onClick={() => this.onChooseSupplier(supplier)}>
                                                    <Glyphicon glyph="plus" /></Button>
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                    }
                </tbody>
            </table>
        </Popover>
    }
    render() {
        let { isPopUp, searchModel } = this.state;
        let placement = this.props.popPlacement ? this.props.popPlacement : 'bottom';
        return <div className="input-group" ref={thisref => { this.target = thisref }}>
            <input type="text" className="form-control" name="search" placeholder="Chọn nhà cung cấp..." value={searchModel.key} onChange={this.onSearchKeyChange.bind(this)} onKeyPress={this.onSearchKeyPress.bind(this)} />
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
        </div>
    }
}