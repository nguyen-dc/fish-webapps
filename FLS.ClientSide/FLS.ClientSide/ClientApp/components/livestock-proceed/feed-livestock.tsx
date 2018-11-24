import * as React from "react";
import PropTypes from 'prop-types';
import * as moment from 'moment';
import { RouteComponentProps } from 'react-router';
import { StockIssueDocketDetailModel } from "../../models/stock_issue_docket_detail";
import { LabeledSelect } from "../shared/input/labeled-input";
import { IdNameModel } from "../../models/shared";
import { CacheAPI } from "../../api-callers";
import LabeledSingleDatePicker from "../shared/date-time/labeled-single-date-picker";
import { ProductSimpleSearch } from "../product/product-simple-search";
import { ProductModel } from "../../models/product";
import { SystemIDEnum } from "../../enums/system-default-key-enum";
import { _HNumber } from "../../handles/handles";
import { Glyphicon, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { InputNumber } from "../shared/input/input-number";
import { LivestockProceedAPICaller } from "../../api-callers/livestock-proceed";

interface FeedLivestockState {
    fishPondWarehouseId: number,
    feedDate: Date,
    docketDetails: StockIssueDocketDetailModel[],
    fishPonds: IdNameModel[],
}
export class FeedLivestock extends React.Component<RouteComponentProps<{}>, FeedLivestockState> {
    constructor(props: any) {
        super(props)
        this.state = {
            fishPondWarehouseId: 0,
            feedDate: moment().toDate(),
            docketDetails: [],
            fishPonds: [],
        }
    }
    async componentDidMount() {
        var fishPonds = await CacheAPI.FishPond();
        this.setState({ fishPonds: fishPonds.data });
    }
    static contextTypes = {
        ShowGlobalMessage: PropTypes.func,
        ShowGlobalMessageList: PropTypes.func,
    }
    onChooseProduct(product: ProductModel) {
        let { docketDetails } = this.state;
        let detail = docketDetails.find(d => d.productId == product.id);
        if (detail) {
            detail.quantity = Number(detail.quantity) + 1;
            detail.amount = detail.quantity * detail.unitPrice;
            detail.vat = ((detail.quantity * detail.unitPrice) * detail.vatPercent) / 100;
            detail.totalAmount = (detail.quantity * detail.unitPrice) + detail.vat;
        } else {
            detail = new StockIssueDocketDetailModel();
            detail.productId = product.id;
            detail.productName = product.name;
            detail.productUnitId = product.defaultUnitId;
            detail.quantity = 1;
            detail.unitPrice = 0;
            detail.vatPercent = product.taxPercent;
            detail.amount = detail.quantity * detail.unitPrice;
            detail.vat = ((detail.quantity * detail.unitPrice) * detail.vatPercent) / 100;
            detail.totalAmount = (detail.quantity * detail.unitPrice) + detail.vat;
            docketDetails.push(detail);
        }
        this.setState({ docketDetails });
    }
    async onFeedingLivestock() {
        let { ...state } = this.state;
        if (!state.fishPondWarehouseId) {
            this.context.ShowGlobalMessage('error', 'Xin chọn ao');
            return false;
        }

        if (!state.docketDetails || state.docketDetails.length == 0) {
            this.context.ShowGlobalMessage('error', 'Chưa chọn thức ăn');
            return false;
        }
        let err = state.docketDetails.find(d => !d.quantity || d.quantity <= 0);
        if (err) {
            this.context.ShowGlobalMessage('error', 'Số lượng sản phẩm không đúng');
            return false;
        }
        let model = {
            fishPondWarehouseId: state.fishPondWarehouseId,
            feedDate: state.feedDate,
            details: state.docketDetails,
        }
        let response = await LivestockProceedAPICaller.Feed(model);
        if (!response.hasError && response.data) {
            this.props.history.push('/quanlyxuat/' + response.data);
        }
        else
            this.context.ShowGlobalMessageList('error', response.errors);
    }
    renderTabInfo() {
        let { fishPondWarehouseId, feedDate } = this.state;
        return (
            <div id="info" className="panel panel-info">
                <div className="panel-body">
                    
                    <div className="col-md-4">
                        <LabeledSelect
                            name='fishPondWarehouseId'
                            value={fishPondWarehouseId}
                            title={'Ao nuôi'}
                            placeHolder={'Ao nuôi'}
                            valueKey={'belongId'}
                            nameKey={'name'}
                            valueChange={(e) => this.setState({ fishPondWarehouseId: e.value })}
                            options={this.state.fishPonds} />
                    </div>
                    <div className="col-md-4">
                        <LabeledSingleDatePicker
                            name='feedDate'
                            title={'Ngày cho ăn'}
                            date={moment(feedDate)}
                            dateChange={(e) => this.setState({ feedDate: e.value })} />
                    </div>
                </div>
            </div>
        );
    }
    renderCustomer() {
        let { docketDetails } = this.state;
        let totalQuantity = (!docketDetails || docketDetails.length == 0) ? 0 : docketDetails.reduce((d, l) => d + l.quantity, 0);
        return (
            <div className="panel panel-info">
                <div className="panel-body">
                    <div className="col-sm-12">
                        <ProductSimpleSearch
                            productGroupId={SystemIDEnum.ProductGroup_Food}
                            onChooseProduct={(product) => this.onChooseProduct(product)}
                            stayPop={false} />
                        {
                            docketDetails && docketDetails.length > 0 ?
                                <div>
                                    <div className="table-responsive p-relative mg-t-15">
                                        <table className="table table-striped table-hover mg-0">
                                            <thead>
                                                <tr>
                                                    <th>Tên sản phẩm</th>
                                                    <th>Số lượng</th>
                                                    <th className='th-sm-1'></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    docketDetails.map((detail) => {
                                                        return <FeedLivestockProduct
                                                            key={'flp-' + detail.productId}
                                                            model={detail}
                                                            onChange={() => this.setState({ docketDetails })}
                                                            onDelete={() => this.setState({ docketDetails: docketDetails.filter(f => f !== detail) })}
                                                        />
                                                    })
                                                }
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td colSpan={3}>Số lượng: <strong>{_HNumber.FormatNumber(totalQuantity)}</strong></td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div> : null
                        }
                    </div>
                </div>
            </div>
        )
    }
    render() {
        return (
            <div className="content-wapper">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><NavLink to="/">Trang chủ</NavLink></li>
                        <li className="breadcrumb-item"><NavLink to="/quanlyxuat">Quản lý xuất</NavLink></li>
                        <li className="breadcrumb-item active" aria-current="page">Cho ăn</li>
                    </ol>
                </nav>
                <div>
                    {this.renderTabInfo()}
                    {this.renderCustomer()}
                    <div className='col-sm-12'>
                        <button className="btn btn-primary pull-right" onClick={() => this.onFeedingLivestock()}>Hoàn tất</button>
                    </div>
                </div>
            </div>
        );
    }
}

interface FeedLivestockProductProps {
    model: StockIssueDocketDetailModel,
    onChange: Function,
    onDelete: Function,
}
class FeedLivestockProduct extends React.Component<FeedLivestockProductProps, any> {
    constructor(props: any) {
        super(props);
    }
    render() {
        let model = this.props.model;
        return <tr key={'prdt-' + model.productId}>
            <td>{model.productName}</td>
            <td>
                <InputNumber
                    suffix={model.productUnitName + ''}
                    value={model.quantity}
                    hasScale={true}
                    onChange={(e) => { model.quantity = e; this.props.onChange(); } }
                />
            </td>
            <td>
                <Button bsStyle='default' className='btn-sm' onClick={() => this.props.onDelete()}>
                    <Glyphicon glyph='minus' />
                </Button>
            </td>
        </tr>
    }
}