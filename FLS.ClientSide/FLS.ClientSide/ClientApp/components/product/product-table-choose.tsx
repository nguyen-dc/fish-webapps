import * as React from "react";
import { Button, Glyphicon, Modal, Label } from "react-bootstrap";
import { ProductModel } from "../../models/product";

interface IProductTableChooseProps {
    products: ProductModel[],
    onChooseProduct: Function,
}
interface IProductTableChooseState {
    products: ProductModel[],
}
export class ProductTableChoose extends React.PureComponent<IProductTableChooseProps, IProductTableChooseState>{
    constructor(props: any) {
        super(props);
        this.state = {
            products: props.products ? props.products : [],
        }
    }
    componentWillReceiveProps(nextProps: IProductTableChooseProps) {
        this.setState({products: nextProps.products});
    }
    private onChooseProduct(item: ProductModel) {
        this.props.onChooseProduct(item);
    }
    render() {
        return <table className="table table-bordered table-hover">
            <thead>
                <tr>
                    <th>Mã giống</th>
                    <th>Tên giống</th>
                    <th>Cỡ giống</th>>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.products.length == 0 ?
                    <tr><td colSpan={11}>Không có dữ liệu!</td></tr> :
                    this.state.products.map((product, index) => {
                        return (
                            <tr>
                                <td>1000</td>
                                <td>Cá giống 1</td>
                                <td>24</td>
                                <td>
                                    {
                                        product.checked ? 
                                            <Button className="btn-sm" disabled>
                                                <Glyphicon glyph="ok" /></Button>
                                            :
                                            <Button bsStyle="primary" className="btn-sm" onClick={() => this.onChooseProduct(product)}>
                                                <Glyphicon glyph="plus" /></Button>
                                    }
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    }
    renderRow() {

    }
}