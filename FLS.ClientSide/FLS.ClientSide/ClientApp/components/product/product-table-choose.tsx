import * as React from "react";
import { Button, Glyphicon, Modal, Label } from "react-bootstrap";
import { ProductModel } from "../../models/product";
import { EmptyTableMessage } from "../shared/view-only";

interface IProductTableChooseProps {
    name: string,
    products?: ProductModel[],
    onChooseProduct?: Function,
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
        let productNews = nextProps.products;
        for (var i = 0; i < productNews.length; i++) {

        }
        this.setState({ products: productNews });
    }
    private onChooseProduct(item: ProductModel) {
        this.props.onChooseProduct(item);
    }
    render() {
        return <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th>Mã giống</th>
                    <th>Tên giống</th>
                    <th></th>
                    <th className='th-xs-1'></th>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.products.length == 0 ?
                        <EmptyTableMessage /> :
                        this.state.products.map((product, index) => {
                            return (
                                <tr key={this.props.name + index}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td></td>
                                    <td className="text-right">
                                        {
                                            product.checked ?
                                                <Button className="btn-xs" disabled>
                                                    <Glyphicon glyph="ok" /></Button>
                                                :
                                                <Button bsStyle="primary" className="btn-xs" onClick={() => this.onChooseProduct(product)}>
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
}