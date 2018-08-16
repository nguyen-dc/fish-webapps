import * as React from "react";
import { RouteComponentProps } from 'react-router';
export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>
            <h1>F&LS</h1>
            <p>Trang quản lý nuôi thủy hải sản và nhập xuất hàng</p>
            
        </div>;
    }
}