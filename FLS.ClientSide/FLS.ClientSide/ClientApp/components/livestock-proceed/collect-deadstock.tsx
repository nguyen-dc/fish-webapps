import * as React from "react";
import PropTypes from 'prop-types';
import * as moment from 'moment';
import { IdNameModel } from "../../models/shared";
import { CacheAPI } from "../../api-callers";
import { RouteComponentProps } from 'react-router';
import { NavLink } from "react-router-dom";
import { LabeledSelect } from "../shared/input/labeled-input";
import LabeledSingleDatePicker from "../shared/date-time/labeled-single-date-picker";
import { ProductSimpleSearch } from "../product/product-simple-search";
import { SystemIDEnum } from "../../enums/system-default-key-enum";
import { _HNumber } from "../../handles/handles";
import { ProductModel } from "../../models/product";
import { InputNumber } from "../shared/input/input-number";
import { LivestockProceedAPICaller } from "../../api-callers/livestock-proceed";
import { FeedingLivestockModel, CollectDeadstockRequest } from "../../models/import-stock";

interface CollectDeadstockState {
    fishPondWarehouseId: number,
    collectDate: Date,
    massAmount: number,
    ratio: number,
    deadstock: ProductModel,
    fishPonds: IdNameModel[],
}
export class CollectDeadstocks extends React.Component<RouteComponentProps<{}>, CollectDeadstockState> {
    constructor(props: any) {
        super(props)
        this.state = this.defaultState;
    }
    private defaultState = {
        fishPondWarehouseId: 0,
        collectDate: moment().toDate(),
        massAmount: 0,
        ratio: 1,
        deadstock: null,
        fishPonds: [],
    };
    async componentDidMount() {
        var fishPonds = await CacheAPI.FishPond();
        this.setState({ fishPonds: fishPonds.data });
    }
    static contextTypes = {
        ShowGlobalMessage: PropTypes.func,
        ShowGlobalMessageList: PropTypes.func,
    }
    private async onCollectDeadstock() {
        let { ...state } = this.state;
        if (!state.fishPondWarehouseId) {
            this.context.ShowGlobalMessage('error', 'Xin chọn ao');
            return false;
        }
        if (!state.deadstock) {
            this.context.ShowGlobalMessage('error', 'Chưa chọn giống nuôi');
            return false;
        }
        if (state.deadstock.id < 0) {
            this.context.ShowGlobalMessage('error', 'Giống nuôi không đúng');
            return false;
        }
        if (state.massAmount <= 0) {
            this.context.ShowGlobalMessage('error', 'Chưa nhập tổng trọng lượng cá');
            return false;
        }
        if (state.ratio <= 0) {
            this.context.ShowGlobalMessage('error', 'Hệ số không đúng');
            return false;
        }
        let model = new CollectDeadstockRequest();
        model = {
            fishPondWarehouseId: state.fishPondWarehouseId,
            collectDate: state.collectDate,
            massAmount: state.massAmount,
            ratio: state.ratio,
            deadstockId: state.deadstock.id,
        };
        let response = await LivestockProceedAPICaller.CollectDeadstock(model);
        if (!response.hasError) {
            if (response.data > 0) {
                this.context.ShowGlobalMessage('success', 'Cập nhật thông tin thành công');
                this.setState(this.defaultState);
            } else {
                this.context.ShowGlobalMessage('error', 'Có lỗi trong quá trình cập nhật dữ liệu');
            }
        }
        else
            this.context.ShowGlobalMessageList('error', response.errors);
    }
    render() {
        let { ...state } = this.state;
        return <div className="content-wapper">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><NavLink to="/">Trang chủ</NavLink></li>
                    <li className="breadcrumb-item"><NavLink to="/quanlyxuat">Quản lý xuất</NavLink></li>
                    <li className="breadcrumb-item active" aria-current="page">Kiểm cá chết</li>
                </ol>
            </nav>
            <div>
                <div id="info" className="panel panel-info">
                    <div className="panel-body">

                        <div className="col-md-4">
                            <LabeledSelect
                                name='fishPondWarehouseId'
                                value={state.fishPondWarehouseId}
                                title={'Ao nuôi'}
                                placeHolder={'Ao nuôi'}
                                valueKey={'belongId'}
                                nameKey={'name'}
                                valueChange={(e) => this.setState({ fishPondWarehouseId: e.value })}
                                options={this.state.fishPonds} />
                        </div>
                        <div className="col-md-4">
                            <LabeledSingleDatePicker
                                name='collectDate'
                                title={'Ngày kiểm'}
                                date={moment(state.collectDate)}
                                dateChange={(e) => this.setState({ collectDate: e.value })} />
                        </div>
                    </div>
                </div>
                <div className="panel panel-info">
                    <div className="panel-body">
                        <div className="col-sm-12">
                            <ProductSimpleSearch
                                type='livestock'
                                onChooseProduct={(product) => this.setState({ deadstock: product, massAmount: 0, ratio: 1 })}
                                stayPop={false} />
                            {state.deadstock ?
                                <div className="table-responsive p-relative mg-t-15">
                                    <table className="table table-striped table-hover mg-0">
                                        <thead>
                                            <tr>
                                                <th>Tên cá chết</th>
                                                <th>Tổng trọng lượng</th>
                                                <th>Hệ số</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{state.deadstock.name}</td>
                                                <td>
                                                    <InputNumber
                                                        hasScale={true}
                                                        suffix='kg'
                                                        value={state.massAmount}
                                                        onChange={(value) => this.setState({ massAmount: value })}
                                                    />
                                                </td>
                                                <td>
                                                    <InputNumber
                                                        hasScale={true}
                                                        value={state.ratio}
                                                        onChange={(value) => this.setState({ ratio: value })}
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div> : null
                            }
                        </div>
                    </div>
                </div>
                <div className='col-sm-12'>
                    <button className="btn btn-primary pull-right" onClick={() => this.onCollectDeadstock()}>Hoàn tất</button>
                </div>
            </div>
        </div>
    }
}