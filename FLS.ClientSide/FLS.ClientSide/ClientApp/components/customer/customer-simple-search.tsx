import * as React from "react";
import { Button, Glyphicon, Overlay, Popover } from "react-bootstrap";
import * as ReactDOM from "react-dom";
import { PageFilterModel, PaginateModel } from "../../models/shared";
import { CustomerAPICaller } from "../../api-callers/customer";
import { CustomerModel } from "../../models/customer";
import { EmptyTableMessage } from "../shared/view-only";

interface CustomerSimpleSearchProps {
    popPlacement?: 'top' | 'right' | 'bottom' | 'left',
    stayPop?: boolean,
    onChooseCustomer?: Function,
}
interface CustomerSimpleSearchState {
    isPopUp: boolean,
    stayPop: boolean,
    lastSearchModel: PageFilterModel,
    searchModel: PageFilterModel,
    pagingModel: PaginateModel,
    isSearching: boolean,
    customers: CustomerModel[],
}
export class CustomerSimpleSearch extends React.Component<CustomerSimpleSearchProps, CustomerSimpleSearchState>{
    constructor(props) {
        super(props)
        this.state = {
            isPopUp: false,
            stayPop: props.stayPop ? props.stayPop : false,
            searchModel: new PageFilterModel(),
            lastSearchModel: new PageFilterModel(),
            pagingModel: new PaginateModel(),
            customers: [],
            isSearching: false,
        }
    }

    async componentWillMount() {
        await this.onPageChange(1, true);
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
        return await CustomerAPICaller.GetList(searchModel);
    }
    async onPageChange(page: any, newSearch: boolean) {
        try {
            this.setState({ isSearching: true });
            var result = await this.loadData(page, newSearch);
            if (!result || !result.data) { return; }
            var paging = new PaginateModel();
            paging.currentPage = result.data.currentPage;
            paging.totalItems = result.data.totalItems;
            this.setState({ customers: result.data.items, pagingModel: paging });
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
    onChooseCustomer(customer: CustomerModel) {
        if (!this.state.stayPop)
            this.setState({ isPopUp: false });
        if (this.props.onChooseCustomer)
            this.props.onChooseCustomer(customer);
    }
    renderPopover() {
        let { isSearching, customers } = this.state;
        return <Popover id='ctmr-povr'>
            {isSearching && <div className="icon-loading"></div>}
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Mã</th>
                        <th>Tên</th>
                        <th>Địa chỉ</th>
                        <th>Số điện thoại</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        customers.length == 0 ?
                            <EmptyTableMessage message='Nhập chuỗi cần tìm, nhấn enter hoặc bấm nút tìm kiếm!'/> :
                            customers.map((customer, index) => {
                                return (
                                    <tr
                                        className='clickable'
                                        key={'ncc' + index}
                                        onClick={() => this.onChooseCustomer(customer)}
                                    >
                                        <td>{customer.id}</td>
                                        <td>{customer.name}</td>
                                        <td>{customer.address}</td>
                                        <td>{customer.phone}</td>
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
        let wrapperClass = {
            className: isPopUp ? 'input-group popover-front' : 'input-group'
        }
        return <div {...wrapperClass} ref={thisref => { this.target = thisref }}>
            <input type="text" className="form-control" name="search" placeholder="Chọn khách hàng..." value={searchModel.key} onChange={this.onSearchKeyChange.bind(this)} onKeyPress={this.onSearchKeyPress.bind(this)} onClick={() => this.onOpenPopover()}/>
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
}