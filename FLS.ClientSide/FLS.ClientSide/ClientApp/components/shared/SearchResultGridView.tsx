import * as React from "react";
import { Link } from "react-router-dom";

export class SearchResultGridView extends React.Component<SearchResultGridViewProps, SearchResultGridViewState> {
    constructor(props: any) {
        super(props)
    }

    render() {
        return (
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Mã</th>
                        <th>Số phiếu</th>
                        <th>Loại phiếu</th>
                        <th>Kho</th>
                        <th>Khách hàng</th>
                        <th>Tổng tiền</th>
                        <th>Người nhập</th>
                        <th>Ghi chú</th>
                        <th>Từ phiếu xuất</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={1}>
                        <td>{1}</td><td>{'HS21223'}</td><td>{'Nhập cá'}</td><td>{'Kho số 7'}</td>
                        <td>{'Anh Tâm'}</td><td>{'21,000,000'}</td>
                        <td>{'Lê Hùng'}</td><td>{'Nhập thẳng ao 1'}</td><td>{''}</td>
                        </tr>
                    <tr key={2}>
                        <td>{2}</td><td>{'HS21223'}</td><td>{'Nhập cá'}</td><td>{'Kho số 7'}</td>
                        <td>{'Anh Tâm'}</td><td>{'21,000,000'}</td>
                        <td>{'Lê Hùng'}</td><td>{'Nhập thẳng ao 1'}</td><td>{''}</td>
                        </tr>
                    <tr key={3}>
                        <td>{3}</td><td>{'HS21223'}</td><td>{'Nhập cá'}</td><td>{'Kho số 7'}</td>
                        <td>{'Anh Tâm'}</td><td>{'21,000,000'}</td>
                        <td>{'Lê Hùng'}</td><td>{'Nhập thẳng ao 1'}</td><td>{''}</td>
                        </tr>
                    <tr key={4}>
                        <td>{4}</td><td>{'HS21223'}</td><td>{'Nhập cá'}</td><td>{'Kho số 7'}</td>
                        <td>{'Anh Tâm'}</td><td>{'21,000,000'}</td>
                        <td>{'Lê Hùng'}</td><td>{'Nhập thẳng ao 1'}</td><td>{''}</td>
                        </tr>
                    <tr key={5}>
                        <td>{5}</td><td>{'HS21223'}</td><td>{'Nhập cá'}</td><td>{'Kho số 7'}</td>
                        <td>{'Anh Tâm'}</td><td>{'21,000,000'}</td>
                        <td>{'Lê Hùng'}</td><td>{'Nhập thẳng ao 1'}</td><td>{''}</td>
                        </tr>
                    <tr key={6}>
                        <td>{6}</td><td>{'HS21223'}</td><td>{'Nhập cá'}</td><td>{'Kho số 7'}</td>
                        <td>{'Anh Tâm'}</td><td>{'21,000,000'}</td>
                        <td>{'Lê Hùng'}</td><td>{'Nhập thẳng ao 1'}</td><td>{''}</td>
                        </tr>
                    <tr key={7}>
                        <td>{7}</td><td>{'HS21223'}</td><td>{'Nhập cá'}</td><td>{'Kho số 7'}</td>
                        <td>{'Anh Tâm'}</td><td>{'21,000,000'}</td>
                        <td>{'Lê Hùng'}</td><td>{'Nhập thẳng ao 1'}</td><td>{''}</td>
                        </tr>
                    <tr key={8}>
                        <td>{8}</td><td>{'HS21223'}</td><td>{'Nhập cá'}</td><td>{'Kho số 7'}</td>
                        <td>{'Anh Tâm'}</td><td>{'21,000,000'}</td>
                        <td>{'Lê Hùng'}</td><td>{'Nhập thẳng ao 1'}</td><td>{''}</td>
                        </tr>
                    {/*
                        models.length == 0 ?
                            <EmptyTableMessage/> :
                            models.map(
                                model =>
                                    <tr key={model.Id}>
                                        <td>{model.Id}</td>
                                        <td>{model.StockIssueDocketTypeId}</td>
                                        <td>{model.WarehouseId}</td>
                                        <td>{model.CustomerName}</td>
                                        <td>{model.DocketNumber}</td>
                                        <td>{model.TotalAmount}</td>
                                        <td>{model.ExecutorCode}</td>
                                        <td>{model.Description}</td>
                                        <td>{model.StockReceiveDocketId}</td>
                                        <td><a className="cursor-pointer" onClick={() => this.handleOpenEdit(model.Id)}>Sửa</a></td>
                                    </tr>
                            )
                    */}
                </tbody>
            </table>
        );
    }
}

interface SearchResultGridViewProps {
    headerList: GridHeaderModel[],
    bodyList: any,
}
interface SearchResultGridViewState {

}

interface GridHeaderModel {
    title: string,
}