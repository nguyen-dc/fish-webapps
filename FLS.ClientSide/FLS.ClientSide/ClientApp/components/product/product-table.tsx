import * as React from "react";
import { Button, Glyphicon, Modal } from "react-bootstrap";
import { ProductModel } from "../../models/product";
import { EmptyTableMessage } from "../shared/view-only";

interface IProductTableProps {
    products: ProductModel[],
    onRemoveProduct: Function,
}
interface IProductTableState {
    products: ProductModel[],
}
export class ProductTable extends React.PureComponent<IProductTableProps, IProductTableState>{
    constructor(props: any) {
        super(props);
        this.state = {
            products: props.products ? props.products : [],
        }
    }
    componentWillReceiveProps(nextProps: IProductTableProps) {
        this.setState({products: nextProps.products});
    }
    private onRemoveProduct(item: ProductModel) {
        this.props.onRemoveProduct(item);
    }
    render() {
        return <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th>Nhà cung cấp</th>
                    <th>Mã giống</th>
                    <th>Tên giống</th>
                    <th>Cỡ giống</th>
                    <th>Trọng lượng</th>
                    <th>Số lượng(con)</th>
                    <th>VAT</th>
                    <th>Đơn giá</th>
                    <th>Tiền VAT</th>
                    <th>Tổng tiền</th>
                    <th className='th-sm-1'></th>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.products.length == 0 ?
                    <EmptyTableMessage />  :
                    this.state.products.map((product, index) => {
                        return (
                            <tr>
                                <td>product.name</td>
                                <td>1000</td>
                                <td>Cá giống 1</td>
                                <td>24</td>
                                <td>11.5</td>
                                <td>4545465</td>
                                <td>0</td>
                                <td>27.000</td>
                                <td>0</td>
                                <td>456576570</td>
                                <td>
                                    <Button bsStyle="default" className="btn-sm" onClick={() => this.onRemoveProduct(product)}>
                                        <Glyphicon glyph="minus" /></Button>
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