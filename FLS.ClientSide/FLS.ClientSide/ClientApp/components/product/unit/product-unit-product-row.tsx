import * as React from "react";
import PropTypes from 'prop-types';
import { _HString, _HNumber } from "../../../handles/handles";
import { ProductAPICaller } from "../../../api-callers";
import { ProductUnitProductModel } from "../../../models/product";
import { Button, Glyphicon, ButtonGroup } from "react-bootstrap";
import { cloneDeep } from 'lodash';
import { ConfirmButton } from "../../shared/button/ConfirmButton";
import { InputNumber } from "../../shared/input/input-number";

interface ProductUnitProductRowProps {
    defaultUnitId: number,
    defaultUnitName: string,
    model: ProductUnitProductModel,
    afterUpdate?: Function,
}
interface ProductUnitProductRowState {
    model: ProductUnitProductModel,
    isEditMode: boolean,
}

export class ProductUnitProductRow extends React.Component<ProductUnitProductRowProps, ProductUnitProductRowState>{
    constructor(props) {
        super(props)
        this.state = {
            model: cloneDeep(props.model),
            isEditMode: false,
        }
    }
    static contextTypes = {
        ShowGlobalMessage: PropTypes.func,
        ShowGlobalMessageList: PropTypes.func,
    }
    async onUpdate() {
        let model = this.state.model;
        // Gọi API update:
        let response = await ProductAPICaller.UpdateUnit(model);
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
    async onDelete() {
        let model = this.state.model;
        // Gọi API update:
        let response = await ProductAPICaller.DeleteUnit(model.id);
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
        let propsModel = this.props.model;
        if (!stateModel) return null;
        return this.state.isEditMode == true ?
            <tr>
                <td>{stateModel.productUnitId}</td>
                <td> 1 {stateModel.productUnitName}</td>
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
                            onClick={() => this.onUpdate()}>
                            <Glyphicon glyph="save" />
                        </Button>
                    </ButtonGroup>
                </td>
            </tr> : <tr>
                <td>{propsModel.productUnitId}</td>
                <td> 1 {propsModel.productUnitName}</td>
                <td> <span className='control-label'>{_HNumber.FormatNumber(propsModel.defaultUnitValue)} {this.props.defaultUnitName}</span></td>
                <td className="text-right">
                    <ButtonGroup>
                    <Button bsStyle="default"
                        className="btn-sm"
                            onClick={() => this.setState({ model: cloneDeep(propsModel), isEditMode: true })}>
                        <Glyphicon glyph="edit" />
                        </Button>
                        <ConfirmButton
                            bsStyle="warning"
                            className="btn-sm"
                            glyph='remove'
                            modalTitle='Xác nhận xóa đơn vị sản phẩm'
                            modalBodyContent={
                                <span>Xác nhận xóa đơn vị <strong>{propsModel.productUnitName}</strong>  sản phẩm <strong>{propsModel.productName}</strong>?</span>
                            }
                            onClickYes={() => this.onDelete()} />
                    </ButtonGroup>

                </td>
            </tr>
    }
}