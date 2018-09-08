import * as React from "react";
import { Button, Glyphicon, Modal, Label } from "react-bootstrap";
import { SupplierModel } from "../../models/supplier";
import { EmptyTableMessage } from "../shared/view-only";

interface ISupplierTableChooseProps {
    name: string,
    suppliers?: SupplierModel[],
    onChooseSupplier?: Function,
}
interface ISupplierTableChooseState {
    suppliers: SupplierModel[],
}
export class SupplierTableChoose extends React.PureComponent<ISupplierTableChooseProps, ISupplierTableChooseState>{
    constructor(props: any) {
        super(props);
        this.state = {
            suppliers: props.suppliers ? props.suppliers : [],
        }
    }
    componentWillReceiveProps(nextProps: ISupplierTableChooseProps) {
        let supplierNews = nextProps.suppliers;
        for (var i = 0; i < supplierNews.length; i++) {

        }
        this.setState({ suppliers: supplierNews });
    }
    private onChooseSupplier(item: SupplierModel) {
        this.props.onChooseSupplier(item);
    }
    render() {
        return <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th>Mã nhà cung cấp</th>
                    <th>Tên nhà cung cấp</th>
                    <th></th>
                    <th className='th-xs-1'></th>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.suppliers.length == 0 ?
                        <EmptyTableMessage /> :
                        this.state.suppliers.map((supplier, index) => {
                            return (
                                <tr key={this.props.name + index}>
                                    <td>{supplier.id}</td>
                                    <td>{supplier.name}</td>
                                    <td></td>
                                    <td className="text-right">
                                        {
                                            supplier.checked ?
                                                <Button className="btn-xs" disabled>
                                                    <Glyphicon glyph="ok" /></Button>
                                                :
                                                <Button bsStyle="primary" className="btn-xs" onClick={() => this.onChooseSupplier(supplier)}>
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