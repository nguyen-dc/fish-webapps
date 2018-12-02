import * as React from "react";
import { Link } from "react-router-dom";
import { RouteComponentProps } from 'react-router';
import { UnderConstructor } from "../shared/under-constructor";
import { LabeledSelect } from "../shared/input/labeled-input";

interface ReleaseLivestockStates {
    model: any,
    errorList: {}
}

export class FeedConversionRates extends React.Component<RouteComponentProps<{}>, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            model: [],
            errorList: {}
        }
    }

    componentDidMount() {

    }

    onDocketFieldChange(model: any) {
        //const nextState = {
        //    ...this.state,
        //    releaseDocket: {
        //        ...this.state.releaseDocket,
        //        [model.name]: model.value,
        //    }
        //};
        //this.setState(nextState);
    }

    GetReport() {
        alert("Chưa có làm");
    }

    private renderTable(models: any) {
        return (
            <table className="table-responsive table table-striped table-hover border">
                <thead className="text-center">
                    <tr>
                        <td colSpan={12}>Ao nuôi số 11 - Diện tích (m2): 8778</td>
                    </tr>
                    <tr>
                        <td rowSpan={2}>Ngày</td>
                        <td rowSpan={2}>Trọng lượng(gr/con)</td>
                        <td rowSpan={2}>Bình quân(con/kg)</td>
                        <td colSpan={2}>Cá chết</td>
                        <td rowSpan={2}>Thức ăn(kg)</td>
                        <td rowSpan={2}>Khối lượng(kg)</td>
                        <td rowSpan={2}>Số lượng(con)</td>
                        <td rowSpan={2}>Hao hụt(%)</td>
                        <td rowSpan={2}>Tỷ trọng(%)</td>
                        <td rowSpan={2}>Mật độ(c/m2)</td>
                        <td rowSpan={2}>FCR</td>
                    </tr>
                    <tr>
                        <td>Kg</td>
                        <td>Con</td>
                    </tr>
                </thead>
                <tbody className="text-center">
                    <tr>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>
                </tbody>
            </table>
        );
    }

    render() {
        return (
            <div id="info" className="tab-pane fade in active">
                <div className="panel panel-info">
                    <div className="panel-body">
                        <div className="col-md-3">
                            <LabeledSelect
                                name={'fishPondWarehouseId'}
                                value={0}
                                title={'Vùng nuôi'}
                                placeHolder={'Vùng nuôi'}
                                valueKey={'belongId'}
                                nameKey={'name'}
                                valueChange={this.onDocketFieldChange.bind(this)}
                                options={[]} />
                        </div>
                        <div className="col-md-3">
                            <LabeledSelect
                                name={'fishPondWarehouseId'}
                                value={0}
                                title={'Ao nuôi'}
                                placeHolder={'Ao nuôi'}
                                valueKey={'belongId'}
                                nameKey={'name'}
                                valueChange={this.onDocketFieldChange.bind(this)}
                                options={[]} />
                        </div>
                        <div className="col-md-3">
                            <LabeledSelect
                                name={'fishPondWarehouseId'}
                                value={0}
                                title={'Đợt nuôi'}
                                placeHolder={'Đợt nuôi'}
                                valueKey={'belongId'}
                                nameKey={'name'}
                                valueChange={this.onDocketFieldChange.bind(this)}
                                options={[]} />
                        </div>
                        <div className="col-md-3 text-right">
                            <button className="btn btn-primary mg-r-15" onClick={this.GetReport}>Xem báo cáo</button>
                            <button className="btn btn-primary" onClick={this.GetReport}>Xuất file excel</button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className='col-sm-12'>
                        {this.renderTable(this.state.model)}
                    </div>
                </div>
            </div>
        );
    }
}