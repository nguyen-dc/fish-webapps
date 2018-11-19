import * as React from "react";
import PropTypes from 'prop-types';
import { _HString, _HNumber } from "../../../handles/handles";
import { ProductAPICaller, CacheAPI } from "../../../api-callers";
import { ProductUnitProductModel } from "../../../models/product";
import { Button, Glyphicon, ButtonGroup } from "react-bootstrap";
import { cloneDeep } from 'lodash';
import { FormatedInput } from "../../shared/input/formated-input";
import { ConfirmButton } from "../../shared/button/ConfirmButton";
import { InputNumber } from "../../shared/input/input-number";

interface ProductUnitProductNewProps {
    productId: number,
    defaultUnitId: number,
    defaultUnitName: string,
    afterUpdate?: Function,
}
interface ProductUnitProductNewState {
    model: ProductUnitProductModel,
    productUnits: any;
    isEditMode: boolean,
}
export class ProductUnitProductNew extends React.Component<ProductUnitProductNewProps, ProductUnitProductNewState>{
    productId: number;
    constructor(props) {
        super(props)
        this.productId = props.productId;
        this.state = {
            model: new ProductUnitProductModel(),
            productUnits: [],
            isEditMode: false,
        }
    }
    static contextTypes = {
        ShowGlobalMessage: PropTypes.func,
        ShowGlobalMessageList: PropTypes.func,
    }
    async componentWillMount() {
        var productUnits = await CacheAPI.ProductUnit();
        this.setState({ productUnits: productUnits.data });
    }
    async onCreate() {
        let model = this.state.model;
        model.productId = this.productId;
        if (!model.productUnitId || model.productUnitId <= 0) {
            this.context.ShowGlobalMessage('error', 'Chưa chọn Đơn vị tính');
            return;
        }
        // Gọi API update:
        let response = await ProductAPICaller.CreateUnit(model);
        if (response.hasError) {
            this.context.ShowGlobalMessageList('error', response.errors);
        }
        else {
            if (this.props.afterUpdate) this.props.afterUpdate();
            // nếu thành công đóng edit:
            this.setState({ isEditMode: false })
        }
        if (response.hasWarning) {
            this.context.ShowGlobalMessageList('warning', response.warnings);
        }
    }
    render() {
        let stateModel = this.state.model;
        if (!stateModel) return null;
        return this.state.isEditMode == true ?
            <tr>
                <td>{stateModel.productUnitId}</td>
                <td> 1
                    <select
                        className="form-control"
                        value={stateModel.productUnitId}
                        onChange={(e) => {
                            stateModel.productUnitId = Number(e.target.value);
                            this.setState({ model: stateModel })
                        }}
                        placeholder='đơn vị tính'>
                        <option value=''>- Đơn vi tính -</option>
                        {this.state.productUnits != null ?
                            this.state.productUnits.map(opt => {
                                let disabled = opt.id == stateModel.productUnitId ? true : false;
                                return (
                                    <option {...disabled} key={opt.id}
                                        value={opt.id}>{opt.name}
                                    </option>
                                );
                            }) : null
                        }
                    </select>
                    </td>
                <td>
                    <InputNumber
                        hasScale={true}
                        suffix={this.props.defaultUnitName}
                        value={stateModel.defaultUnitValue}
                        onChange={(e) => {
                            stateModel.defaultUnitValue = e;
                            this.setState({ model: stateModel })
                        }} />
                </td>
                <td className="text-right">
                    <ButtonGroup>
                        <Button bsStyle="default"
                            className="btn-sm"
                            onClick={() => this.setState({ isEditMode: false })}>
                            <Glyphicon glyph="remove" />
                        </Button>
                        <Button bsStyle="primary"
                            className="btn-sm"
                            onClick={() => this.onCreate()}>
                            <Glyphicon glyph="save" />
                        </Button>
                    </ButtonGroup>
                </td>
            </tr> : <tr>
                <td colSpan={4} className="text-right">
                        <Button bsStyle="link"
                        className="btn-sm"
                        onClick={() => this.setState({ model: new ProductUnitProductModel(), isEditMode: true })}>
                            Thêm đơn vị quy đổi <Glyphicon glyph="add" />
                        </Button>
                </td>
            </tr>
    }
}