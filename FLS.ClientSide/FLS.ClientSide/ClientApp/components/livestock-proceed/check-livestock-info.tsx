import * as React from "react";
import PropTypes from 'prop-types';
import { RouteComponentProps } from 'react-router';
import * as moment from 'moment';
import { CacheAPI } from "../../api-callers";
import { IdNameModel } from "../../models/shared";
import { NavLink } from "react-router-dom";
import { LabeledSelect } from "../shared/input/labeled-input";
import LabeledSingleDatePicker from "../shared/date-time/labeled-single-date-picker";
import { ProductSimpleSearch } from "../product/product-simple-search";
import { ProductModel } from "../../models/product";
import { InputNumber } from "../shared/input/input-number";
import { Glyphicon, Button } from "react-bootstrap";
import { FCRCheckModel } from "../../models/import-stock";
import { LivestockProceedAPICaller } from "../../api-callers/livestock-proceed";
import { UnderConstructor } from "../shared/under-constructor";

interface CheckLivestockInfoState {
    fishPondWarehouseId: number;
    weight: number;
    checkDate: Date | null;
    livestock: ProductModel;
    fishPonds: IdNameModel[];
}
export class CheckLivestockInfos extends React.Component<RouteComponentProps<{}>, CheckLivestockInfoState> {
    constructor(props: any) {
        super(props);
        this.state = this.defaultState;
    }
    static contextTypes = {
        ShowGlobalMessage: PropTypes.func,
        ShowGlobalMessageList: PropTypes.func,
    }
    private defaultState = {
        fishPondWarehouseId: 0,
        weight: 0,
        checkDate: moment().toDate(),
        livestock: null,
        fishPonds: [],
    };
    async componentDidMount() {
        var fishPonds = await CacheAPI.FishPond();
        this.setState({ fishPonds: fishPonds.data });
    }
    async onCheckFCR() {
        let { ...state } = this.state;
        if (!state.fishPondWarehouseId) {
            this.context.ShowGlobalMessage('error', 'Xin chọn ao');
            return false;
        }
        if (!state.livestock) {
            this.context.ShowGlobalMessage('error', 'Chưa chọn giống nuôi');
            return false;
        }
        if (state.livestock.id < 0) {
            this.context.ShowGlobalMessage('error', 'Giống nuôi không đúng');
            return false;
        }
        if (state.weight <= 0) {
            this.context.ShowGlobalMessage('error', 'Chưa nhập trọng lượng cá');
            return false;
        }
        let request = new FCRCheckModel();
        request.checkDate = state.checkDate;
        request.fishPondWarehouseId = state.fishPondWarehouseId;
        request.livestockId = state.livestock.id;
        request.weight = state.weight;

        let response = await LivestockProceedAPICaller.FCRCheck(request);
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
        return <UnderConstructor /> || <div className="content-wapper">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><NavLink to="/">Trang chủ</NavLink></li>
                    <li className="breadcrumb-item"><NavLink to="/quanlyxuat"></NavLink></li>
                    <li className="breadcrumb-item active" aria-current="page">Kiểm tra tăng trọng</li>
                </ol>
            </nav>
            <div>
                <div id="info" className="panel panel-info">
                    <div className="panel-body">
                        <div className="col-md-6">
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
                        <div className="col-md-6">
                            <LabeledSingleDatePicker
                                name='collectDate'
                                title={'Ngày kiểm'}
                                date={moment(state.checkDate)}
                                dateChange={(e) => this.setState({ checkDate: e.value })} />
                        </div>
                    </div>
                </div>
                <div className="panel panel-info">
                    <div className="panel-body">
                        <div className="col-sm-12">
                            <ProductSimpleSearch
                                type='livestock'
                                onChooseProduct={(product) => this.setState({ livestock: product, weight: 0 })}
                                stayPop={false} />
                            {state.livestock ?
                                <div className="table-responsive p-relative mg-t-15">
                                    <table className="table table-striped table-hover mg-0">
                                        <thead>
                                            <tr>
                                                <th>Tên giống nuôi</th>
                                                <th>Trọng lượng</th>
                                                <th className='th-sm-1'></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{state.livestock.name}</td>
                                                <td>
                                                    <InputNumber
                                                        hasScale={true}
                                                        suffix='gr/c'
                                                        value={state.weight}
                                                        onChange={(value) => this.setState({ weight: value})}
                                                    />
                                                </td>
                                                <td>
                                                    <Button bsStyle='default' className='btn-sm' onClick={() => this.setState({ livestock: null, weight: 0 })}>
                                                        <Glyphicon glyph='minus' />
                                                    </Button>
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
                    <button className="btn btn-primary pull-right" onClick={() => this.onCheckFCR()}>Hoàn tất</button>
                </div>
            </div>
        </div>
    }
}